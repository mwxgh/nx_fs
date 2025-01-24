import { applyDecorators } from '@nestjs/common'
import { Transform, Type } from 'class-transformer'
import moment from 'moment'
import { RegexConstant } from '../constants'
import {
  IsNotEmpty,
  IsNullable,
  IsTimeString,
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

export type Time = `${number}:${number}`

export const TimeField = (
  options: ApiPropertyCommonOptions & IFieldOptions = {},
): PropertyDecorator => {
  const decorators: PropertyDecorator[] = [
    Type(() => String),
    IsNotEmpty(),
    IsTimeString('HH:mm', RegexConstant.timeFormatHHmm),
  ]

  if (options.nullable) {
    decorators.push(IsNullable())
  } else {
    decorators.push(IsNotEmpty({ each: options.each }))
  }

  // if (options.swagger !== false) {
  //   decorators.push(ApiProperty({ type: 'hh:mm', ...options }))
  // }

  decorators.push(
    Transform(
      (value) => value && moment(`2000-01-01 ${value}`).format('HH:mm:ss'),
    ),
  )

  return applyDecorators(...decorators)
}

export const TimeFieldOptional = (
  options: Omit<ApiPropertyCommonOptions, 'type' | 'required'> &
    IFieldOptions = {},
): PropertyDecorator => {
  return applyDecorators(
    IsUndefinable(),
    TimeField({ ...options, required: false }),
  )
}
