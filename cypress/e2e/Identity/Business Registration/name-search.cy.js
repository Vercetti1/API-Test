import Headers from '../../../headers';

describe('Business Name Search API', () => {
  const url = 'https://dev-core-api-v2.blusalt.net/api/registrations/name-search';

  const baseHeaders = {
    ...Headers,
    'Content-Type': 'application/json',
    countryCode: 'NG'
  };

  const validPayload = {
    name: "JG Group",
    lineOfBusiness: "technology"
  };

  it('should return search results successfully', () => {
    cy.request({
      method: 'POST',
      url,
      headers: baseHeaders,
      body: validPayload
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.success).to.be.true;
      expect(res.body.data).to.exist;
    });
  });

  it('should fail when name is missing', () => {
    cy.request({
      method: 'POST',
      url,
      headers: baseHeaders,
      body: { lineOfBusiness: "technology" },
      failOnStatusCode: false
    }).then((res) => {
      expect([400, 422]).to.include(res.status);
    });
  });

  it('should fail when lineOfBusiness is missing', () => {
    cy.request({
      method: 'POST',
      url,
      headers: baseHeaders,
      body: { name: "JG Group" },
      failOnStatusCode: false
    }).then((res) => {
      expect([400, 422]).to.include(res.status);
    });
  });

  it('should fail when name is empty', () => {
    cy.request({
      method: 'POST',
      url,
      headers: baseHeaders,
      body: { name: "", lineOfBusiness: "technology" },
      failOnStatusCode: false
    }).then((res) => {
      expect([400, 422]).to.include(res.status);
    });
  });

  it('should fail when lineOfBusiness is empty', () => {
    cy.request({
      method: 'POST',
      url,
      headers: baseHeaders,
      body: { name: "JG Group", lineOfBusiness: "" },
      failOnStatusCode: false
    }).then((res) => {
      expect([400, 422]).to.include(res.status);
    });
  });
});