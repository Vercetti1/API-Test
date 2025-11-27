describe('VNIN Verification API', () => {
  const url = 'https://dev-core-api-v2.blusalt.net/api/identities/ng/vnin';

  it('should verify VNIN successfully', () => {
    cy.request({
      method: 'POST',
      url,
      headers: {
        Authorization: `Bearer ${Cypress.env('TOKEN')}`
      },
      body: {
        idNumber: 'YV111111111111FY'
      }
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.success).to.be.true
    })
  })

  it('should fail when idNumber is missing', () => {
    cy.request({
      method: 'POST',
      url,
      failOnStatusCode: false,
      body: {}
    }).then((res) => {
      expect(res.status).to.be.oneOf([400, 422])
    })
  })

  it('should fail for invalid idNumber format', () => {
    cy.request({
      method: 'POST',
      url,
      failOnStatusCode: false,
      body: {
        idNumber: '12345'
      }
    }).then((res) => {
      expect(res.status).to.eq(400)
    })
  })
})