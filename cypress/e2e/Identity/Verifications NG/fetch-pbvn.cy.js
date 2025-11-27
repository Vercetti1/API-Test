import Headers from '../../../headers.js';

describe('Phone BVN Verification API Tests', () => {
  const apiUrl = 'https://dev-core-api-v2.blusalt.net/api/identities/ng/pbvn';

  const validPayload = {
    phoneNumber: "08092124411"
  };

  it('Should verify PBVN successfully with valid phoneNumber', () => {
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
      expect(response.body.data.results).to.have.property('phoneNumber', validPayload.phoneNumber);
      expect(response.body.data.results).to.have.property('status');
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
      //returns 200 instead
    });
  });
});