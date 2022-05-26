<template>
  <q-page class="q-ma-md">

    <div class="row" v-if="accounts[$route.params.id] !== undefined">
      <div class="col-md-12">
        <q-breadcrumbs>
          <q-breadcrumbs-el icon="fas fa-home" to="/" />
          <q-breadcrumbs-el :label="accounts[$route.params.id].accountName" icon="account_balance" :to="'/account/' + $route.params.slug + '/'" />
        </q-breadcrumbs>
      </div>
    </div>

    <!--------------------------------- Desktop View -------------------------------------->
    <div class="xs-hide sm-hide col-12">
      <div class="row justify-center q-mt-lg">
        <div class="col-md-12 col-lg-9 col-xl-7">
          <DesktopView
            :statement="statement"
            :transactions="transactions"
            :prevMonthLink="prevMonthLink"
            :nextMonthLink="nextMonthLink"
            :monthName="monthName"
            :monthNumber="monthNumber"
            :yearNumber="yearNumber"
            :budgetAttached="budgetAttached"
            :budget="budget"
            :incomeTotal="incomeTotal"
            :expenseTotal="expenseTotal"
          />
        </div>
      </div>
    </div>

    <!--------------------------------- Mobile View -------------------------------------->
    <div class="col-12 md-hide lg-hide xl-hide">
      <MobileView
        :statement="statement"
        :transactions="transactions"
        :prevMonthLink="prevMonthLink"
        :nextMonthLink="nextMonthLink"
        :monthName="monthName"
        :month-number="monthNumber"
        :yearNumber="yearNumber"
        :budgetAttached="budgetAttached"
        :budget="budget"
        :incomeTotal="incomeTotal"
        :expenseTotal="expenseTotal"
      />
    </div>

  </q-page>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { date } from 'quasar'
  import HTTP from "../../../http-common";
  import ViewTransactionsDesktopView from "./ViewTransactionsDesktopView";
  import ViewTransactionsMobileView from "./ViewTransactionsMobileView";

  export default {
    name: 'ViewTransactions',

    components: {
      DesktopView : ViewTransactionsDesktopView,
      MobileView : ViewTransactionsMobileView,
    },

    data () {
      return {
        nextMonthLink : '',
        prevMonthLink : '',
        monthName : '',
        monthNumber : '',
        yearNumber : "",
        transactions : [],
        statement: {},
        budgetAttached : false,
        budget: [],
        incomeTotal : -1,
        expenseTotal : -1,
      }
    },

    computed: {
      ...mapGetters({
        "accounts" : "accounts/getAccounts",
      }),
    }, // computed

    methods: {

      loadPageData(accountId, slug, year, month) {

        let localDate = year + '/' + month + "/01"
        this.monthName = date.formatDate(localDate, "MMMM")
        this.monthNumber = month
        this.yearNumber = year

        let prevMonth = date.subtractFromDate(localDate, { month: 1 })
        let linkYear = date.formatDate(prevMonth, "YYYY")
        let linkMonth = date.formatDate(prevMonth, "M")
        this.prevMonthLink = "/account/" + accountId + "/" + slug + "/" + linkYear + "/" + linkMonth + "/"

        let nextMonth = date.addToDate(localDate, { month: 1 })
        linkYear = date.formatDate(nextMonth, "YYYY")
        linkMonth = date.formatDate(nextMonth, "M")
        this.nextMonthLink = "/account/" + accountId + "/" + slug + "/" + linkYear + "/" + linkMonth + "/"


        HTTP.get("transactions/" + year + "/" + month + "/" + accountId).then( response => {
          if (response.data.success === true) {
            this.transactions = response.data.transactions
            this.statement = response.data.statement
            this.budgetAttached = response.data.budgetAttached
            this.budget = response.data.budget
            this.incomeTotal = response.data.incomeTransactionsTotal
            this.expenseTotal = response.data.expenseTransactionsTotal
          }
        })
      }
    },

    created() {
      let accountId = this.$route.params.id
      let slug = this.$route.params.slug
      let year = this.$route.params.year
      let month = this.$route.params.month
      this.loadPageData(accountId,slug,year, month)
    },
    beforeRouteUpdate (to, from, next) {
      this.monthName = ' '
      this.loadPageData(to.params.id, to.params.slug, to.params.year, to.params.month)
      next()
    },

  }
</script>
