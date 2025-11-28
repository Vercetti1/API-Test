import Headers from '../../../headers';

describe('Smart KYC - Document Capture API', () => {
  const url = 'https://dev-core-api-v2.blusalt.net/api/smart-kyc/document-capture';

  const validPayload = {
    firstImageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROyNek3IO6dCApSTFql3M0rvBC39GIB_jByg&s",
    secondImageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-LtQGYxrZ1LLTrNbzW_w1xSUz-OnpVFo3yA&s"
  };

  it('should return document capture data for valid images', () => {
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

  it('should fail when firstImageUrl is missing', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { secondImageUrl: validPayload.secondImageUrl },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should fail when secondImageUrl is missing', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { firstImageUrl: validPayload.firstImageUrl },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should fail when firstImageUrl is empty', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { firstImageUrl: "", secondImageUrl: validPayload.secondImageUrl },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should fail when secondImageUrl is empty', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { firstImageUrl: validPayload.firstImageUrl, secondImageUrl: "" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should fail for invalid firstImageUrl format', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { firstImageUrl: "invalid-url", secondImageUrl: validPayload.secondImageUrl },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should fail for invalid secondImageUrl format', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { firstImageUrl: validPayload.firstImageUrl, secondImageUrl: "invalid-url" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });
});