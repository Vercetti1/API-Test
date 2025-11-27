import Headers from '../../headers.js';

describe('NIN Verification API Tests', () => {
  const apiUrl = 'https://dev-core-api-v2.blusalt.net/api/identities/ng/nin';

  const validPayload = {
    idNumber: "49448591833"
  };

  it('Should verify NIN successfully with valid idNumber', () => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      headers: { ...Headers, 'Content-Type': 'application/json' },
      body: validPayload
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.success).to.be.true;

      // Reference check
      expect(response.body.data).to.have.property('reference');
      expect(response.body.data.reference).to.be.a('string').and.not.be.empty;

      // Results object
      expect(response.body.data).to.have.property('results');
      expect(response.body.data.results).to.have.property('idNumber', validPayload.idNumber);
      expect(response.body.data.results).to.have.property('status'); // usually "verified" or "not_verified"
    });
  });

  it('Should fail when idNumber is missing', () => {
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

  it('Should fail when idNumber format is invalid', () => {
    const payload = { idNumber: "12345" }; // invalid format
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
});