import { UserRole, UserStatus } from '@prisma/client'
import { IsEnum, IsString } from 'class-validator'

export class CreateUserDto {
  @IsString({ message: 'Must be string' })
  readonly lastName: string

  @IsString({ message: 'Must be string' })
  readonly firstName: string

  @IsString({ message: 'Must be string' })
  readonly username: string

  @IsString({ message: 'Must be string' })
  readonly email: string

  @IsEnum(UserRole)
  role: UserRole

  @IsEnum(UserStatus)
  status: UserStatus

  @IsString()
  password: string
}
