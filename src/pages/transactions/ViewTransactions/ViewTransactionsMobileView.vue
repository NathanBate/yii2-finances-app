<template>
  <div>

    <div class="row">
      <div class="col">
        <q-btn size="xs" tag="a" class="q-mt-lg" icon="fas fa-arrow-left" round color="primary" :to="prevMonthLink" />
      </div>
      <div class="col-6 text-center">
        <h5 class="q-mt-md q-mb-none">
          {{ monthName }}
          <q-btn size="xs" round :to="'/' + $route.params.slug + '/statement/update/' + statement['id']" color="primary" icon="fas fa-pencil-alt"/>
        </h5>

        <!-- only snows up if the statement is reconciled -->
        <q-badge align="top" v-if="statement['reconciled'] == 'Y'">
          Statement Reconciled
        </q-badge>
      </div>
      <div class="col">
        <q-btn size="xs" class="q-mt-lg float-right" icon="fas fa-arrow-right" round color="primary" :to="nextMonthLink"  />
      </div>
    </div>

    <div class="row q-mt-md">
      <div class="col">
        <b>Beginning Balance:</b> ${{ statement['beginningBalance'] }}
      </div>
    </div>

    <div class="row">
      <div class="col text-left">
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

      <template v-slot:after v-if="statement['reconciled'] == 'N'">
        <q-btn
          v-if="! statement.statementReconciled"
          round
          color="deep-orange"
          icon="fas fa-plus"
          type="a"
          :to="'/account/' + $route.params.id + '/' + $route.params.slug + '/transaction/add/' + $route.params.year + '/' + $route.params.month + '/statement/' + statement['id'] + '/'"
        />
      </template>

    </q-input>

    <q-card class="my-card q-mx-xs q-my-md" v-for="transaction in filteredList" :key="transaction['transactionId']">
      <q-card-section>
        <div class="text-h6">{{transaction['recipientName']}}{{transaction['payerName']}}</div>
        <div class="text-subtitle2">
          {{transaction['note']}}
        </div>
      </q-card-section>

      <q-markup-table>
        <thead>
        <tr>
          <th class="text-left">Date</th>
          <th class="text-right">Amount</th>
          <th class="text-center">R</th>
          <th class="text-right">Balance</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{{transaction['transactionDateFormatted']}}</td>
          <td :class="transaction.amount > 0 ? 'text-green text-right' : 'text-red text-right' ">{{transaction.amount}}</td>
          <td class="text-center"><q-icon v-if="transaction.reconciled == 'Y'" name="fas fa-check" /></td>
          <td class="text-right">{{transaction['total']}}</td>
        </tr>
        </tbody>
      </q-markup-table>

      <q-card-section v-if="! statement.statementReconciled">
        <q-card-actions align="right">
          <q-btn
            round
            color="primary"
            icon="fas fa-pencil-alt"
            type="a"
            :to="'/account/' + $route.params.id + '/' + $route.params.slug + '/transaction/update/' + transaction['transactionId'] + '/' + $route.params.year + '/' + $route.params.month + '/statement/' + statement['id'] + '/'"
            class="float-right"
          />
        </q-card-actions>
      </q-card-section>
    </q-card>

  </div>
</template>
<script>

export default {
  name: 'TransactionsListMobile',

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
