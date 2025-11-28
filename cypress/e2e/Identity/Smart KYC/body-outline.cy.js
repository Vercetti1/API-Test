import Headers from '../../../headers';

describe('Smart KYC - Body Outline API', () => {
  const url = 'https://dev-core-api-v2.blusalt.net/api/smart-kyc/body-outline';

  const validPayload = {
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEO9Y1H0aniZkWZuqlqLgNuWIDnf3L5rMDFg&s"
  };

  it('should return body outline data for valid image URL', () => {
    cy.request({
      method: 'POST',
      url,
      headers: { ...Headers, 'Content-Type': 'application/json' },
      body: validPayload
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.success).to.be.true;
      expect(res.body.data).to.exist;
    });
  });

  it('should fail when imageUrl is missing', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: {},
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should fail when imageUrl is empty', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { imageUrl: "" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should fail for invalid imageUrl format', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { imageUrl: "invalid-url" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should fail for non-image URL', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { imageUrl: "https://example.com/file.txt" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });
});