import Headers from '../../headers.js';

describe('Airtime Purchase API Tests', () => {
  const apiUrl = 'https://dev-core-api-v2.blusalt.net/api/airtime/purchase';

  const validPayload = {
    recipient: "2348064580213",
    amount: 100
  };

  it('Should purchase airtime successfully with valid data', () => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      headers: { ...Headers, 'Content-Type': 'application/json' },
      body: validPayload
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.success).to.be.true;
      expect(response.body.data).to.have.property('reference');
    });
  });

  it('Should fail when recipient is missing', () => {
    const payload = { ...validPayload };
    delete payload.recipient;

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

  it('Should fail when amount is missing', () => {
    const payload = { ...validPayload };
    delete payload.amount;

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

  it('Should fail when amount is invalid', () => {
    const payload = { ...validPayload, amount: -10 };

    cy.request({
      method: 'POST',
      url: apiUrl,
      headers: { ...Headers, 'Content-Type': 'application/json' },
      body: payload,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      //returns 500 instead
    });
  });

  it('Should fail when recipient format is invalid', () => {
    const payload = { ...validPayload, recipient: "12345" };

    cy.request({
      method: 'POST',
      url: apiUrl,
      headers: { ...Headers, 'Content-Type': 'application/json' },
      body: payload,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      //returns 500 instead
    });
  });
});