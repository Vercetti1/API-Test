import Headers from '../../headers.js';

describe('Data Plans API Tests', () => {
  const apiUrl = 'https://dev-core-api-v2.blusalt.net/api/data/plans';

  const validPayload = {
    phoneNumber: "2349131135978"
  };

  it('Should fetch data plans successfully for a valid phone number', () => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      headers: { ...Headers, 'Content-Type': 'application/json' },
      body: validPayload
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.success).to.be.true;
      expect(response.body.data).to.be.an('array');
      expect(response.body.data.length).to.be.greaterThan(0);
    });
  });

  it('Should fail when phoneNumber is missing', () => {
    const payload = {};
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
    const payload = { phoneNumber: "12345" };
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