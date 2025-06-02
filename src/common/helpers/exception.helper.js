import { statusCodes } from "./status-code.helper";

export class BadrequestException extends Error {
   constructor() {
      super();
      this.code = statusCodes.BAD_REQUEST;
   }
}
