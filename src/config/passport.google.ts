import { Request } from 'express'
import passport from 'passport'
import {
  Strategy as GoogleStrategy,
  StrategyOptionsWithRequest,
  Profile,
  GoogleCallbackParameters,
  VerifyCallback,
} from 'passport-google-oauth20'
import { env } from './env.config'

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID!,
      clientSecret: env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${env.SERVER_ORIGIN}/auth/google/callback`,
      passReqToCallback: true,
    } as StrategyOptionsWithRequest,
    (
      _req: Request,
      _accessToken: string,
      _refreshToken: string,
      _params: GoogleCallbackParameters, // <-- NEW param here
      profile: Profile, // <-- Profile moved after params
      done: VerifyCallback, // <-- use VerifyCallback type
    ) => {
      console.log('from: passport config access token:\n', _accessToken)
      console.log('refresh token:\n', _refreshToken)
      // console.log('Params:\n', _params)

      return done(null, profile)
    },
  ),
)
