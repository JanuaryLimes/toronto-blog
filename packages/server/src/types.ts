export interface IControllerBase {
  initRoutes(): any;
}

export type AuthPayload = {
  username: string;
  expires: number;
};
