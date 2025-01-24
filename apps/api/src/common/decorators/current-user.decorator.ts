import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { AuthData } from '../interfaces'

export const CurrentUser = createParamDecorator(
  (_, ctx: ExecutionContext): AuthData | null => {
    const req = ctx.switchToHttp().getRequest()

    return req.user ? { id: req.user.id, role: req.user.role } : null
  },
)
