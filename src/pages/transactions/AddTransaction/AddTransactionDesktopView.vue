<template>
  <div class="row justify-center q-mt-lg">
    <div class="col-xs-10 col-sm-8 col-md-6 col-lg-6 col-xl-5">

      <q-tabs
        v-model="tab"
        class=""
      >
        <q-tab name="expense" icon="remove" label="Add Expense" />
        <q-tab name="income" icon="add" label="Add Income" />
        <q-tab name="scheduled" icon="schedule" label="Add Scheduled" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="expense">
          <AddExpenseForm
            :budget-attached="budgetAttached"
          />
        </q-tab-panel>

        <q-tab-panel name="income">
          <AddIncomeForm
            :budget-attached="budgetAttached"
          />
        </q-tab-panel>

        <q-tab-panel name="scheduled">
          <AddScheduledTransactionList/>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>

</template>

<script>
import addExpense from "../../../components/transactions/Desktop/AddExpense"
import addIncome from "../../../components/transactions/Desktop/AddIncome"
import addScheduled from "../../../components/transactions/Desktop/AddScheduled"
import HTTP from "../../../http-common"

export default {
  name: 'AddTransactionDesktopView',

  props: {
    budgetAttached: {
      type: [Boolean],
      default: false,
    },
  },

  components: {
    AddExpenseForm : addExpense,
    AddIncomeForm : addIncome,
    AddScheduledTransactionList : addScheduled
  }, // components

  data () {
    return {
      tab: 'expense',
    }
  }, // data

} // export default
</script>
