const similarity = require("../utils/fuzzyMatch")
const { getAllProducts } = require("./productService")
const Settings = require("../models/Settings")

const ADD_KEYWORDS = ["add", "include", "put"];
const REMOVE_KEYWORDS = ["remove", "delete"];
const FINALIZE_KEYWORDS = ["checkout", "finish", "finalize", "bill", "complete", "done"];

const STOP_UNITS = ["packet","packets","kg","kilo","kilos","grams","gram","liter","liters","bottle","bottles","of"];

const NUMBER_WORDS = { one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10 };
const FRACTIONS = { half:0.5, quarter:0.25 };
const QUANTIFIERS = { dozen:12 };

function detectIntent(text){
  const words = text.split(" ");
  if(words.some(w=>ADD_KEYWORDS.includes(w))) return "ADD";
  if(words.some(w=>REMOVE_KEYWORDS.includes(w))) return "REMOVE";
  if(words.some(w=>FINALIZE_KEYWORDS.includes(w))) return "FINALIZE";
  return "UNKNOWN";
}

function parseQuantity(words){
  let quantity = 1;

  for(let i=0;i<words.length;i++){
    const w = words[i];
    if(!isNaN(w)) quantity = Number(w);
    if(NUMBER_WORDS[w]) quantity = NUMBER_WORDS[w];
    if(FRACTIONS[w]) quantity = FRACTIONS[w];
    if(QUANTIFIERS[w]) quantity = QUANTIFIERS[w];

    if(w==="point" && i>0 && i<words.length-1){
      const before = NUMBER_WORDS[words[i-1]] || words[i-1];
      const after = NUMBER_WORDS[words[i+1]] || words[i+1];
      quantity = parseFloat(`${before}.${after}`);
    }
  }
  return quantity;
}

function removeStopUnits(words){
  return words.filter(w=>!STOP_UNITS.includes(w));
}

async function matchProduct(words) {

  const products = await getAllProducts()

  const settings = await Settings.findOne()
  const threshold = settings?.voiceSensitivity ?? 0.4

  console.log("NLU Threshold:", threshold)

  let bestMatch = null
  let bestScore = 0

  for (let word of words) {

    for (let product of products) {

      const scoreName = similarity(word, product.name)

      let scoreAlias = 0

      if (product.aliases?.length) {
        for (let alias of product.aliases) {
          const s = similarity(word, alias)
          if (s > scoreAlias) scoreAlias = s
        }
      }

      const finalScore = Math.max(scoreName, scoreAlias)

      if (finalScore > bestScore) {
        bestScore = finalScore
        bestMatch = product.name
      }

    }

  }

  if (bestScore >= threshold) {
    return { bestMatch, bestScore }
  }

  return { bestMatch: null, bestScore }
}

async function parseCommand(transcript){

  const text = transcript.toLowerCase().trim();

  const intent = detectIntent(text);

  if(intent === "FINALIZE"){
    return { intent:"FINALIZE", items:[] };
  }

  let words = text.split(" ");

  const quantity = parseQuantity(words);

  words = removeStopUnits(words);

  const { bestMatch, bestScore } = await matchProduct(words);

  if(!bestMatch){
    return { intent:"UNKNOWN", items:[] };
  }

  return {
    intent,
    confidence: bestScore,
    items:[
      {
        name: bestMatch,
        quantity
      }
    ]
  };
}

module.exports = { parseCommand };