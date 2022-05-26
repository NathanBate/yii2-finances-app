export function setAccounts(state, accounts) {
 state.accounts = accounts
}

export function setUsersLoaded(state) {
  state.usersLoaded = true
}

export function clearUsers(state) {
  state.users = []
  state.usersLoaded = false
}
