// config
const config: any = {
  APIBaseUrl: "https://kyk1uo79o3.execute-api.eu-central-1.amazonaws.com/api/",
  // APIBaseUrl: "http://localhost:3000/api/",
  publicAuthToken: "aSi6C45UTU8d3aTbhGIxZPk321IQxeFXqmSV",
};

const apiEndpoint: any = {
  OFFER_UPDATE: "offer/update",
  OFFER_GET_ALL: "offer/getAll",
  PRODUCT_GET: "product/get",
  PROFILE_GET: "profile/get",
  PROFILE_UPDATE: "profile/update",
  USER_REGISTER: "user/register",
  USER_LOGIN: "user/login",
};

const LOCAL_STORAGE: any = {
  userToken: "userToken",
};

const defaultLang = "en";
const languages = [
  { "name": "English", "code": "en" },
  { "name": "Deutsch", "code": "de" },
]

export {
  config, apiEndpoint,
  defaultLang, languages,
  LOCAL_STORAGE
};