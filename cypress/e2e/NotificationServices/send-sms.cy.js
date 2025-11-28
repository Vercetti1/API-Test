import Headers from '../../headers.js'

describe('SMS API Tests with Correct Payload', () => {
  const apiUrl = 'https://dev-core-api-v2.blusalt.net/api/messaging/sms';

  const validPayload = {
    sender_id: "Blusalt",
    message: "Hello from the other side",
    group_id: "string",
    phone_numbers: ["09131135978"],
    country_code: "234"
  };

  it('Should send SMS successfully with valid data', () => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      headers: Headers,
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
      headers: Headers,
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
      headers: Headers,
      body: payload,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('Should fail when phone_numbers is missing', () => {
    const payload = { ...validPayload };
    delete payload.phone_numbers;

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

  it('Should fail when country_code is missing', () => {
    const payload = { ...validPayload };
    delete payload.country_code;

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
    const payload = { ...validPayload, phone_numbers: ["12345"] };

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

  it('Should handle multiple phone numbers', () => {
    const payload = { ...validPayload, phone_numbers: ["09131135978", "09132234567"] };

    cy.request({
      method: 'POST',
      url: apiUrl,
      headers: Headers,
      body: payload
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.references).to.have.length(2);
    });
  });

  it('Should fail with empty body', () => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      headers: Headers,
      body: {},
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });
});