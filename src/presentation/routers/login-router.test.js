class LoginRouter {
  route (httpRequest) {
    const { email, password } = httpRequest.body
    if (!httpRequest || !httpRequest.body) {
      return HttpResponse.serverError()
    }
    if (!email) {
      return HttpResponse.badRequest('email')
    }
    if (!password) {
      return HttpResponse.badRequest('password')
    }
  }
}

class HttpResponse {
  static badRequest (paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName)
    }
  }

  static serverError () {
    return {
      statusCode: 500
    }
  }
}

class MissingParamError extends Error {
  constructor (paramName) {
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamError'
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
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
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
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
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
