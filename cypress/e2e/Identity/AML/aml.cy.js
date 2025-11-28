import Headers from "../../../headers";

describe('AML Search API', () => {
  const url = 'https://dev-core-api-v2.blusalt.net/api/aml/search';

  const validPayload = {
    type: "pep",
    name: "Tomisin"
  };

  it('should return AML search results successfully', () => {
    cy.request({
      method: 'POST',
      url,
      headers: {
        ...Headers,
        'Content-Type': 'application/json'
      },
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
      headers: {
        ...Headers,
        'Content-Type': 'application/json'
      },
      body: { type: "pep" },
      failOnStatusCode: false
    }).then((res) => {
      expect([400, 422]).to.include(res.status);
    });
  });

  it('should fail when type is missing', () => {
    cy.request({
      method: 'POST',
      url,
      headers: {
        ...Headers,
        'Content-Type': 'application/json'
      },
      body: { name: "sarah" },
      failOnStatusCode: false
    }).then((res) => {
      expect([400, 422]).to.include(res.status);
    });
  });

  it('should fail when name is empty', () => {
    cy.request({
      method: 'POST',
      url,
      headers: {
        ...Headers,
        'Content-Type': 'application/json'
      },
      body: { type: "pep", name: "" },
      failOnStatusCode: false
    }).then((res) => {
      expect([400, 422]).to.include(res.status);
    });
  });
});