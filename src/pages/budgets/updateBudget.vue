<template>
  <q-page class="q-pb-xl">
    <BreadCrumbs :crumbs="crumbs"/>

    <div class="row justify-center q-mt-none q-pt-none">
      <div class="col-xs-10 col-sm-8 col-md-6 col-lg-6 col-xl-5">
        <div class="row">
          <div class="col-shrink">
            <h5 class="q-mb-none q-pb-none q-mt-sm">
              {{ budgetName }}
              <span v-if="budgetAvailableForUpdate">
                <q-btn color="primary" round size="xs" icon="edit" :to="'/budgets/updatetitle/' + $route.params.id + '/'" />
              </span>
            </h5>
          </div>
          <div class="col-grow text-right q-mt-xs">
            <q-btn
              label="Archive"
              class="q-my-auto"
              @click="archiveStatement"
            />
          </div>
        </div>

        <q-separator class="q-mt-md"/>

        <div class="row q-mt-md q-mb-xl">
          <div class="col-12 text-left text-bold">Total Income: ${{ totalIncome }}</div>
          <div class="col-12 text-left text-bold">Total Expenses: ${{ totalExpenses }}</div>
          <div class="text-bold" :class="((totalIncome - totalExpenses) < 0) ? 'text-red' : 'text-green'">Net Income: ${{ Number(totalIncome - totalExpenses) }}</div>
        </div>

        <!-- Income ************************************************************************************************ -->
        <BudgetItemTable
          :items="budgetIncomeItems"
          item-type="I"
          :total="totalIncome"
          :updatable="true"
        />
        <q-btn
          icon="add"
          round
          v-show="((! showAddIncomeBudgetItem))"
          @click="showAddIncomeBudgetItem = true"
          class="q-mt-lg q-mb-lg"
        />
        <AddBudgetItem
          v-if="showAddIncomeBudgetItem"
          itemType="I"
          :categories="incomeCategories"
          :budget="Number($route.params.id)"
          :currentlyUsedCategories="usedBudgetIncomeCategories"
          @newBudgetItem="(value)=>{
            this.showAddIncomeBudgetItem = false
            this.budgetIncomeItems.push(value)
            let newUsedCategory = {}
            newUsedCategory[Number(value.categoryId)] = value
            this.$set(this.usedBudgetIncomeCategories,Number(value.categoryId), newUsedCategory)
          }"
          @showAddBudgetItem="(value)=>{this.showAddIncomeBudgetItem=value}"
          class="q-mb-xl q-mt-md"
        />

        <!-- Expenses ********************************************************************************************** -->
        <BudgetItemTable
          :items="budgetExpenseItems"
          item-type="E"
          :total="totalExpenses"
          :updatable="true"
          class="q-mt-xl"
        />
        <q-btn
          icon="add"
          round
          v-show="((! showAddExpenseBudgetItem))"
          @click="showAddExpenseBudgetItem = true"
          class="q-mt-lg"
        />
        <AddBudgetItem
          v-if="showAddExpenseBudgetItem"
          itemType="E"
          :categories="expenseCategories"
          :budget="Number($route.params.id)"
          :currentlyUsedCategories="usedBudgetExpensesCategories"
          @newBudgetItem="(value)=>{
            this.showAddExpenseBudgetItem = false
            this.budgetExpenseItems.push(value)

            let newUsedCategory={}
            newUsedCategory[Number(value.categoryId)] = value
            this.$set(this.usedBudgetExpensesCategories,Number(value.categoryId), newUsedCategory)
          }"
          @showAddBudgetItem="(value)=>{this.showAddExpenseBudgetItem=value}"
          class="q-mb-xl q-mt-md"
        />

      </div>
    </div>

  </q-page>
</template>

