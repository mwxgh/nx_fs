import { ApiProperty } from '@nestjs/swagger'
import { UserRole, UserStatus } from '@prisma/client'
import { IsEnum, IsString } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({ description: 'The firstName of the user' })
  @IsString({ message: 'Must be string' })
  readonly firstName: string

  @ApiProperty({ description: 'The lastName of the user' })
  @IsString({ message: 'Must be string' })
  readonly lastName: string

  @ApiProperty({ description: 'The username of the user' })
  @IsString({ message: 'Must be string' })
  readonly username: string

  @ApiProperty({ description: 'The email of the user' })
  @IsString({ message: 'Must be string' })
  readonly email: string

  @ApiProperty({ description: 'The role of the user' })
  @IsEnum(UserRole)
  role: UserRole

  @ApiProperty({ description: 'The status of the user' })
  @IsEnum(UserStatus)
  status: UserStatus

  @ApiProperty({ description: 'The password of the user' })
  @IsString()
  password: string
}
