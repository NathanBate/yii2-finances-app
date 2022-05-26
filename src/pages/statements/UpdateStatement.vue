<template>
  <q-page>

    <div class="row justify-center q-mt-none q-pt-none">
      <div class="col-xs-10 col-sm-8 col-md-6 col-lg-6 col-xl-5">

        <div class="col-12 text-left">
          <h4 class="q-mt-md">{{ monthName }} {{ statementYear }} Statement</h4>
        </div>

        <q-form @submit="onSubmit" class="q-gutter-md q-mt-lg">

          <div class="row">
            <div class="col-shrink">
              <q-input
                class="q-mr-lg"
                outlined
                label="Beginning Balance"
                prefix="$"
                v-model ="beginningBalance"
                type="text"
                filled
                style="max-width: 200px"
                no-error-icon
                :rules="[val => !!val || 'Field is required']"
              />
            </div>
            <div class="col-grow">
              <q-btn
                icon="undo"
                color="primary"
                class="q-pa-sm"
                @click="beginningBalance = previousMonthEndingBalance"
              >
                <q-tooltip>
                  Get Previous Month's Statement
                </q-tooltip>
              </q-btn>
            </div>
          </div>

          <div class="row" v-if="((budget !== null) && (budget !== ''))">
            <div class="col-shrink q-pt-xs">
              <b>Budget:</b> {{ budgetName }}
            </div>
            <div class="col-shrink">
              <q-btn
                size="xs"
                round
                icon="close"
                @click="detachBudget"
                class="q-ml-sm"
              />
            </div>
          </div>
          <div v-else>
            <div class="col-12 q-mb-lg">
              <q-select
                style="width:275px;"
                label="Available Budgets"
                v-model="selectedBudget"
                :options="availableBudgets"
                clearable
              />
            </div>
          </div>


          <div class="row q-my-xl">
            <div class="col-shrink q-pt-sm">
              Statement Reconciled?
            </div>
            <div class="col-shrink">
              <q-toggle
                v-model="reconciled"
                color="green"
              />
            </div>
          </div>

          <div class="row q-my-xl">
            <q-btn type="submit" icon="" color="primary" label="Save" />
          </div>

        </q-form>

      </div>
    </div>


  </q-page>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { date } from 'quasar'
  import HTTP from "../../http-common";

  export default {
    name: 'UpdateStatementPage',

    data () {
      return {
        id : -1,
        beginningBalance: 0,
        endingBalance: 0,
        monthName : '',
        statementYear : -1,
        statementMonth : -1,
        statementDate : '',
        accountId : -1,
        showEndingBalance : true,
        reconciled: false,
        previousMonthEndingBalance : 0.00,
        budget : "",
        budgetName : "",
        availableBudgets: [],
        selectedBudget: null,
      }
    },

    computed: {
      ...mapGetters({
        "accounts" : "accounts/getAccounts",
      }),
    }, // computed

    methods: {
      onSubmit () {

        var payload = {
          "id" : this.id,
          "beginningBalance" : this.beginningBalance,
          "reconciled" : (this.reconciled ? "Y" : 'N'),
        }

        if (this.selectedBudget !== null) {
          payload['budget'] = this.selectedBudget.value
        }

        console.log("selected budget")
        console.log(payload.budget)

        HTTP.post("statement/update", payload).then( response => {
          if (response.data.success === true) {
            this.$router.push('/account/' + this.accountId + '/' + this.$route.params.slug + '/' + this.statementYear + '/' + this.statementMonth + '/')
          }
        })
      },   // on submit

      detachBudget() {
        this.$q.dialog({
          title: 'Confirm',
          message: 'Are you sure you would like to detach this budget?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          HTTP.get("statement/detach-budget/" + this.id)
            .then( response => {
              if (response.data.success === true) {
                this.$router.push('/account/' + this.accountId + '/' + this.$route.params.slug + '/' + this.statementYear + '/' + this.statementMonth + '/')
              }
            })
            .catch((error) => {
              // handle error
              console.log(error);
              this.$q.notify({
                message: 'There was a problem detaching the budget',
                color: 'red',
                position: "top",
                timeout: 5000,
              })

            })
            .then(function () {
              // always executed
            });
        }).onOk(() => {
          // console.log('>>>> second OK catcher')
        }).onCancel(() => {
          // console.log('>>>> Cancel')
        }).onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        })
      }, // detachbudget
    },

    created() {
      HTTP.get("statement/view/" + this.$route.params.id).then( response => {

        console.log("statement")
        console.log(response.data)

        if (response.data.success === true) {
          let statement = response.data.statement
          this.id = statement.statementId
          this.statementDate = statement.statementDateFormatted
          this.beginningBalance = statement.beginningBalance
          this.endingBalance = statement.endingBalance
          this.accountId = statement.account
          this.budget = statement.budget

          if (statement.hasOwnProperty("budgetName")) {
            this.budgetName = statement.budgetName
          }

          this.availableBudgets = response.data.availableBudgets
          if (statement.reconciled == 'Y') {
            this.reconciled = true
          }
          this.previousMonthEndingBalance = response.data.previousStatement.endingBalance
          this.monthName = date.formatDate(statement.statementDateFormatted, "MMMM")
          this.statementYear = date.formatDate(statement.statementDateFormatted, "YYYY")
          this.statementMonth = date.formatDate(statement.statementDateFormatted, "M")
        }
      })
    },

  }
</script>
