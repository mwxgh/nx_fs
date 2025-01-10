export type IAbstractEntity<DTO, O = never> = {
  id: number
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
  toDto(options?: O): DTO
}

export abstract class AbstractEntity<DTO = unknown, O = never>
  implements IAbstractEntity<DTO, O>
{
  id: number
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date

  private dtoClass?: { new (entity: AbstractEntity, options?: O): DTO }

  toDto(options?: O): DTO {
    if (!this.dtoClass) {
      throw new Error(
        `You need to use @UseDto on class (${this.constructor.name}) to call the toDto function`,
      )
    }

    return new this.dtoClass(this, options)
  }
}

export abstract class AbstractEntityWithCU<
  DTO = unknown,
  O = never,
> extends AbstractEntity<DTO, O> {
  createdBy?: number
  updatedBy?: number
}