<script>
  import BreadCrumbs from "../../components/ui/BreadCrumbs";
  import HTTP from "../../http-common";
  import AddBudgetItem from "./addBudgetItem"
  import BudgetItemTable from "./budgetItemTable";

  export default {
    name: 'UpdateBudget',

    components: {
      BreadCrumbs : BreadCrumbs,
      AddBudgetItem : AddBudgetItem,
      BudgetItemTable : BudgetItemTable,
    }, // components

    data () {
      return {
        budgetName: "",
        budgetCategoryName : "",
        budgetCategoriesLabels : [
          { "label": '', "value" : '' },
          { "label": 'Income', "value" : 'I' },
          { "label": 'Expense', "value" : 'E' },
        ],
        incomeCategories: [],
        expenseCategories: [],
        budgetCategoryType: "",
        budgetIncomeItems : [],
        budgetExpenseItems: [],
        usedBudgetIncomeCategories: [],
        usedBudgetExpensesCategories: [],
        showAddIncomeBudgetItem : false,
        showAddExpenseBudgetItem : false,
        budgetAvailableForUpdate: false,
      }
    }, // data

    computed: {
      crumbs() {
        return [
          {
            icon: 'view_list',
            label: "Budgeting",
            to: '/budgets/'
          },
          {
            icon: 'edit',
            label: 'Update Budget',
            to: '',
          }
        ];
      },
      totalIncome() {
        let total = 0
        this.budgetIncomeItems.forEach((item)=>{
          total = total + Number(item.amount)
        })
        return total
      },
      totalExpenses() {
        let total = 0
        this.budgetExpenseItems.forEach((item)=>{
          total = total + Number(item.amount)
        })
        return total
      },
    }, // computed

    methods: {
      updateBudget() {
        let payload = {
          "name" : this.budgetName,
        }
        console.log(payload)
        HTTP.post("budget/add",payload)
          .then( response => {
            if (response.data.success === true) {
              this.$router.push('/budgets/')
            }
          })
          .catch((error) => {
            // handle error
            console.log(error);
            this.$q.notify({
              message: 'There was a problem adding the budget',
              color: 'red',
              position: "top",
              timeout: 5000,
            })

          })
          .then(function () {
            // always executed
          });
      },

      getBudget() {
        HTTP.get("budget/get-budget/" + this.$route.params.id)
          .then( response => {

            console.log("Budget from API")
            console.log(response.data)

            if (response.data.success === true) {
              this.budgetName = response.data.budget.name
              this.incomeCategories = response.data.incomeCategories
              this.expenseCategories = response.data.expenseCategories
              this.budgetIncomeItems = response.data.budgetIncomeItems
              this.budgetExpenseItems = response.data.budgetExpenseItems
              this.usedBudgetIncomeCategories = response.data.usedBudgetIncomeCategories
              this.usedBudgetExpensesCategories = response.data.usedBudgetExpensesCategories
              this.budgetAvailableForUpdate = response.data.budgetAvailableForUpdate
            }
          })
          .catch((error) => {
            // handle error
            console.log(error);
            this.$q.notify({
              message: 'There was a problem adding the budget',
              color: 'red',
              position: "top",
              timeout: 5000,
            })

          })
          .then(function () {
            // always executed
          });
      },

      archiveStatement() {
        this.$q.dialog({
          title: 'Confirm',
          message: 'Are you sure you would like to archive this budget?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          HTTP.get("budget/archive/" + this.$route.params.id)
            .then((response)=>{
              if (response.data.success) {
                this.$router.push("/budgets/")
              }
            }) // then
            .catch((error) => {
              // handle error
              console.log(error);
              this.$q.notify({
                message: 'There was a problem archiving the budget.',
                color: 'red',
                position: "top",
                timeout: 5000,
              })
            }) // catch
            .then(function () {
              // always executed
            }); // then always
        }).onOk(() => {
          // console.log('>>>> second OK catcher')
        }).onCancel(() => {
          // console.log('>>>> Cancel')
        }).onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        })
      },

      addBudgetCategory() {

      }

    },

    created() {
      this.getBudget()
    },
  } // export default
</script>
