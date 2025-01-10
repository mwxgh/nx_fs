import { SetMetadata } from '@nestjs/common'
import { ROLES } from '../constants'

export const Roles = (...roles: number[]) => SetMetadata(ROLES, roles)
