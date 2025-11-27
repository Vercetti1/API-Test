import Headers from '../../headers';

describe('BIN Lookup API', () => {
  const url = 'https://dev-core-api-v2.blusalt.net/api/customer-verifications/bin-lookup';

  const validPayload = { bin: "539954" };

  it('should return BIN details for valid BIN', () => {
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

  it('should fail when BIN is missing', () => {
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

  it('should fail for invalid BIN format', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { bin: "123" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });
});