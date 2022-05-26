<template>
  <q-page>
    <BreadCrumbs :crumbs="crumbs" v-if="accounts[$route.params.id] !== undefined" />

    <DesktopView
      v-if="! $q.platform.is.mobile"
      :transaction="transaction"
      :transactionYear="transactionYear"
      :transactionMonth="transactionMonth"
      :category-type="(transaction.payer !== null) ? 'I' : 'E'"
      :budget-attached="budgetAttached"
    />

    <MobileView
      v-if="$q.platform.is.mobile"
      :transaction="transaction"
      :transactionYear="transactionYear"
      :transactionMonth="transactionMonth"
      :category-type="(transaction.payer !== null) ? 'I' : 'E'"
      :budget-attached="budgetAttached"
    />
  </q-page>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { date } from 'quasar'
  import HTTP from "../../../http-common";
  import BreadCrumbs from "../../../components/ui/BreadCrumbs";
  import DatePicker from "../../../components/ui/DatePicker";
  import UpdateTransactionDesktopView from "./UpdateTransactionDesktopView";
  import UpdateTransactionMobileView from "./UpdateTransactionMobileView";

  export default {
    name: 'UpdateTransaction',

    components: {
      BreadCrumbs : BreadCrumbs,
      DatePicker : DatePicker,
      DesktopView : UpdateTransactionDesktopView,
      MobileView: UpdateTransactionMobileView,
    },

    data () {
      return {
        transactionYear : '',
        transactionMonth : '',

        transaction: {
          transactionId: -1,
          account: -1,
          title: '',
          amount: -1,
          category: null,
          payer : null,
          recipient : null,
          transactionDate: '',
          note: '',
          reconciled: false,
          minuteOrder: 0,
        }, // transaction

        budgetAttached : false,
      } // return
    },

    computed: {
      crumbs() {
        if (this.accounts[this.$route.params.id] !== undefined) {
          return [
            {
              icon: 'account_balance',
              label: this.accounts[this.$route.params.id].accountName,
              to: '/account/' + this.$route.params.id + '/' + this.$route.params.slug + '/' + this.$route.params.year + '/' + this.$route.params.month + '/'
            },
            {
              icon: 'edit',
              label: 'Edit Transaction',
              to: '',
            }
          ];
        }
      },
      ...mapGetters({
        "accounts" : "accounts/getAccounts",
      }),
    }, // computed

    methods: {
      getTransaction() {
        HTTP.get("transaction/view/" + this.$route.params.transactionid)
          .then( response => {
            if (response.data.success === true) {

              /**
               *  Data
               */
              let t = response.data.transaction

              console.log("transaction data")
              console.log(t)

              /**
               * Transaction ID
               */
              this.transaction.transactionId = t.transactionId

              /**
               * Account
               */
              if (t.amount > 0) {
                this.transaction.account = t.payerAccount
              } else {
                this.transaction.account = t.recipientAccount
              }

              /**
               * Title
               */
              if (t.payerName !== null) {
                this.transaction.title = t.payerName
              } else {
                this.transaction.title = t.recipientName
              }

              /**
               *  Amount
               */
              this.transaction.amount = t.amount

              /**
               * Date
               */
              this.transaction.transactionDate = t.transactionPickerDate

              /**
               * Minute Order
               * @type {number}
               */
              this.transaction.minuteOrder = parseInt(t.minuteOrder)

              /**
               * Note
               */
              this.transaction.note = t.note

              /**
               * Reconciled
               */
              if (t.reconciled == 'Y') {
                this.transaction.reconciled = true
              }

              this.transaction.payer = t.payer
              this.transaction.recipient = t.recipient
              //this.$set(this.transaction, "category", t.category)
              this.transaction.category = Number(t.category)

              this.transactionYear = date.formatDate(t.transactionDateFormatted, "YYYY")
              this.transactionMonth = date.formatDate(t.transactionDateFormatted, "M")


            }
          })
          .catch((error) => {
            // handle error
            console.log(error);
            this.$q.notify({
              message: 'There was a problem getting the transaction',
              color: 'red',
              position: "top",
              timeout: 5000,
            })

        })
          .then(function () {
            // always executed
          });
      }, // getTransaction

      getBudgetInfo() {
        HTTP.get("budget/get-budget-info-by-statement-id/" + this.$route.params.statementid)
          .then( response =>{
            if (response.data.success) {
              this.budgetAttached = response.data.budgetAttached
            }
          })
          .catch((error) => {
            // handle error
            console.log(error);
            this.$q.notify({
              message: 'There was a problem getting the budget information',
              color: 'red',
              position: "top",
              timeout: 5000,
            })

          })
          .then(function () {
            // always executed
          });
      }, // getBudgetInfo
    }, // methods

    created() {
      this.getTransaction()
      this.getBudgetInfo()
    }, // created

  }
</script>
