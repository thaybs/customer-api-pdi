import { Injectable, ExecutionContext, CanActivate, Logger } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import axios from 'axios'
import { decode } from 'jsonwebtoken'
import { AuthService } from './auth.service'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly authService: AuthService) {}
  private readonly logger = new Logger()

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    const token = request.headers.authorization
    const baseURL = process.env.KEYCLOAK_SERVER_URL

    return axios
      .get(`${baseURL}/auth/realms/careers/protocol/openid-connect/userinfo`, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        const decodedToken = this.authService.verifyToken(token)
        const validateRole = roles.some((role) =>
          decodedToken.resource_access.customers.roles.some((tokenRole) => tokenRole === role),
        )

        return validateRole ? true : false
      })
      .catch((error) => {
        this.logger.error(error.message, error.stack)
        return false
      })
  }
}
