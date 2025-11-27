describe('AML Search API', () => {
  const url = 'https://dev-core-api-v2.blusalt.net/api/aml/search';

  const validPayload = {
    type: "pep",
    name: "sarah"
  };

  it('should return AML search results successfully', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
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
      body: { type: "pep" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should fail when type is missing', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { name: "sarah" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should fail with invalid type', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { type: "invalid", name: "sarah" },
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
      body: { type: "pep", name: "" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });
});