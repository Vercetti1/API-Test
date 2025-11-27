import Headers from '../../headers.js';

describe('Internet Purchase API Tests', () => {
  const apiUrl = 'https://dev-core-api-v2.blusalt.net/api/internet/purchase';

  const validPayload = {
    recipient: "1402000567",
    amount: 1800,
    productId: "101",
    internetType: "smile",
    bundle: "500MB Data Bundle"
  };

  it('Should purchase internet successfully with valid data', () => {
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
      //returns 200 for purchase of -100
    });
  });

  it('Should fail when productId is missing', () => {
    const payload = { ...validPayload };
    delete payload.productId;

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

  it('Should fail when internetType is missing', () => {
    const payload = { ...validPayload };
    delete payload.internetType;

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

  it('Should fail when bundle is missing', () => {
    const payload = { ...validPayload };
    delete payload.bundle;

    cy.request({
      method: 'POST',
      url: apiUrl,
      headers: { ...Headers, 'Content-Type': 'application/json' },
      body: payload,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      //returns 200 when bundle in payload is removed
    });
  });
});