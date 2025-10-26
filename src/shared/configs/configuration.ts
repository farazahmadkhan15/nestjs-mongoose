import process from 'node:process'

interface IJwtConfig {
  accessTokenExpiresInSec: number
  privateKey: string
  publicKey: string
  refreshTokenExpiresInSec: number
}

interface IDatabaseConfig {
  name: string
  uri: string
}

interface IAppConfig {
  database: IDatabaseConfig
  defaultAdminUserPassword: string
  env?: string
  jwt: IJwtConfig
  port: string | undefined
}

export default (): IAppConfig => ({
  database: {
    name: process.env.DB_NAME || '',
    uri: process.env.DB_URI || 'mongodb://localhost:27017',
  },
  defaultAdminUserPassword: process.env.DEFAULT_ADMIN_USER_PASSWORD || '',
  env: process.env.APP_ENV,
  jwt: {
    accessTokenExpiresInSec: Number.parseInt(
      process.env.JWT_ACCESS_TOKEN_EXP_IN_SEC || '3600',
      10,
    ),
    privateKey: Buffer.from(
      process.env.JWT_PRIVATE_KEY_BASE64 || '',
      'base64',
    ).toString('utf8'),
    publicKey: Buffer.from(
      process.env.JWT_PUBLIC_KEY_BASE64 || '',
      'base64',
    ).toString('utf8'),
    refreshTokenExpiresInSec: Number.parseInt(
      process.env.JWT_REFRESH_TOKEN_EXP_IN_SEC || '86400',
      10,
    ),
  },
  port: process.env.PORT,
})
