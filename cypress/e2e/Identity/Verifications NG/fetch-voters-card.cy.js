import Headers from '../../../headers'

describe('Voters Card Verification API', () => {
  const url = 'https://dev-core-api-v2.blusalt.net/api/identities/ng/voters-card';


  const validPayload = {
    idNumber: "00A0A0A000000000000"
  };

  it('should verify voters card successfully', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: validPayload
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.success).to.be.true;
      expect(res.body.data.reference).to.exist;
    });
  });

  it('should fail when idNumber is missing', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: {},
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.be.oneOf([400, 422]);
    });
  });

  it('should fail when idNumber is empty', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { idNumber: "" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should fail for invalid VIN format', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { idNumber: "12345" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should return error for non-existent voters card', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { idNumber: "00A0A0A000000000999" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.body.success).to.be.false;
    });
  });
});