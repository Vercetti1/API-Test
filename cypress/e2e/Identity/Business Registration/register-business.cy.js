import Headers from '../../../headers';

describe('Business Registration API', () => {
  const url = 'https://dev-core-api-v2.blusalt.net/api/registrations/registers';

  const baseHeaders = {
    ...Headers,
    'Content-Type': 'application/json',
    countryCode: 'NG'
  };

  const validPayload = {
    lineOfBusiness: "fashion",
    proprietorCity: "Abuja",
    companyCity: "Abuja",
    proprietorPhonenumber: "07057001119",
    businessCommencementDate: "2024-01-21",
    companyState: "F.C.T",
    proprietorNationality: "Nigerian",
    proprietorState: "F.C.T",
    proprietorDob: "2000-01-21",
    proprietorFirstname: "Joshua",
    proprietorOthername: "James",
    proprietorSurname: "Adeyemo",
    proposedOption1: "joshua ahmed store",
    proprietorGender: "MALE",
    proprietorStreetNumber: "41",
    proprietorServiceAddress: "limpopo street",
    companyEmail: "chylau12@gmail.com",
    companyStreetNumber: "41",
    proprietorEmail: "chylau12@gmail.com",
    companyAddress: "limpopo street",
    proprietorPostcode: "900108",
    proprietorLga: "municipal",
    transactionRef: "VAS3450006",
    supportingDoc: "data:image/png;base64,",
    signature: "data:image/png;base64,...",
    meansOfId: "data:image/png;base64,...",
    passport: "data:image/png;base64,..."
  };

  // 1. Successful registration
  it('should register business successfully', () => {
    cy.request({
      method: 'POST',
      url,
      headers: baseHeaders,
      body: validPayload,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.success).to.be.true;
      expect(response.body.data.reference).to.exist;
    });
  });

  // 2. Missing proprietorFirstname
  it('should fail when proprietorFirstname is missing', () => {
    const payload = { ...validPayload };
    delete payload.proprietorFirstname;

    cy.request({
      method: 'POST',
      url,
      headers: baseHeaders,
      body: payload,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('should fail when proprietorPhonenumber is missing', () => {
    const payload = { ...validPayload };
    delete payload.proprietorPhonenumber;

    cy.request({
      method: 'POST',
      url,
      headers: baseHeaders,
      body: payload,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('should fail for invalid phone number format', () => {
    const payload = { ...validPayload, proprietorPhonenumber: "123" };

    cy.request({
      method: 'POST',
      url,
      headers: baseHeaders,
      body: payload,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('should fail when transactionRef is missing', () => {
    const payload = { ...validPayload };
    delete payload.transactionRef;

    cy.request({
      method: 'POST',
      url,
      headers: baseHeaders,
      body: payload,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('should fail when passport is missing', () => {
    const payload = { ...validPayload };
    delete payload.passport;

    cy.request({
      method: 'POST',
      url,
      headers: baseHeaders,
      body: payload,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

});