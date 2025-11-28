import Headers from '../../../headers';

describe('TIN Verification API', () => {
  const url = 'https://dev-core-api-v2.blusalt.net/api/businesses/tin-verification';

  const validPayload = {
    registrationNumber: "00000000-0001",
    countryCode: "NG",
    type: "tin"
  };

  it('should verify TIN successfully', () => {
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

  it('should fail when registrationNumber is missing', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { countryCode: "NG", type: "tin" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should fail when countryCode is missing', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { registrationNumber: "00000000-0001", type: "tin" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should fail when type is missing', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { registrationNumber: "00000000-0001", countryCode: "NG" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should fail when registrationNumber is empty', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { registrationNumber: "", countryCode: "NG", type: "tin" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should fail when countryCode is empty', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { registrationNumber: "00000000-0001", countryCode: "", type: "tin" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should fail for invalid type', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { registrationNumber: "00000000-0001", countryCode: "NG", type: "abc" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });
});