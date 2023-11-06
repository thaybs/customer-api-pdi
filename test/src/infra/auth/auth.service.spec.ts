import { ForbiddenException } from '@nestjs/common'
import { AuthService } from 'src/infra/auth/auth.service'

describe('AuthService', () => {
  let authService: AuthService

  beforeEach(() => {
    authService = new AuthService()
  })

  describe('verifyToken', () => {
    it('should throw ForbiddenException if token is not provided', () => {
      expect(() => authService.verifyToken(undefined)).toThrowError(ForbiddenException)
    })

    it('should throw ForbiddenException if token is invalid', () => {
      const invalidToken = 'invalid.token'

      expect(() => authService.verifyToken(invalidToken)).toThrowError(ForbiddenException)
    })

    it('should throw ForbiddenException if token has expired', () => {
      const expiredToken = 'your_expired_token_here' // Replace with an expired token

      expect(() => authService.verifyToken(expiredToken)).toThrowError(ForbiddenException)
    })
  })
})
