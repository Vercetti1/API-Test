import Headers from '../../headers';

describe('Account Enquiry API', () => {
  const url = 'https://dev-core-api-v2.blusalt.net/api/customer-verifications/account-enquiry';

  const validPayload = {
    accountNumber: "0130233412",
    bankCode: "058"
  };

  it('should return account details for valid accountNumber and bankCode', () => {
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

  it('should fail when accountNumber is missing', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { bankCode: "058" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should fail when bankCode is missing', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { accountNumber: "0130233412" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should fail for invalid accountNumber format', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { accountNumber: "123", bankCode: "058" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should fail for invalid bankCode format', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { accountNumber: "0130233412", bankCode: "XYZ" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });
});