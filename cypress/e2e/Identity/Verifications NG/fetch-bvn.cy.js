import Headers from '../../../headers.js';

describe('BVN Verification API Tests', () => {
  const apiUrl = 'https://dev-core-api-v2.blusalt.net/api/identities/ng/bvn';

  const validPayload = {
    idNumber: "11111111111"
  };

  it('Should verify BVN successfully with valid idNumber', () => {
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

      expect(response.body.data).to.have.property('results');
      expect(response.body.data.results).to.have.property('idNumber', validPayload.idNumber);
      expect(response.body.data.results).to.have.property('status', 'verified');
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
    const payload = { idNumber: "12345" };
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