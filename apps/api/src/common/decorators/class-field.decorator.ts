/* eslint-disable @typescript-eslint/no-explicit-any */
import { applyDecorators } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDefined, IsOptional, ValidateNested } from 'class-validator'
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsNotEmpty,
  IsNullable,
  IsUndefinable,
} from './validator.decorator'
import { ApiPropertyCommonOptions } from '@nestjs/swagger/dist/decorators/api-property.decorator'

type RequireField<T, K extends keyof T> = T & Required<Pick<T, K>>

type IFieldOptions = {
  each?: boolean
  swagger?: boolean
  nullable?: boolean
  groups?: string[]
  message?: string | undefined
}

type IArrayFieldOptions = {
  minSize?: number
  maxSize?: number
  arrayUnique?: string
} & IFieldOptions

export const ClassField = (
  options: RequireField<ApiPropertyCommonOptions, 'type'> & IArrayFieldOptions,
): PropertyDecorator => {
  const decorators: Array<PropertyDecorator> = [
    ValidateNested({ each: options.each }),
    Type(options.type as any),
    options.arrayUnique ? ArrayUnique(options.arrayUnique) : undefined,
    options.isArray ? IsArray() : undefined,
    options.minSize ? ArrayMinSize(options.minSize) : undefined,
    options.maxSize ? ArrayMaxSize(options.maxSize) : undefined,
    ...(options.nullable
      ? [IsNullable(), IsOptional()]
      : [IsNotEmpty({ each: options.each })]),
    options.required ? IsDefined() : undefined,
    options.swagger !== false
      ? ApiProperty({ isArray: true, ...options })
      : undefined,
  ].filter(Boolean) as Array<PropertyDecorator>

  return applyDecorators(...decorators)
}

export const ClassFieldOptional = (
  options: RequireField<ApiPropertyCommonOptions, 'type' | 'required'> &
    IArrayFieldOptions,
): PropertyDecorator => {
  return applyDecorators(
    IsUndefinable(),
    ClassField({ required: false, ...options }),
  )
}
