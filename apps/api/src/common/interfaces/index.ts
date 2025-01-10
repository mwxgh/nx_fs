export type UserProp = {
  id: number
  role: number
}

export type IAttachment = {
  filename: string
  content?: unknown
  path?: string
  contentType?: string
  cid?: string
  encoding?: string
  contentDisposition?: 'attachment' | 'inline' | undefined
  href?: string
}

export type ObjectType = { [key: string]: unknown }

export type ExportHeaderType<T> = Partial<{ [K in keyof T]: string }>

export type StoreContextType = {
  contextId: string | undefined
  ip: string | undefined
  endpoint: string | undefined
  device: string | undefined
  domain: string | undefined
  userId?: number | undefined
  method?: string | undefined
}

export type ItemDeletedType = {
  message: string
  customCode?: number
}

export type SendMailType = {
  email: string
  data: object
  attachments?: IAttachment[]
}
