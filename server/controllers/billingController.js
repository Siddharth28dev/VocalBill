const { parseCommand } = require("../services/nluService");
const { processCommand } = require("../services/billingService");
const logLatency = require("../benchmarks/latencyLogger");

exports.handleVoiceCommand = async (req, res) => {

  const totalStart = process.hrtime.bigint();

  try {

    const { transcript } = req.body;

    if (!transcript) {
      return res.status(400).json({ error: "Transcript required" });
    }

    console.log("ASR Transcript:", transcript);

    /*
    NLU timing
    */

    const nluStart = process.hrtime.bigint();
    const nluResult = await parseCommand(transcript);
    const nluEnd = process.hrtime.bigint();

    const nluTime = Number(nluEnd - nluStart) / 1e6;

    /*
    Billing timing
    */

    const billingStart = process.hrtime.bigint();
    const result = await processCommand(nluResult);
    const billingEnd = process.hrtime.bigint();

    const billingTime = Number(billingEnd - billingStart) / 1e6;

    /*
    Total latency
    */

    const totalEnd = process.hrtime.bigint();
    const totalTime = Number(totalEnd - totalStart) / 1e6;

    /*
    Log benchmark
    */

    logLatency({
      transcript,
      intent: nluResult.intent,
      nlu_time_ms: nluTime,
      billing_time_ms: billingTime,
      total_time_ms: totalTime
    });

    res.json({
      nlu: nluResult,
      result
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });

  }

};