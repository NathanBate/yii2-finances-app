<template>
  <div>

    <div class="row">
      <div class="col">
        <q-btn tag="a" class="q-mt-lg" icon="fas fa-arrow-left" round color="primary" :to="prevMonthLink" />
      </div>
      <div class="col-6 text-center">
        <h4 class="q-mt-md q-mb-none">{{ monthName }}</h4>
        <q-badge align="top" v-if="statement['reconciled'] == 'Y'">Statement Reconciled</q-badge>
      </div>
      <div class="col">
        <q-btn class="q-mt-lg float-right" icon="fas fa-arrow-right" round color="primary" :to="nextMonthLink"  />
      </div>
    </div>

    <div class="row q-mt-md">
      <div class="col">
        <b>Beginning Balance:</b> ${{ statement['beginningBalance'] }}
      </div>
      <div class="col-12-md-auto">
        <q-btn :to="'/' + $route.params.slug + '/statement/update/' + statement['id']" color="primary" label="Edit Statement"/>
      </div>
      <div class="col text-right">
        <b>Ending Balance:</b> ${{ statement['endingBalance'] }}
      </div>
    </div>

    <div class="row q-mt-xl" v-if="budgetAttached">
      <div class="col-12 text-h5">
        Budget Info
      </div>
    </div>

    <div class="row" v-if="budgetAttached">
      <div class="col-shrink text-bold q-pr-xs">
        Income:
      </div>
      <div class="col-shrink">
        <router-link style="color:black; text-decoration: none;" :to="'/budgets/status/' + statement['id'] + '/' + monthName + '/' + monthNumber + '/' + yearNumber + '/' + $route.params.id + '/'">
          ${{ incomeTotal }} of ${{ budget.budget.incomeTotal }}
        </router-link>
      </div>
    </div>

    <div class="row q-mb-xl" v-if="budgetAttached">
      <div class="col-shrink text-bold q-pr-xs">
        Expenses:
      </div>
      <div class="col-shrink" :class="(expenseTotal > budget.budget.expenseTotal) ? 'text-red' : 'text-black'">
        <router-link style="color:black; text-decoration: none;" :class="(expenseTotal > budget.budget.expenseTotal) ? 'text-red' : 'text-black'" :to="'/budgets/status/' + statement['id'] + '/' + monthName + '/' + monthNumber + '/' + yearNumber + '/' + $route.params.id + '/'">
          ${{ expenseTotal }} of ${{ budget.budget.expenseTotal }}
        </router-link>
      </div>
    </div>



    <q-input
      class="q-mb-lg q-mt-lg"
      standout="bg-primary text-white"
      label="Type in the site you want to go to"
      v-model="search"
      clearable
      square
      clear-icon="fas fa-times"
      @clear="search =''"
    >
      <template v-slot:prepend>
        <q-icon name="fas fa-search" />
      </template>

    </q-input>

    <q-markup-table class="q-mt-lg">
      <thead>
      <tr>
        <th class="text-left">Date</th>
        <th class="text-left">To / From</th>
        <th class="text-right">Amount</th>
        <th class="text-center">R</th>
        <th class="text-right">Balance</th>
        <th class="text-left">Note</th>
        <th class="text-center">
          <q-btn
            v-if="statement['reconciled'] == 'N'"
            round
            color="deep-orange"
            icon="fas fa-plus"
            type="a" :to="'/account/' + $route.params.id + '/' + $route.params.slug + '/transaction/add/' + $route.params.year + '/' + $route.params.month + '/statement/' + statement['id'] + '/'"
          />
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="transaction in filteredList" :key="transaction['transactionId']">
        <td>{{transaction['transactionDateFormatted']}}</td>
        <td>{{transaction['recipientName']}}{{transaction['payerName']}}</td>
        <td :class="transaction['amount'] > 0 ? 'text-green text-right' : 'text-red text-right' ">{{transaction['amount']}}</td>
        <td class="text-center"><q-icon v-if="transaction['reconciled'] == 'Y'" name="fas fa-check" /></td>
        <td class="text-right">{{transaction['total']}}</td>
        <td class="text-left">
          <q-btn icon="fas fa-info" size="xs" round color="primary" v-if="transaction['note'].length > 0">
            <q-tooltip>
              {{transaction['note']}}
            </q-tooltip>
          </q-btn>
        </td>
        <td class="text-center">
          <q-btn
            v-if="statement['reconciled'] == 'N'"
            color="primary"
            label="Edit"
            type="a" :to="'/account/' + $route.params.id + '/' + $route.params.slug + '/transaction/update/' + transaction['transactionId'] + '/' + $route.params.year + '/' + $route.params.month + '/statement/' + statement['id'] + '/'"
          />
        </td>
      </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>
<script>

export default {
  name: 'TransactionsListDesktop',

  props: {
    statement: {
      type: [Object],
      required: true,
    },
    transactions: {
      type: [Array],
      required: true,
    },
    prevMonthLink: {
      type: [String],
      required: true
    },
    nextMonthLink: {
      type: [String],
      required: true,
    },
    monthName: {
      type: [String],
      required: true,
    },
    monthNumber: {
      type: [Number, String],
      required: true,
    },
    yearNumber: {
      type: [Number, String],
      required: true,
    },
    budgetAttached: {
      type: [Boolean],
      default: false,
    },
    budget: {
      type: [Array, Object],
      default: [],
    },
    incomeTotal: {
      type: [Number],
      default: -1,
    },
    expenseTotal : {
      type: [Number],
      default: -1,
    },
  },

  data () {
    return {
      search: "",
    }
  },

  computed: {
    filteredList() {
      return this.transactions.filter(Transaction => {
        let title = Transaction.recipientName + " " + Transaction.payerName
        Transaction.title = title
        return Transaction.title.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  }, // computed

}
</script>
