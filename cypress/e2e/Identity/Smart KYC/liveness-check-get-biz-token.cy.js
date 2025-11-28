import Headers from '../../../headers';

describe('Smart KYC - Get Biz Token API', () => {
  const url = 'https://dev-core-api-v2.blusalt.net/api/smart-kyc/liveness-check/get-biz-token';

  const validPayload = {
    livenessType: "still",
    imageUrl: "https://nathanielbassey.com/wp-content/uploads/2022/02/nb1.jpg"
  };

  it('should return biz token for valid livenessType and image', () => {
    cy.request({
      method: 'POST',
      url,
      headers: { ...Headers, 'Content-Type': 'application/json' },
      body: validPayload
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.success).to.be.true;
      expect(res.body.data.token).to.exist;
    });
  });

  it('should fail when livenessType is missing', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { imageUrl: validPayload.imageUrl },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should fail when imageUrl is missing', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { livenessType: validPayload.livenessType },
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
      body: { livenessType: validPayload.livenessType, imageUrl: "" },
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
      body: { livenessType: validPayload.livenessType, imageUrl: "invalid-url" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });
});