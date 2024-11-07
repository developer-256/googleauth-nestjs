import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { GoogleAuthGuard } from './utils/Guards';
import { AzureAuthGuard } from './utils/AzureGuards';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Google Authentication' };
  }

  // api/auth/google/redirect
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleRedirect() {
    console.log('Google Auth Initialized');
    return { msg: 'OK' };
  }

  @Get('azure/login')
  @UseGuards(AzureAuthGuard)
  handleAzureLogin() {
    console.log('Azure Auth Initialized');
    return { msg: 'Azure Authentication' };
  }

  @Get('azure/redirect')
  @UseGuards(AzureAuthGuard)
  handleAzureRedirect() {
    return { msg: 'OK' };
  }

  @Get('status')
  user(@Req() request: Request) {
    console.log(request.user);
    if (request.user) {
      return { msg: 'Authenticated' };
    } else {
      return { msg: 'Not Authenticated' };
    }
  }
}
