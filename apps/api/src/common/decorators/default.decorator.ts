import { Transform } from 'class-transformer'

export const Default = (defaultValue: unknown) =>
  Transform(
    ({ value }) =>
      value === null || value === undefined ? defaultValue : value,
    {
      toClassOnly: true,
    },
  )
