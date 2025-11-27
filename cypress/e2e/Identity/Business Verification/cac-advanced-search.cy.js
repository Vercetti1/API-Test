import Headers from '../../headers';

describe('CAC Advanced Search API', () => {
  const url = 'https://dev-core-api-v2.blusalt.net/api/businesses/cac-advanced-search';

  const validPayload = {
    registrationNumber: "RC00000000"
  };

  it('should return CAC search results successfully', () => {
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

  it('should fail when registrationNumber is missing', () => {
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

  it('should fail when registrationNumber is empty', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { registrationNumber: "" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should fail for invalid registrationNumber format', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { registrationNumber: "123" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });
});