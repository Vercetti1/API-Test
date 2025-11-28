import Headers from '../../headers.js';

describe('Electricity Purchase API Tests', () => {
  const apiUrl = 'https://dev-core-api-v2.blusalt.net/api/electricity/purchase';

  const validPayload = {
    customerAccountId: "04277886901",
    amount: 900,
    customerName: "Tomisin",
    customerAddress: "Nitel Estate 5th Avenue Road M",
    phoneNumber: "09131135978",
    serviceType: "ikeja_electricity_disco",
    meterType: "prepaid"
  };

  it('Should purchase electricity successfully with valid data', () => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      headers: { ...Headers, 'Content-Type': 'application/json' },
      body: validPayload
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.success).to.be.true;
      expect(response.body.data).to.have.property('reference');
      expect(response.body.data.reference).to.be.a('string').and.not.be.empty;
    });
  });

  it('Should fail when customerAccountId is missing', () => {
    const payload = { ...validPayload };
    delete payload.customerAccountId;

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
    const payload = { ...validPayload, amount: -100 };

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

  it('Should fail when amount is missing', () => {
    const payload = { ...validPayload };
    delete payload.amount

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

  it('Should fail when phoneNumber format is invalid', () => {
    const payload = { ...validPayload, phoneNumber: "12345" };

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

  it('Should fail when meterType is missing', () => {
    const payload = { ...validPayload };
    delete payload.meterType;

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

  it('Should fail when serviceType is missing', () => {
    const payload = { ...validPayload };
    delete payload.serviceType;

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