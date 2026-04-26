# Evaluation Methodology

## Objective

The evaluation phase aims to quantitatively measure the performance of the deterministic Natural Language Understanding (NLU) engine used in the voice-based POS billing system.

The evaluation focuses on:

- Intent classification accuracy  
- Slot extraction accuracy  
- System behavior under scaled product datasets  
- Reproducibility of deterministic parsing  

---

## Dataset Description

A controlled command dataset was constructed containing voice-like billing instructions.

Dataset characteristics:

- Multiple intent types: ADD, REMOVE, FINALIZE  
- Numeric and word-based quantity expressions  
- Fractional quantity phrases  
- Stop-unit variations  
- Alias-based product references  

The dataset was designed to simulate realistic retail billing interactions.

---

## Evaluation Metrics

The following standard information retrieval metrics were used.

### Intent Metrics

- Precision  
- Recall  
- F1 Score  

These metrics measure the correctness of intent detection.

### Slot Metrics

- Precision  
- Recall  
- F1 Score  

These metrics evaluate correct extraction of:

- Product name  
- Quantity  

---

## Evaluation Procedure

1. Each transcript is processed by the deterministic NLU engine.  
2. Predicted intent is compared with ground truth intent.  
3. Extracted product name and quantity are compared with annotated values.  
4. True Positive, False Positive, and False Negative counts are accumulated.  
5. Metrics are computed using standard formulas.

---

## Updated Evaluation Results

After system expansion and feature integration, updated results were obtained.

### Intent Detection Performance

- Precision ≈ 0.976  
- Recall ≈ 0.976  
- F1 Score ≈ 0.976  

This indicates high reliability of keyword-based deterministic intent classification even after system scaling.

### Slot Extraction Performance

- Precision ≈ 0.735  
- Recall ≈ 0.735  
- F1 Score ≈ 0.735  

Performance reduction was observed due to:

- Increased product gazetteer size  
- Alias overlap between products  
- Lexical ambiguity in spoken commands  

---

## Interpretation

The results demonstrate that deterministic parsing maintains strong intent recognition performance while slot extraction becomes more challenging as system vocabulary expands.

This behavior aligns with expectations for rule-based NLU systems operating in larger lexical domains.

---

## Reproducibility

All evaluation scripts, datasets, and reports are included in the project repository to ensure reproducible experimentation.

---

## Future Evaluation Scope

Future work may include:

- Larger command corpora  
- Multilingual dataset evaluation  
- Real ASR transcript testing  
- Comparative analysis with probabilistic models