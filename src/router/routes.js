
const routes = [
  {
    path: '/home/',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },

  // Budgets ***********************************************************************************************************
  {
    path: '/budgets/',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/budgets/budgetList.vue') }
    ]
  },

  {
    path: '/budgets/add/',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/budgets/addBudget.vue') }
    ]
  },

  {
    path: '/budgets/update/:id/',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/budgets/updateBudget.vue') }
    ]
  },

  {
    path: '/budgets/updatetitle/:id/',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/budgets/updateBudgetTitle.vue') }
    ]
  },

  {
    path: '/budgets/status/:id/:monthname/:monthnumber/:yearnumber/:accountid/',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/budgets/budgetStatus.vue') }
    ]
  },

  {
    path: '/budgets/:budgetid/update-budget-item/:budgetitemid/',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/budgets/updateBudgetItem.vue') }
    ]
  },

  // Users *************************************************************************************************************
  {
    path: '/users/adduser/',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/AddUser.vue') }
    ]
  },
  {
    path: '/settings/',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/settings/SettingsPage.vue') }
    ]
  },
  {
    path: '/settings/dashboard/',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/settings/dashboard/DashboardSettings.vue') }
    ]
  },
  {
    path: '/viewprofile/',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ViewProfile.vue') }
    ]
  },
  {
    path: '/editprofile/',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/EditProfile.vue') }
    ]
  },

  {
    path: '/users/',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Users.vue') }
    ]
  },

  {
    path: '/edituser/:id/',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/EditUser.vue') }
    ]
  },

  {
    path: '/accounts/',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/settings/accounts/accountsList.vue') }
    ]
  },

  {
    path: '/accounts/add/',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/settings/accounts/addAccount.vue') }
    ]
  },

  {
    path: '/settings/accounts/updateaccount/:accountId/',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/settings/accounts/updateAccount/updateAccount.vue') }
    ]
  },
  {
    path: '/account/:id/:slug/:year/:month/',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/transactions/ViewTransactions/ViewTransactions.vue') }
    ]
  },
  {
    path: '/:slug/statement/update/:id/',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/statements/UpdateStatement.vue') }
    ]
  },
  {
    path: '/account/:id/:slug/transaction/update/:transactionid/:year/:month/statement/:statementid/',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/transactions/UpdateTransaction/UpdateTransaction.vue') }
    ]
  },
  {
    path: '/account/:id/:slug/transaction/add/:year/:month/statement/:statementid/',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/transactions/AddTransaction/AddTransaction.vue') }
    ]
  },

  {
    path: '/account/:id/:slug/add_scheduled_transaction/:year/:month/',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/transactions/AddToScheduledTransactionList.vue') }
    ]
  },

  {
    path: '/account/:id/:slug/update_scheduled_transaction/:stid/:year/:month/',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/transactions/UpdateToScheduledTransactionList.vue') }
    ]
  },


]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*', redirect: '/home/'
  })
}

export default routes
