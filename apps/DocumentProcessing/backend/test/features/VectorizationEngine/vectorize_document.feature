Feature: Vectorize a document
  In order to get a clean SVG from an image
  As an API client
  I want to send an image URL and get a successful response

  Scenario: Vectorize a valid document image
    Given I send a "POST" request to "/api/vectorize" with body:
      """
      {
        "documentId": "123e4567-e89b-12d3-a456-426614174000",
        "imageUrl": "https://bucket.legalvec.com/docs/contract_1.jpg",
        "level": "high_fidelity"
      }
      """
    Then the response status code should be 201
