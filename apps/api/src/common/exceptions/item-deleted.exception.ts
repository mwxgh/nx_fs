import { BadRequestException } from '@nestjs/common'
import { ItemDeletedType } from '../interfaces'

export class ItemDeletedException extends BadRequestException {
  constructor(options: ItemDeletedType) {
    super(options)
  }
}
