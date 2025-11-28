import Headers from '../../headers.js';

describe('OTP Verify API Tests', () => {
  const apiUrl = 'https://dev-core-api-v2.blusalt.net/api/messaging/otp/verify';

  const validPayload = {
    code: "14855",
    token: "5C0A48B3-5E4F-431E-87ED-4136883AC6A0"
  };

  it('Should verify OTP successfully with valid code and token', () => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      headers: { ...Headers, 'Content-Type': 'application/json' },
      body: validPayload
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.success).to.be.true;
    });
  });

  it('Should fail when code is invalid', () => {
    const payload = { ...validPayload, code: "00000" };

    cy.request({
      method: 'POST',
      url: apiUrl,
      headers: { ...Headers, 'Content-Type': 'application/json' },
      body: payload,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('Should fail when token is missing', () => {
    const payload = { ...validPayload };
    delete payload.token;

    cy.request({
      method: 'POST',
      url: apiUrl,
      headers: { ...Headers, 'Content-Type': 'application/json' },
      body: payload,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('Should fail when code is missing', () => {
    const payload = { ...validPayload };
    delete payload.code;

    cy.request({
      method: 'POST',
      url: apiUrl,
      headers: { ...Headers, 'Content-Type': 'application/json' },
      body: payload,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('Should fail when both code and token are invalid', () => {
    const payload = { code: "00000", token: "INVALID-TOKEN" };

    cy.request({
      method: 'POST',
      url: apiUrl,
      headers: { ...Headers, 'Content-Type': 'application/json' },
      body: payload,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });
});