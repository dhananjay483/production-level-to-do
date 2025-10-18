// Here we generate our accesstoken and refreshToken token generate based on the user login id

// login successful even after that user will have token
// steps how generate token
/* 1. user enter the details(email+password)
2. then verify the credentials with db
3. then generate token*/

import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { ref } from 'yup';

dotenv.config()

export default class TokenGenerator {
  // generate access token
  accessTokenGenerator(userId) {
    try {
      const secretKey = process.env.ACCESS_TOKEN_SECRET;
      const expiry = process.env.ACCESS_TOKEN_EXPIRY;
      // generate access token
      const accessToken = jwt.sign({ userId }, secretKey, {
        expiresIn: expiry,
      });
      console.log(accessToken);
      return accessToken;
    } catch (error) {
      console.log(`Failed to generate token:${error.message}`);
    }
  }
  // generate refresh token
  refreshTokenGenerator(userId) {
    try {
      const secretKey = process.env.REFRESH_TOKEN_SECRET;
      const expiry = process.env.REFRESH_TOKEN_EXPIRY;
      // generate refresh token
      const refreshToken = jwt.sign({ userId }, secretKey, {
        expiresIn: expiry,
      });
        console.log(refreshToken);
        return refreshToken;
    } catch (error) {
      console.log(`Failed to generate refresh token:${error.message}`);
    }
  }
}
