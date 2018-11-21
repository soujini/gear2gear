import { Injectable } from '@angular/core';
import { AUTH_CONFIG } from './auth0-variables';
import { Router } from '@angular/router';
import Auth0Lock from 'auth0-lock';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  options = {
    'allowSignUp':false,
    'redirect':false,
    theme: {
      logo: './assets/images/g2g-favicon-auth0.png',
      primaryColor: '#31324F'
    },
    allowedConnections: ['Username-Password-Authentication'],
    languageDictionary: {
      emailInputPlaceholder: "something@youremail.com",
      title: "GEAR 2 GEAR"
    },
    scope:'openid',
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    redirectUri: AUTH_CONFIG.callbackURL,
  }

  lock = new Auth0Lock(AUTH_CONFIG.clientID, AUTH_CONFIG.domain, this.options);

  constructor(public router: Router) {

    this.lock.on('authenticated', (authResult:any) => {
      this.lock.hide(); //Added this manually since lock popup wont close

      //console.log("souj ",authResult);
      //this.isAuthenticated=true;
      this.lock.getUserInfo(authResult.accessToken, (error:any, profile:any) => {
        if (error) {
          // Handle error
          return;
        }
        //Save token and profile locally
        this.setSession(authResult, profile);
      });
    });
  }

  public login(): void {
    this.lock.show();
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('profile');
    localStorage.removeItem('expiresAt');
    //  this.isAuthenticated=false;
    // Go back to the home route
    this.router.navigate(['/']);
  }
  private setSession(authResult, profile): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem("accessToken", authResult.accessToken);
    localStorage.setItem("profile", JSON.stringify(profile));
    localStorage.setItem('expiresAt', expiresAt);

    // Update DOM
    //alert("hello " + profile.name);
  }

  public isAuthenticated():boolean{
    // //Check if there's an unexpired JWT
    // //This searches for an item in localStorage with key == 'id_token'
    const accessToken = localStorage.getItem("accessToken");
    //console.log("access ",accessToken);
    if(accessToken){
      // Check whether the current time is past the
      // access token's expiry time
      const expiresAt = JSON.parse(localStorage.getItem('expiresAt'));
      //console.log("time ", new Date().getTime() + '   expires  '+expiresAt);
      return new Date().getTime() < expiresAt;

    }
    else{
      return false;
    }
  }
}
