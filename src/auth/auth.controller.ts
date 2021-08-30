import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  /*
  JWT Tokens

  1. open source industry standard
  2. secure auth exchange between parties
  3. verifies if a sender is who it claims to be
  4. signed by the issuer using a secret or keypair

  Structure:
  - Header: metadata (type, hashing algorithm)
  - Payload: claims (statements about an entity eg. a user)
  - Signature: result of the encoded header, encoded payload, against a secret

  Example:
  {
    "username": "szamoca",
    "role": "admin",
    "iat": issued at,
    "exp": expiration date
  } + secret = token

  Method:
  1. szamoca sends a request to the API to delete a task
  2. in the req headers there is a JWT token
  3. to validate the token, we take the req JWT's header and payload and regenerate the signature using our secret
  4. we can then compare the two signatures
  */
}
