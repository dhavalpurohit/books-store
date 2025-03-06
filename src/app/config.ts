// config
const config: any = {
  APIBaseUrl: "https://kyk1uo79o3.execute-api.eu-central-1.amazonaws.com/api/",
  // APIBaseUrl: "http://localhost:3000/api/",
  publicAuthToken: "aSi6C45UTU8d3aTbhGIxZPk321IQxeFXqmSV",
};

const apiEndpoint: any = {
  PRODUCT_GET: "product/get",
  USER_REGISTER: "user/register",
  USER_LOGIN: "user/login",
  OFFER_UPDATE: "offer/update",
  OFFER_GET_ALL: "offer/getAll",
};

const LOCAL_STORAGE: any = {
  userToken: "userToken",
};

const NOTIFICATION_TYPE: any = {
  WARNING: "warning",
  ERROR: "error",
  SUCCESS: "success",
};

const defaultLang = "en";
const languages = [
  { "name": "English", "code": "en" },
  { "name": "Deutsch", "code": "de" },
]

export {
  config, apiEndpoint,
  defaultLang, languages,
  LOCAL_STORAGE, NOTIFICATION_TYPE,
};