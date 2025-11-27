import Headers from '../../headers';

describe('Business Name Search API', () => {
  const url = 'https://dev-core-api-v2.blusalt.net/api/registrations/name-search';

  const validPayload = {
    name: "JG Group",
    lineOfBusiness: "technology"
  };

  it('should return search results successfully', () => {
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

  it('should fail when name is missing', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { lineOfBusiness: "technology" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should fail when lineOfBusiness is missing', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { name: "JG Group" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should fail when name is empty', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { name: "", lineOfBusiness: "technology" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should fail when lineOfBusiness is empty', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { name: "JG Group", lineOfBusiness: "" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });
});