import Headers from '../../../headers';

describe('Smart KYC - Liveness Check API', () => {
  const url = 'https://dev-core-api-v2.blusalt.net/api/smart-kyc/liveness-check';

  const validPayload = {
    videoUrl: "https://we.tl/t-3a7XlymCYZ"
  };

  it('should return liveness check data for a valid video', () => {
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

  it('should fail when videoUrl is missing', () => {
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

  it('should fail when videoUrl is empty', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { videoUrl: "" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should fail for invalid videoUrl format', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { videoUrl: "invalid-url" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });
});