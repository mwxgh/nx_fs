import { ExtractJwt } from 'passport-jwt'
import config from './app.config'

const { secret, refreshSecret } = config().jwt

export const jwtStrategyConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false,
  secretOrKey: secret,
}

export const refreshJwtStrategyConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: refreshSecret,
  ignoreExpiration: false,
}
