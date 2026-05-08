Feature: Vectorize a document
  In order to get a clean SVG from an image
  As an API client
  I want to send an image URL and get a successful response

  Scenario: Vectorize a valid document image
    Given I send a "POST" request to "/api/vectorized-documents" with body:
      """
      {
        "documentId": "123e4567-e89b-12d3-a456-426614174000",
        "imageUrl": "https://bucket.legalvec.com/docs/contract_1.jpg",
        "scale": 1.0,
        "precision": 2,
        "optimizedSvg": "<svg viewBox='0 0 100 100'></svg>",
        "reductionRate": 0.5
      }
      """
    Then the response status code should be 201
