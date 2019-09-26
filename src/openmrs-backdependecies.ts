const semver = require("semver");
import { openmrsFetch } from "./openmrs-fetch";

function fetchBackendDependcies() {
  return openmrsFetch(`/ws/rest/v1/module?v=custom:(uuid,version)`, {
    method: "GET"
  });
}

export function checkBackendDeps(backendDependecy) {
  let dependecies: any = [];
  for (let [key, value] of Object.entries(backendDependecy)) {
    dependecies.push({ uuid: key, version: value });
  }

  fetchBackendDependcies().then(({ data }) => {
    data.results.filter(e => {
      for (let j = 0; j < dependecies.length; j++) {
        if (e.uuid === dependecies[j].uuid) {
          if (
            !semver.eq(
              semver.coerce(e.version),
              semver.coerce(dependecies[j].version)
            )
          ) {
            throw new console.error(
              `module version ${e.uuid} : ${e.version} doesnot  match with ${dependecies[j].uuid} : ${dependecies[j].version}`
            );
          }
        }
      }
    });
  });
}
