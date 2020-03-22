// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAvxNt-B1k_qU8CxgkjmnevzFWrR8ZF0zI",
    authDomain: "epd-storage.firebaseapp.com",
    databaseURL: "https://epd-storage.firebaseio.com",
    projectId: "epd-storage",
    storageBucket: "epd-storage.appspot.com",
    messagingSenderId: "560125380989",
    appId: "1:560125380989:web:2616cfc950d730ebc1e414"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
