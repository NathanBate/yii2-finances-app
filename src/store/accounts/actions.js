import HTTP from "../../http-common";

export function getAccounts({state, commit, rootState}) {
  return HTTP.get("accounts").then( response => {
      commit("setAccounts",response.data.accounts)
  })
}

export function addAccount({state, commit, rootState}, payload) {
  console.log("payload is")
  console.log(payload)
  return HTTP.post("account/add", payload)
}

export function updateAccount({state, commit, rootState}, payload) {
  return HTTP.post("account/update", payload)
}

