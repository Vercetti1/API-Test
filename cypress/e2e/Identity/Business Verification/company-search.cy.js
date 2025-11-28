import Headers from '../../../headers';

describe('Company Basic Search API', () => {
  const url = 'https://dev-core-api-v2.blusalt.net/api/businesses/company-basic-search';

  const validPayload = {
    companyName: "Chinook Capital",
    countryCode: "NG"
  };

  it('should return company search results successfully', () => {
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

  it('should fail when companyName is missing', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { countryCode: "NG" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should fail when countryCode is missing', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { companyName: "Chinook Capital" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should fail when companyName is empty', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { companyName: "", countryCode: "NG" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should fail when countryCode is empty', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { companyName: "Chinook Capital", countryCode: "" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });
});