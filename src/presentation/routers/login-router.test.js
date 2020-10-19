class LoginRouter {
  route (httpRequest) {
    const { email, password } = httpRequest.body
    if (!httpRequest || !httpRequest.body) {
      return {
        statusCode: 500
      }
    }
    if (!email || !password) {
      return {
        statusCode: 400
      }
    }
  }
}

describe('login router', () => {
  test('Should return 400 if no email provided', () => {
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        password: '123456'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return 400 if no password is provided', () => {
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        email: 'any@gmail.com'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })

  // test('Should return 500 if no httpRequest is provided', () => {
  //   const sut = new LoginRouter()
  //   const httpResponse = sut.route()
  //   expect(httpResponse.statusCode).toBe(500)
  // })

  // test('Should return 500 if no httpRequest has no body', () => {
  //   const sut = new LoginRouter()
  //   const httpResponse = sut.route({})
  //   expect(httpResponse.statusCode).toBe(500)
  // })
})
