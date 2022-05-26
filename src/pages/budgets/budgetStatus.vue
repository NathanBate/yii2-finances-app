<template>
  <q-page>

    <div class="row q-pa-md" v-if="accounts[$route.params.accountid] !== undefined">
      <div class="col-md-12">
        <q-breadcrumbs>
          <q-breadcrumbs-el icon="fas fa-home" to="/" />
          <q-breadcrumbs-el :label="accounts[$route.params.accountid].accountName" icon="account_balance" :to="'/account/' + $route.params.accountid + '/' + accounts[$route.params.accountid].slug + '/' + $route.params.yearnumber + '/' + $route.params.monthnumber + '/'" />
          <q-breadcrumbs-el label="Budget Status Report" />
        </q-breadcrumbs>
      </div>
    </div>

    <div class="row justify-center q-mt-lg q-ml-sm">
      <div class="col-xs-10 col-sm-10 col-md-10">
        <div class="text-h4 q-mb-lg">
          {{ $route.params.monthname }} {{ $route.params.yearnumber }}
        </div>

        <q-card>

          <div class="bg-grey-2 q-pa-md">

            <div class="row q-pb-md">
              <div class="text-h5">Expenses</div>
            </div>

            <div class="row">
              <div class="col-8">
                <b>Category</b>
              </div>
              <div class="col-4">
                <b>Status</b>
              </div>
              <div class="col-1">
                &nbsp;
              </div>
            </div>
          </div>

          <div class="row q-pa-md budgetCategoryItem" v-for="(item, index) in expenseReport" :key="'budget-items-list-item-id-'+item.categoryInfo.categoryId">

            <div class="col-8">
              {{ item.categoryInfo.categoryName }}
            </div>
            <div class="col-3" :style="((item.categoryInfo.budgetedAmount - item.categoryInfo.transactionTotal) < 0) ? 'color:red;' : 'color:green;'">
              ${{ item.categoryInfo.transactionTotal }} of ${{ item.categoryInfo.budgetedAmount }}
            </div>
            <div class="col-1">
              <div v-if="item.transactions.length > 0">
                <q-btn round :icon="item.icon" size="xs" @click="showTransactions(item.categoryInfo.categoryId,index,'expenseReport')" :ref="'category-info-icon'+item.categoryInfo.categoryId"/>
              </div>

            </div>

            <div class="col-12 q-pa-sm" :ref="'category'+item.categoryInfo.categoryId" style="display:none;">
              <CategoryTransactionReport :transactions="item.transactions" />
            </div>

          </div>
          <div class="row q-pa-md bg-grey-2">
            <div class="col-8">&nbsp;</div>
            <div class="col-3 text-bold">
              <div :class="(expenseTotal > budget.budget.expenseTotal) ? 'text-red' : 'text-black'">
                ${{ expenseTotal }} of ${{ budget.budget.expenseTotal }}
              </div>
            </div>
            <div class="col-1">&nbsp;</div>
          </div>

        </q-card>

        <div class="q-mt-xl">
          <q-card>

            <div class="bg-grey-2 q-pa-md">

              <div class="row q-pb-md">
                <div class="text-h5">Income</div>
              </div>

              <div class="row">
                <div class="col-8">
                  <b>Category</b>
                </div>
                <div class="col-3">
                  <b>Status</b>
                </div>
                <div class="col-1">
                  &nbsp;
                </div>
              </div>
            </div>

            <div class="row q-pa-md budgetCategoryItem" v-for="(item, index) in incomeReport" :key="'budget-items-list-item-id-'+item.categoryInfo.categoryId">

              <div class="col-8">
                {{ item.categoryInfo.categoryName }}
              </div>
              <div class="col-3" :style="((item.categoryInfo.budgetedAmount - item.categoryInfo.transactionTotal) > 0) ? 'color:red;' : 'color:black;'">
                ${{ item.categoryInfo.transactionTotal }} of ${{ item.categoryInfo.budgetedAmount }}
              </div>
              <div class="col-1">
                <div v-if="item.transactions.length > 0">
                  <q-btn round :icon="item.icon" size="xs" @click="showTransactions(item.categoryInfo.categoryId,index,'incomeReport')" :ref="'category-info-icon'+item.categoryInfo.categoryId"/>
                </div>
              </div>

              <div class="col-12 q-pa-sm" :ref="'category'+item.categoryInfo.categoryId" style="display:none;">
                <CategoryTransactionReport :transactions="item.transactions" />
              </div>

            </div>
            <div class="row q-pa-md bg-grey-2">
              <div class="col-8">&nbsp;</div>
              <div class="col-3 text-bold">
                <div :class="(incomeTotal < budget.budget.incomeTotal) ? 'text-red' : 'text-black'">
                  ${{ incomeTotal }} of ${{ budget.budget.incomeTotal }}
                </div>
              </div>
              <div class="col-1">&nbsp;</div>
            </div>

          </q-card>
        </div>

      </div>
    </div>

  </q-page>
</template>

<script>
import HTTP from "../../http-common"
import { mapGetters } from 'vuex'
import categoryTransactionReport from "./categoryTransactionReport";

export default {
  name: "BudgetStatusPage",
  components: {
    "CategoryTransactionReport" : categoryTransactionReport,
  },
  data() {
    return {
      expenseReport: [],
      incomeReport: [],
      budget: {
        budget: {
          expenseTotal: 0,
          incomeTotal: 0,
        }
      },
      incomeTotal : null,
      expenseTotal : null,
      showTotals: false,
    }
  },
  computed: {
    ...mapGetters({
      "accounts" : "accounts/getAccounts",
    }),
  }, // computed
  methods: {
    getBudgetStatus() {
      HTTP.get("budget/get-status/" + this.$route.params.id)
        .then( response => {

          if (response.data.success) {
            this.expenseReport = response.data.expenseReport
            this.incomeReport = response.data.incomeReport

            HTTP.get("transactions/" + this.$route.params.yearnumber + "/" + this.$route.params.monthnumber + "/" + this.$route.params.accountid).then( response => {
              if (response.data.success === true) {
                this.transactions = response.data.transactions
                this.statement = response.data.statement
                this.budgetAttached = response.data.budgetAttached
                this.budget = response.data.budget
                this.incomeTotal = response.data.incomeTransactionsTotal
                this.expenseTotal = response.data.expenseTransactionsTotal
                //this.showTotals = true
              }
            })

          }
        })
        .catch( error => {

        })
    },
    showTransactions(id,index,report) {
      if (this.$refs["category" + id][0].style.display === 'none') {
        this.$refs["category" + id][0].style.display = 'block'
        this[report][index].icon = "close"
      } else {
        this.$refs["category" + id][0].style.display = 'none'
        this[report][index].icon = "keyboard_arrow_down"
      }

    },
  },
  created(){
    this.getBudgetStatus()
  }
}
</script>

<style scoped>

.budgetCategoryItem:hover {
  background-color: lightgray;
}

</style>
