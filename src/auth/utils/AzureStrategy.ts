import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BearerStrategy } from 'passport-azure-ad';
import { AuthService } from '../auth.service';

@Injectable()
export class AzureStrategy extends PassportStrategy(BearerStrategy, 'azure') {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super({
      identityMetadata: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/v2.0/.well-known/openid-configuration`,
      clientID: process.env.AZURE_CLIENT_ID,
      clientSecret: process.env.AZURE_CLIENT_SECRET,
      callbackURL: process.env.AZURE_CALLBACK_URL,
      scope: ['openid', 'profile', 'email'],
    });
  }

  // type: ITokenPayload
  async validate(payload: any) {
    console.log('Azure AD Payload:', payload);
    const user = await this.authService.validateUser({
      email: payload.preferred_username, // 'preferred_username' contains the email in Azure AD
      displayName: payload.name,
    });
    return user || null;
  }
}
