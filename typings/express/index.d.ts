/* eslint-disable */
declare namespace Express {
  export interface Request {
    /**
     * Store user data returned from verifyToken
     */
    user?: string;
  }
}
