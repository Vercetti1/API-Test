import Headers from '../../../headers.js';

describe('DNIN Verification API Tests', () => {

  const apiUrl = 'https://dev-core-api-v2.blusalt.net/api/identities/ng/dnin';

  const validPayload = {
    app: "Verification App",
    firstName: "KEHINDE",
    lastName: "OGUNKANMI",
    gender: "male",
    dateOfBirth: "31-05-1996"
  };

  it('Should verify DNIN successfully with valid data', () => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      headers: Headers,
      body: validPayload
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.success).to.be.true;
      expect(response.body.data).to.have.property('reference');
      expect(response.body.data).to.have.property('results');
    });
  });

  it('Should fail when firstName is missing', () => {
    const payload = { ...validPayload };
    delete payload.firstName;

    cy.request({
      method: 'POST',
      url: apiUrl,
      headers: Headers,
      body: payload,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('Should fail when lastName is missing', () => {
    const payload = { ...validPayload };
    delete payload.lastName;

    cy.request({
      method: 'POST',
      url: apiUrl,
      headers: Headers,
      body: payload,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('Should fail when gender is missing', () => {
    const payload = { ...validPayload };
    delete payload.gender;

    cy.request({
      method: 'POST',
      url: apiUrl,
      headers: Headers,
      body: payload,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('Should fail when dateOfBirth is missing', () => {
    const payload = { ...validPayload };
    delete payload.dateOfBirth;

    cy.request({
      method: 'POST',
      url: apiUrl,
      headers: Headers,
      body: payload,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('Should fail when gender is invalid', () => {
    const payload = { ...validPayload, gender: "unknown" };

    cy.request({
      method: 'POST',
      url: apiUrl,
      headers: Headers,
      body: payload,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      //returns 500 instead
    });
  });

  it('Should fail when dateOfBirth format is wrong', () => {
    const payload = { ...validPayload, dateOfBirth: "1996/05/31" };

    cy.request({
      method: 'POST',
      url: apiUrl,
      headers: Headers,
      body: payload,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      //returns 500 instead
    });
  });

});