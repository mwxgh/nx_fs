import { applyDecorators } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import { IsOptional } from 'class-validator'
import {
  IsDate,
  IsNotEmpty,
  IsNullable,
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

export const DateField = (
  options: ApiPropertyCommonOptions & IFieldOptions = {},
): PropertyDecorator => {
  const decorators: PropertyDecorator[] = [Type(() => Date)]

  if (options.nullable) {
    decorators.push(IsNullable(), IsOptional({ each: options.each }))
  } else {
    decorators.push(IsNotEmpty({ each: options.each }))
  }

  if (options.swagger !== false) {
    decorators.push(ApiProperty({ type: Date, ...options }))
  }

  decorators.push(
    IsDate(options),
    Transform(({ value }) => value && new Date(value)),
  )

  return applyDecorators(...decorators)
}

export const DateFieldOptional = (
  options: Omit<ApiPropertyCommonOptions, 'type' | 'required'> &
    IFieldOptions = {},
): PropertyDecorator => {
  return applyDecorators(
    IsUndefinable(),
    DateField({ ...options, required: false, nullable: true }),
  )
}
