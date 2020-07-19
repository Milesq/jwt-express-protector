declare namespace Express {
  export interface Request {
    /**
     * Store user data returned from verifyUser
     */
    user?: object | string;
  }
}
