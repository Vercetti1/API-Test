describe('Driver License Verification API', () => {
  const url = 'https://dev-core-api-v2.blusalt.net/api/identities/ng/driver-license';

  it('verifies driver license successfully', () => {
    cy.request({
      method: 'POST',
      url,
      headers: {
        Authorization: `Bearer ${Cypress.env('TOKEN')}`
      },
      body: {
        idNumber: 'AAA00000AA00'
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.success).to.be.true;
    });
  });

  it('fails when idNumber is missing', () => {
    cy.request({
      method: 'POST',
      url,
      failOnStatusCode: false,
      body: {}
    }).then((res) => {
      expect(res.status).to.be.oneOf([400, 422]);
    });
  });

  it('fails for empty idNumber', () => {
    cy.request({
      method: 'POST',
      url,
      failOnStatusCode: false,
      body: { idNumber: "" }
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('fails for invalid idNumber format', () => {
    cy.request({
      method: 'POST',
      url,
      failOnStatusCode: false,
      body: { idNumber: "12345" }
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });
});