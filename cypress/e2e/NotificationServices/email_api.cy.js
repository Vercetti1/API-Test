import Headers from '../../headers.js';

describe('Email API Tests - Raw JSON', () => {
  const apiUrl = 'https://dev-core-api-v2.blusalt.net/api/messaging/email';

  const validPayload = {
    mail_body: 'Good day',
    email: 'johndoe@gmail.com',
    subject: 'One Time Passcode',
    context: { code: '1234' },
    country_code: '234'
  };

  it('Should send email successfully with valid data', () => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      headers: { 
        ...Headers, 
        'Content-Type': 'application/json' // required for raw JSON
      },
      body: validPayload
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.success).to.be.true;
    });
  });

  it('Should fail when email is missing', () => {
    const payload = { ...validPayload };
    delete payload.email;

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

  it('Should fail when subject is missing', () => {
    const payload = { ...validPayload };
    delete payload.subject;

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

  it('Should fail when mail_body is missing', () => {
    const payload = { ...validPayload };
    delete payload.mail_body;

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
});