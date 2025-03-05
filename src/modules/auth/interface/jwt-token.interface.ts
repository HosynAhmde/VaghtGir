import { Roles } from "@Common/constants";


/**
 * Methods to obtain token objects.
 */
export interface JwtToken {
  /**
    session _id
   */
  session: string;

  /**
    user _id
   */
  sub: string;
  roles: Roles[];


  

  iat?: number;
  exp?: number;
}
