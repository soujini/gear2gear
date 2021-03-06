// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
 // export {};
  var environment =  {
  production: false,
  DATABASE_URL: 'postgres://localhost:5432/postgres',
  API_URL: 'http://localhost:3000',
  SSL:false,
  ORIGIN: 'http://localhost:4200',
  CONNECTION_STRING:'postgres://localhost:5432/postgres',
};

 module.exports =  environment;
