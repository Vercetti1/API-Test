import Headers from '../../headers.js';

describe('Cable Purchase API Tests', () => {
  const apiUrl = 'https://dev-core-api-v2.blusalt.net/api/cable/purchase';

  const validPayload = {
    serviceId: "gotv",
    smartCardCode: "10208738160",
    customerName: "Sten Mockett",
    amount: 900,
    invoicePeriod: 1,
    monthsPaidFor: 1,
    productName: "GOtv Smallie - monthly",
    productCode: "GOHAN"
  };

  it('Should purchase cable subscription successfully with valid data', () => {
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
    const payload = { ...validPayload, amount: -100 };

    cy.request({
      method: 'POST',
      url: apiUrl,
      headers: { ...Headers, 'Content-Type': 'application/json' },
      body: payload,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      //returns 200 instead
    });
  });

  it('Should fail when smartCardCode is missing', () => {
    const payload = { ...validPayload };
    delete payload.smartCardCode;

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

  it('Should fail when smartCardCode format is invalid', () => {
    const payload = { ...validPayload, smartCardCode: "123" };

    cy.request({
      method: 'POST',
      url: apiUrl,
      headers: { ...Headers, 'Content-Type': 'application/json' },
      body: payload,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      //returns 200 instead
    });
  });

  it('Should fail when serviceId is missing', () => {
    const payload = { ...validPayload };
    delete payload.serviceId;

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