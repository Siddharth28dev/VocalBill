# Noise Robustness Evaluation

## Objective

The purpose of noise robustness testing is to evaluate the ability of the deterministic NLU engine to correctly interpret voice billing commands when Automatic Speech Recognition (ASR) errors are present.

Retail environments are often noisy, and ASR systems may introduce:

- spelling distortions  
- word substitutions  
- dropped tokens  
- incorrect quantity words  

Therefore, robustness against such variations is critical for real-world deployment.

---

## Noise Simulation Methodology

A noise generation module was implemented to simulate realistic ASR errors.

Three primary noise models were used:

### 1. Word Drop Noise
Random words are removed from the transcript to simulate incomplete speech capture.

Example:
add two bananas → add bananas


### 2. Spelling Distortion Noise
Adjacent characters are swapped to simulate recognition errors.

Example:
banana → banan a → banans


### 3. Quantity Substitution Noise
Common ASR confusions are introduced.

Example:
two → to
four → for
one → won


These noise models allow controlled robustness testing without requiring real ASR logs.

---

## Evaluation Procedure

1. A clean command dataset was processed by the deterministic NLU engine.  
2. Noisy variants of each command were generated automatically.  
3. Predicted intents were compared with ground truth labels.  
4. Accuracy was computed for both clean and noisy datasets.

---

## Results

- Clean intent accuracy: 100%  
- Noisy intent accuracy: 100%  
- Robustness drop: 0  

These results indicate that the deterministic parsing pipeline remains stable under moderate transcript noise conditions.

---

## Interpretation

The strong robustness performance is primarily due to:

- Fuzzy similarity scoring in product matching  
- Alias-based gazetteer design  
- Deterministic keyword intent detection  
- Stop-unit filtering reducing lexical noise impact  

---

## Limitations

The robustness experiment was conducted on a small controlled dataset.  
Larger datasets and real ASR logs are required for statistically significant validation.

---

## Future Work

Future robustness studies may include:

- Multilingual ASR noise testing  
- Background noise simulation  
- Continuous speech command parsing  
- Real-world retail environment evaluation

