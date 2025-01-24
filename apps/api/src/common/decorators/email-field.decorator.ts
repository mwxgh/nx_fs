import { ApiPropertyCommonOptions } from '@nestjs/swagger/dist/decorators/api-property.decorator'
import { applyDecorators } from '@nestjs/common'
import { IsEmail } from 'class-validator'
import { StringField } from './string-field.decorator'
import { IsUndefinable } from './validator.decorator'

type IFieldOptions = {
  each?: boolean
  swagger?: boolean
  nullable?: boolean
  groups?: string[]
  message?: string | undefined
}

type IStringFieldOptions = {
  minLength?: number
  maxLength?: number
  toLowerCase?: boolean
  toUpperCase?: boolean
  messageIsNotEmpty?: string
} & IFieldOptions

export const EmailField = (
  options: ApiPropertyCommonOptions & IStringFieldOptions = {},
): PropertyDecorator => {
  return applyDecorators(
    StringField({ toLowerCase: true, ...options }),
    IsEmail({}, { message: 'Please enter a valid email address' }),
  )
}

export const EmailFieldOptional = (
  options: Omit<ApiPropertyCommonOptions, 'type' | 'required'> &
    IStringFieldOptions = {},
): PropertyDecorator => {
  return applyDecorators(
    IsUndefinable(),
    EmailField({ required: false, nullable: true, ...options }),
  )
}
