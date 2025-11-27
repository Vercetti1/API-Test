import Headers from '../../headers.js';

describe('OTP Send Bundle API Tests', () => {
  const apiUrl = 'https://dev-core-api-v2.blusalt.net/api/messaging/otp/send/bundle';

  const validPayload = {
    sender_id: "Blusalt",
    message: "Use code {code} to verify your subscription. It expires in 5 minutes.",
    phone_number: "08063375775", // local format, remove '+'
    code_length: 5,
    country_code: "234"
  };

  it('Should send OTP bundle successfully with valid data', () => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      headers: { ...Headers, 'Content-Type': 'application/json' },
      body: validPayload
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.success).to.be.true;
      expect(response.body.data.references).to.have.length.greaterThan(0);
    });
  });

  it('Should fail when sender_id is missing', () => {
    const payload = { ...validPayload };
    delete payload.sender_id;

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

  it('Should fail when phone_number is invalid', () => {
    const payload = { ...validPayload, phone_number: "12345" };

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

  it('Should fail when country_code is missing', () => {
    const payload = { ...validPayload };
    delete payload.country_code;

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

  it('Should fail when message is missing', () => {
    const payload = { ...validPayload };
    delete payload.message;

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