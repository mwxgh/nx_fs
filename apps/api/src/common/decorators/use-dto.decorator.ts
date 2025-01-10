import { AbstractDto } from '../dtos'
import { AbstractEntity } from '../entities'
import { Constructor } from '../types'

export const UseDto = (
  dtoClass: Constructor<AbstractDto, [AbstractEntity, unknown]>,
): ClassDecorator => {
  return (ctor) => {
    ctor.prototype.dtoClass = dtoClass
  }
}
