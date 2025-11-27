import Headers from '../../headers';

describe('Smart KYC - Advanced Liveness Check API', () => {
  const url = 'https://dev-core-api-v2.blusalt.net/api/smart-kyc/liveness-check-advanced';

  const validPayload = {
    videoUrl: "https://blusalt-identity-verification.s3.eu-west-1.amazonaws.com/uploads/1759240487958-video.mov",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScBc2rXEtT3fyPyLR2MgjAoZDjzgjIUv-_yQ&s"
  };

  it('should return advanced liveness check data for valid video and image', () => {
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

  it('should fail when videoUrl is missing', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { imageUrl: validPayload.imageUrl },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should fail when imageUrl is missing', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { videoUrl: validPayload.videoUrl },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should fail when videoUrl is empty', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { videoUrl: "", imageUrl: validPayload.imageUrl },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should fail when imageUrl is empty', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { videoUrl: validPayload.videoUrl, imageUrl: "" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should fail for invalid videoUrl format', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { videoUrl: "invalid-url", imageUrl: validPayload.imageUrl },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('should fail for invalid imageUrl format', () => {
    cy.request({
      method: 'POST',
      url,
      headers: Headers,
      body: { videoUrl: validPayload.videoUrl, imageUrl: "invalid-url" },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });
});