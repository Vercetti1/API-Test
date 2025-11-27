import Headers from '../../../headers';

describe('KYC Basics API', () => {
  const countryCode = 'ng'; // replace with desired country code
  const url = `https://dev-core-api-v2.blusalt.net/api/customer-verifications/${countryCode}/kyc-basics`;

  const validPayload = {
    phoneNumber: "08000000000"
  };

  it('should return KYC basic details for valid phone number', () => {
    cy.request({
      method: 'POST',
      url,
      headers: { ...Headers, 'Content-Type': 'application/json' },
      body: validPayload
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.success).to.be.true;
      expect(res.body.data).to.exist;
    });
  });

  it('should fail when phoneNumber is missing', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: {},
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should fail when phoneNumber is empty', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { phoneNumber: "" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should fail for invalid phone number format', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { phoneNumber: "12345" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });
});