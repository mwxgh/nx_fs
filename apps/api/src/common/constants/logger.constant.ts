export const LoggerConstant = {
  fileName: `${process.env.NODE_ENV}-%DATE%.log`,
  storageDirname: 'logs',
  maxFiles: 365,
  fatalLevel: 'fail',
  errorLevel: 'error',
  warnLevel: 'warn',
  infoLevel: 'info',
  debugLevel: 'debug',
  queryPrefix: 'Query: ',
  parameterPrefix: ' -- PARAMETERS: ',
  queryLogLevelsDev: ['log', 'warn', 'query', 'schema', 'migration'],
  queryLogLevels: ['error', 'migration'],
  queryLogLevelsTest: ['log', 'warn'],
  introspectionQuery: 'IntrospectionQuery',
  typeOrmFirstQuery: 'TypeOrmFirstQuery',
  backgroundJobContext: 'BackgroundJob',
  queryFailed: 'Query failed',
  notFoundErrorResponse: 'Not found ne`',
  uncaughtException: 'UncaughtException',
  unhandledRejection: 'UnhandledRejection',
}