import Headers from '../../headers.js';

describe('OTP Send API Tests', () => {
  const apiUrl = 'https://dev-core-api-v2.blusalt.net/api/messaging/otp/send';

  const validPayload = {
    sender_id: "Blusalt",
    message: "Use code {code} to verify your subscription. It expires in 5 minutes.",
    phone_number: "+2349131135978",
    code_length: 5,
    country_code: "234",
    email: "tomisin@blusalt.net",
    mail_body: "Use code {code} to verify your subscription. It expires in 5 minutes.",
    route: ["sms", "email"]
  };

  it('Should send OTP successfully via SMS and Email', () => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      headers: { ...Headers, 'Content-Type': 'application/json' },
      body: validPayload
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.success).to.be.true;
      expect(response.body.data).to.have.property('references');
    });
  });

  it('Should fail if sender_id is missing', () => {
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

  it('Should fail if phone_number is invalid', () => {
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

  it('Should fail if country_code is missing', () => {
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

  it('Should fail if route array is empty', () => {
    const payload = { ...validPayload, route: [] };

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

  it('Should handle single route only (SMS) and be successful', () => {
    const payload = { ...validPayload, route: ["sms"] };

    cy.request({
      method: 'POST',
      url: apiUrl,
      headers: { ...Headers, 'Content-Type': 'application/json' },
      body: payload
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.success).to.be.true;
    });
  });

  it('Should handle single route only and be successful (Email)', () => {
    const payload = { ...validPayload, route: ["email"] };

    cy.request({
      method: 'POST',
      url: apiUrl,
      headers: { ...Headers, 'Content-Type': 'application/json' },
      body: payload
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.success).to.be.true;
    });
  });
});