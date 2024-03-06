export interface DecodedToken {
  sid: string;
  sub: string;
  exp: number;
  code: string;
  name: string;
  email: string;
  appid: number;
  appname: string;
  "https://hasura.io/jwt/claims": {
    "x-hasura-allowed-roles": string[];
    "x-hasura-default-role": string;
  };
  flag: number;
  url: string;
  config: string;
  salt: string;
}
