// config
const config: any = {
  APIBaseUrl: "https://kyk1uo79o3.execute-api.eu-central-1.amazonaws.com/api",
  publicAuthToken: "aSi6C45UTU8d3aTbhGIxZPk321IQxeFXqmSV",
};

const apiEndpoint: any = {
  GET_PRODUCT: "/product/get",
  USER_REGISTER: "user/register",
  USER_LOGIN: "user/login",
  OFFER_UPDATE: "/offer/update",
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

export { config, apiEndpoint, LOCAL_STORAGE, NOTIFICATION_TYPE };
