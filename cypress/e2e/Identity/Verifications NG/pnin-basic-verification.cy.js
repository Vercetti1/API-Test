import Headers from '../../../headers.js';

describe('PNIN Basic Verification API', () => {
  const apiUrl = 'https://dev-core-api-v2.blusalt.net/api/identities/ng/pnin-basic';

  const validPayload = {
    app: "Verification App",
    phoneNumber: "08100049567"
  };

  it('Should verify PNIN basic successfully with valid data', () => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      headers: Headers,
      body: validPayload
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.success).to.be.true;
      expect(response.body.data).to.have.property('reference');
      expect(response.body.data).to.have.property('results');
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

  it('Should fail when app is missing', () => {
    const payload = { ...validPayload };
    delete payload.app;

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

  it('Should fail with invalid phoneNumber format', () => {
    const payload = { ...validPayload, phoneNumber: "12345" };

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

  it('Should fail when phoneNumber is not a string', () => {
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