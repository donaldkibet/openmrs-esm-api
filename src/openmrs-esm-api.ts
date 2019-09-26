import "./set-public-path";
import { openmrsFetch, openmrsObservableFetch } from "./openmrs-fetch";
import { checkBackendDeps } from "./openmrs-backdependecies";
export { fhir } from "./fhir";
export {
  getCurrentUser,
  refetchCurrentUser,
  userHasAccess
} from "./shared-api-objects/current-user";

export {
  default as UserHasAccessReact
} from "./shared-api-objects/user-has-access-react.component";

export const omodDeps = { formentryapp: "^1.4.2", reporting: "1.17.0" };

const originalOnload = System.constructor.prototype.onload;
System.constructor.prototype.onload = function(err, id, deps) {
  if (!err) {
    checkBackendDeps(id);
  }
  return originalOnload(this, arguments);
};
