import Headers from '../../../headers'

describe('International Passport Verification API', () => {
  const url = 'https://dev-core-api-v2.blusalt.net/api/identities/ng/international-passport';

  it('verifies passport successfully', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: {
        idNumber: "A11111111",
        lastName: "Doe"
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
      body: { lastName: "Doe" }
    }).then((res) => {
      expect(res.status).to.be.oneOf([400, 422]);
    });
  });

  it('fails when lastName is missing', () => {
    cy.request({
      method: 'POST',
      url,
      failOnStatusCode: false,
      body: { idNumber: "A11111111" }
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('fails for invalid passport number format', () => {
    cy.request({
      method: 'POST',
      url,
      failOnStatusCode: false,
      body: { idNumber: "12345", lastName: "Doe" }
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('returns error for wrong lastName', () => {
    cy.request({
      method: 'POST',
      url,
      failOnStatusCode: false,
      body: { idNumber: "A11111111", lastName: "Wrong" }
    }).then((res) => {
      expect(res.body.success).to.be.false;
    });
  });
});