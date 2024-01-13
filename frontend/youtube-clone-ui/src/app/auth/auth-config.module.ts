import {LogLevel, PassedInitialConfig} from 'angular-auth-oidc-client';


export const authConfigs = {
  config: {
    authority: 'https://dev-4sjp4axeb8ve3ic4.us.auth0.com',
    redirectUrl: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
    clientId: 'SdVGqed8qRuExU1UwFm5PJEttUW67PPZ',
    scope: 'openid profile email offline_access',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
    logLevel: LogLevel.Debug
  }
} as PassedInitialConfig
