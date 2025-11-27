import Headers from "../../headers.js";

describe("Betting Fund Account API Tests", () => {
  const apiUrl = "https://dev-core-api-v2.blusalt.net/api/betting/fund-account";

  const validPayload = {
    name: "Test Account 2",
    customerId: "34382",
    bettingProvider: "Bet9ja",
    serviceId: "B01T",
    amount: 100,
  };

  it("Should fund betting account successfully with valid data", () => {
    cy.request({
      method: "POST",
      url: apiUrl,
      headers: { ...Headers, "Content-Type": "application/json" },
      body: validPayload,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.success).to.be.true;

      expect(response.body.data).to.have.property("reference");
      expect(response.body.data.reference).to.be.a("string").and.not.be.empty;
    });
  });

  it("Should fail when name is missing", () => {
    const payload = { ...validPayload };
    delete payload.name;

    cy.request({
      method: "POST",
      url: apiUrl,
      headers: { ...Headers, "Content-Type": "application/json" },
      body: payload,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it("Should fail when customerId is missing", () => {
    const payload = { ...validPayload };
    delete payload.customerId;

    cy.request({
      method: "POST",
      url: apiUrl,
      headers: { ...Headers, "Content-Type": "application/json" },
      body: payload,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it("Should fail when bettingProvider is missing", () => {
    const payload = { ...validPayload };
    delete payload.bettingProvider;

    cy.request({
      method: "POST",
      url: apiUrl,
      headers: { ...Headers, "Content-Type": "application/json" },
      body: payload,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it("Should fail when serviceId is missing", () => {
    const payload = { ...validPayload };
    delete payload.serviceId;

    cy.request({
      method: "POST",
      url: apiUrl,
      headers: { ...Headers, "Content-Type": "application/json" },
      body: payload,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it("Should fail when amount is missing or invalid", () => {
    const payload = { ...validPayload, amount: -10 };

    cy.request({
      method: "POST",
      url: apiUrl,
      headers: { ...Headers, "Content-Type": "application/json" },
      body: payload,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      //returns 500 instead
    });
  });
});
