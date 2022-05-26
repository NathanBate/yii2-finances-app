<template>
    <div>
      <div class="text-h6">New Expense</div>
      <q-form @submit="addExpense" class="q-gutter-md q-mt-lg">

        <RecipientList
          @updateNewRecipient="(value) => { newRecipient = value }"
          @updateRecipient="(value) => { expenseSearch = value }"
        />

        <q-input
          outlined
          label="Amount"
          v-model="amount"
          type="text"
          filled
          prefix="-"
          style="max-width: 200px"
          no-error-icon
          :rules="[val => val.match(/^\d+\.?\d*$/) || 'Just numbers and a decimal.  No negative sign']"
        />


        <CategoryPicker
          mode="Add"
          category-type="E"
          @categoryChosen="(value) => { selectedCategory = value }"
          class="q-mb-lg"
        />


        <div class="row">
          <div class="col-shrink">
            <DatePicker
              @updateDatePicker="(value) => { transactionDate = value }"
              :initialDate="transactionDate"
            />
          </div>

          <div v-if="$q.platform.is.desktop" class="col-shrink">
            <q-input
              outlined
              label="Order"
              filled
              v-model="minuteOrder"
              type="number"
              class="q-ml-md"
              style="max-width:200px;"
            />
          </div>

          <div v-else class="col-12">
            <q-input
              outlined
              label="Order"
              filled
              v-model="minuteOrder"
              type="number"
              class="q-my-md"
              style="max-width:200px;"
            />
          </div>
        </div>

        <q-input
          outlined
          label="Note"
          v-model="note"
          ref="input"
        />

        <div class="col-sm-12">
          <q-toggle
            v-model="reconciled"
            label="Reconciled?"
            color="green"
          />
        </div>

        <q-btn type="submit" icon="fas fa-plus" color="primary" label="Add" />

      </q-form>
    </div>
</template>
<script>

import { date } from 'quasar'
import HTTP from "../../../http-common";
import RecipientList from "../../ui/RecipientList";
import DatePicker from "../../ui/DatePicker";
import CategoryPicker from "../../../pages/transactions/transactionCategory"

export default {
  name: 'AddExpenseMobile',

  props: {
    budgetItems: {
      type : [Array, Object],
    },
    budgetAttached: {
      type: [Boolean],
      default: false,
    }
  },

  components: {
    RecipientList : RecipientList,
    DatePicker : DatePicker,
    CategoryPicker : CategoryPicker,
  },

  data () {
    return {
      bManualPaidTo : false,
      newRecipient : "",
      expenseSearch: "",
      recipients : [],
      recipientOptions: this.recipients,
      amount: "",
      transactionDate: "",
      minuteOrder: 0,
      note: '',
      reconciled : false,
      selectedCategory: "",
    }
  }, // data
  methods: {
    addExpense() {
      let payload = {
        "recipient" : this.expenseSearch,
        "newRecipient" : this.newRecipient,
        "amount" : "-" + this.amount,
        "transactionDate" : this.transactionDate,
        "note" : this.note,
        "account" : this.$route.params.id,
        "reconciled" : (this.reconciled ? "Y" : 'N'),
        "minuteOrder" : (this.minuteOrder != '' ? this.minuteOrder : 0),
      }

      if (this.budgetAttached) {
        if (this.selectedCategory !== null) {
          payload["category"] = this.selectedCategory.value
        }
      }

      console.log(payload)
      HTTP.post("transaction/add-transaction",payload).then( response => {
        if (response.data.success === true) {
          this.$router.push('/account/' + this.$route.params.id + '/' + this.$route.params.slug + '/' + this.$route.params.year + '/' + this.$route.params.month + '/')
        }
      })
    },
  }, // methods

  created() {

    // build initial date for date picker
    let day = "01";
    let month = date.formatDate(new Date(), "M");
    if (this.$route.params.month == month) {
      day = date.formatDate(new Date(), "DD")
    }
    this.transactionDate = date.formatDate(this.$route.params.year + "/" + this.$route.params.month + "/" + day, "YYYY/MM/DD")
  }, // created hook
} // export default
</script>
