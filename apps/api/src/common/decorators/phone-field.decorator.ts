import { applyDecorators } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { PhoneNumberSerializer } from './transform.decorator'
import {
  IsNotEmpty,
  IsNullable,
  IsPhoneNumber,
  IsUndefinable,
} from './validator.decorator'
import { ApiPropertyCommonOptions } from '@nestjs/swagger/dist/decorators/api-property.decorator'

type IFieldOptions = {
  each?: boolean
  swagger?: boolean
  nullable?: boolean
  groups?: string[]
  message?: string | undefined
}

export const PhoneField = (
  options: ApiPropertyCommonOptions & IFieldOptions = {},
): PropertyDecorator => {
  const decorators: PropertyDecorator[] = [
    IsNotEmpty(),
    IsPhoneNumber({ region: 'JP' }),
    PhoneNumberSerializer(),
  ]

  if (options.nullable) {
    decorators.push(IsNullable())
  } else {
    decorators.push(IsNotEmpty({ each: options.each }))
  }

  if (options.swagger !== false) {
    decorators.push(ApiProperty({ type: String, ...options }))
  }

  return applyDecorators(...decorators)
}

export const PhoneFieldOptional = (
  options: Omit<ApiPropertyCommonOptions, 'type' | 'required'> &
    IFieldOptions = {},
): PropertyDecorator => {
  return applyDecorators(
    IsUndefinable(),
    PhoneField({ required: false, ...options }),
  )
}
