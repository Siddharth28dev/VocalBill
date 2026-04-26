# Deterministic NLU Algorithm

## Overview

The Natural Language Understanding (NLU) engine used in the proposed voice-based POS system follows a deterministic rule-based approach.  
The objective is to interpret controlled-domain billing commands with low latency, high transparency, and reproducible performance.

Unlike probabilistic or neural approaches, the deterministic NLU pipeline ensures explainable decision-making suitable for research evaluation.

---

## Command Processing Pipeline

Each voice transcript undergoes the following stages:

1. Transcript normalization  
2. Intent classification  
3. Quantity extraction  
4. Stop-unit filtering  
5. Gazetteer product matching  
6. Structured output validation  

---

## Transcript Normalization

Speech recognition transcripts are converted to lowercase and trimmed.  
Common ASR errors are corrected using predefined lexical substitution rules.

Examples:

- "too" → "two"  
- "banans" → "banana"  
- "chekout" → "checkout"  

This stage reduces noise impact before deterministic parsing.

---

## Intent Classification

Intent detection uses keyword-based matching.

Supported intents:

- ADD  
- REMOVE  
- FINALIZE  

Each transcript is tokenized and matched against predefined keyword lists.  
The first matching keyword determines the intent category.

This deterministic approach ensures predictable classification behavior.

---

## Quantity Extraction

The algorithm supports multiple quantity formats:

### Numeric Quantities
Example:
add 3 bananas


### Word-Based Quantities
Example:
add three bananas


### Fractional Quantities
Example:
add half kilo rice


### Decimal Quantities
Example:
add two point five sugar


### Quantifier Phrases
Example:
add dozen eggs


Parsed quantities are converted into floating-point values.

---

## Stop-Unit Filtering

Irrelevant measurement words are removed before product matching.

Examples include:

- packet  
- kilo  
- liter  
- bottle  
- dozen  

This simplifies token space and improves gazetteer lookup accuracy.

---

## Gazetteer Product Matching

A deterministic gazetteer lookup mechanism is used to match product names.

Features include:

- Case-insensitive matching  
- Voice alias support  
- Fuzzy similarity scoring  
- Configurable sensitivity threshold  

Similarity scores are computed between transcript tokens and product names or aliases.  
The highest scoring match above threshold is selected.

---

## Sensitivity Threshold Configuration

The similarity threshold is dynamically loaded from system settings.

Lower thresholds increase recall but may introduce ambiguity.  
Higher thresholds improve precision but may reject noisy inputs.

This configuration enables controlled experimentation.

---

## Structured Output Generation

The final parsed result follows a strict schema:

{
intent: "ADD",
items: [
{
name: "banana",
quantity: 2
}
]
}


Output validation ensures consistent downstream processing.

---

## Algorithm Advantages

- Fully deterministic behavior  
- Low computational overhead  
- Explainable decision pipeline  
- Configurable matching sensitivity  
- Real-time POS suitability  

---

## Limitations

- No contextual dialogue modeling  
- Performance depends on gazetteer quality  
- Increased lexical ambiguity with dataset scaling  

---

## Future Enhancements

- Grammar-based multilingual parsing  
- Phonetic similarity scoring  
- Context-aware slot refinement  
- Hybrid deterministic-probabilistic architectures