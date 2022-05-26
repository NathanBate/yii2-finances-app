<template>
  <div>

      <q-tabs v-model="tab" >
        <q-tab name="expense" icon="remove" label="Add Expense" />
        <q-tab name="income" icon="add" label="Add Income" />
        <q-tab name="scheduled" icon="schedule" label="Add Scheduled" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="expense">
          <AddExpense
            :budget-attached="budgetAttached"
          />
        </q-tab-panel>

        <q-tab-panel name="income">
          <AddIncome
            :budget-attached="budgetAttached"
          />
        </q-tab-panel>

        <q-tab-panel name="scheduled">
          Adding Scheduled Transactions are disabled in Mobile View for now
          <!-- <AddScheduled /> -->
        </q-tab-panel>
      </q-tab-panels>
  </div>

</template>

<script>
import addExpense from "../../../components/transactions/Mobile/AddExpenseMobile"
import addIncome from "../../../components/transactions/Mobile/AddIncomeMobile"
import addScheduled from "../../../components/transactions/Mobile/AddScheduledMobile"

export default {
  name: 'AddTransactionMobileView',

  props: {
    budgetAttached: {
      type: [Boolean],
      default: false,
    },
  },

  components: {
    AddExpense : addExpense,
    AddIncome : addIncome,
    AddScheduled : addScheduled
  }, // components

  data () {
    return {
      tab: 'expense',
    }
  }, // data

} // export default
</script>
