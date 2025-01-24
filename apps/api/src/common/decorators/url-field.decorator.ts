import { applyDecorators } from '@nestjs/common'
import { IsUrl } from 'class-validator'
import { IsNotEmpty, IsNullable, IsUndefinable } from './validator.decorator'
import { ApiPropertyCommonOptions } from '@nestjs/swagger/dist/decorators/api-property.decorator'
import { StringField } from './string-field.decorator'

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

export const URLField = (
  options: ApiPropertyCommonOptions & IStringFieldOptions = {},
): PropertyDecorator => {
  const decorators: PropertyDecorator[] = [
    IsNotEmpty(),
    StringField(options),
    IsUrl({}, { each: true }),
  ]

  if (options.nullable) {
    decorators.push(IsNullable({ each: options.each }))
  } else {
    decorators.push(IsNotEmpty({ each: options.each }))
  }

  return applyDecorators(...decorators)
}

export const URLFieldOptional = (
  options: Omit<ApiPropertyCommonOptions, 'type' | 'required'> &
    IStringFieldOptions = {},
): PropertyDecorator => {
  return applyDecorators(
    IsUndefinable(),
    URLField({ required: false, ...options }),
  )
}
