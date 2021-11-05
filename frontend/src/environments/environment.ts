// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: "http://129.213.136.213:8004/api/",
  // firebase: {
  //   apiKey: "AIzaSyCPEbdeG5ctrWxFbizLaEWpzuptKRlqFF4",
  //   authDomain: "studentapp-64156.firebaseapp.com",
  //   databaseURL: "https://studentapp-64156.firebaseio.com",
  //   projectId: "studentapp-64156",
  //   storageBucket: "studentapp-64156.appspot.com",
  //   messagingSenderId: "274424681170",
  //   appId: "1:274424681170:web:c62ccf89b5fa5e38"
  // },
  firebase: {
    apiKey: "AIzaSyDQEzZNqNnXYkSrRRcThe0fJ-jvgiCHutM",
    authDomain: "fit3170-intership.firebaseapp.com",
    databaseURL: "https://fit3170-intership.firebaseio.com",
    projectId: "fit3170-intership",
    storageBucket: "gs://fit3170-intership.appspot.com",
    messagingSenderId: "5106623955",
    appId: "1:5106623955:web:637084d7564bf00b"
  }
};
