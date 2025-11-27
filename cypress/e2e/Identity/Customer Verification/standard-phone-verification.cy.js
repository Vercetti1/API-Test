import Headers from '../../headers';

describe('Standard Phone Verification API', () => {
  const url = 'https://dev-core-api-v2.blusalt.net/api/customer-verifications/ng/phone/standard';

  const validPayload = {
    phoneNumber: "08000000000"
  };

  it('should return standard phone verification details', () => {
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