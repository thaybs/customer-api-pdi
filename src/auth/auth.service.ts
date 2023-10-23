import { Injectable, ForbiddenException } from '@nestjs/common'
import { decode } from 'jsonwebtoken'

@Injectable()
export class AuthService {
  verifyToken(token: string): any {
    if (!token) {
      throw new ForbiddenException('Token not provided')
    }

    try {
      const decodedToken: any = decode(token.split(' ')[1])

      if (!decodedToken) {
        throw new ForbiddenException('Invalid token')
      }

      if (decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
        throw new ForbiddenException('Token has expired')
      }

      return decodedToken
    } catch (error) {
      throw new ForbiddenException('Invalid token')
    }
  }
}
