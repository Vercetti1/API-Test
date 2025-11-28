import Headers from '../../../headers.js';

describe('PNIN Verification API Tests', () => {
  const apiUrl = 'https://dev-core-api-v2.blusalt.net/api/identities/ng/pnin';

  const validPayload = {
    app: "Verification App",
    phoneNumber: "08100049567"
  };

  it('Should verify PNIN successfully with valid data', () => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      headers: Headers,
      body: validPayload
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.success).to.be.true;
      expect(response.body.data).to.have.property('reference');
      expect(response.body.data.results).to.exist;
    });
  });

  it('Should fail when phoneNumber is missing', () => {
    const payload = { ...validPayload };
    delete payload.phoneNumber;

    cy.request({
      method: 'POST',
      url: apiUrl,
      headers: Headers,
      body: payload,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('Should fail for invalid phone number format', () => {
    const payload = { ...validPayload, phoneNumber: "123" };

    cy.request({
      method: 'POST',
      url: apiUrl,
      headers: Headers,
      body: payload,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('Should fail for non-string phone number', () => {
    const payload = { ...validPayload, phoneNumber: 8100049567 };

    cy.request({
      method: 'POST',
      url: apiUrl,
      headers: Headers,
      body: payload,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

});