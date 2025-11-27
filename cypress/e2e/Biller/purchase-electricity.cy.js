import Headers from '../../headers.js';

describe('Electricity Purchase API Tests', () => {
  const apiUrl = 'https://dev-core-api-v2.blusalt.net/api/electricity/purchase';

  const validPayload = {
    customerAccountId: "04277886901",
    amount: 900,
    customerName: "NP NGEMA",
    customerAddress: "6 ABIODUN ODESEYE Shomolu BU",
    phoneNumber: "08083726749",
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

      // Single reference check
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

  it('Should fail when amount is missing or invalid', () => {
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