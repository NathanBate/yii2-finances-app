<template>
  <q-page>
    <BreadCrumbs :crumbs="crumbs" v-if="accounts[$route.params.id] !== undefined" />

    <div class="row justify-center q-mt-lg">
      <div class="col-xs-10 col-sm-8 col-md-6 col-lg-6 col-xl-5">
        <Heading heading="Add To Scheduled Transaction List" />

        <q-form @submit="addToScheduledList" class="q-gutter-sm q-mt-lg">

          <div class="row q-gutter-sm">

            <div class="col-12 col-sm-12 col-md-3 col-lg-3">
              <q-input
                outlined
                label="Day of the Month"
                filled
                v-model="day"
                type="number"
                min="1"
                max="31"
                class="q-mb-lg"
              />
            </div>

            <div class="col-12 col-sm-12 col-md-3 col-lg-3">
              <q-input
                outlined
                label="Amount"
                filled
                v-model="amount"
                type="text"
                :rules="[val => val.match(/^\-?(\d+\.?\d*|\d*\.?\d+)$/) || 'Please enter a valid amount']"
                class="q-mb-lg"
                prefix="$"
              />
            </div>

          </div>

          <div class="row q-gutter-sm q-mb-xl">
            <div class="col-sm-12">
              <q-btn-toggle
                v-model="incomeOrExpense"
                class="my-custom-toggle"
                no-caps
                unelevated
                toggle-color="primary"
                color="white"
                text-color="primary"
                :options="[
                {label: 'Expense', value: 'expense'},
                {label: 'Income', value: 'income'}
              ]"
              />

              <div v-if="incomeOrExpense == 'expense'" class="q-pt-md">
                <RecipientList
                  @updateNewRecipient="(value) => { newRecipient = value }"
                  @updateRecipient="(value) => { recipient = value }"
                />
              </div>

              <div v-else class="q-pt-md">
                <PayerList
                  @updateNewPayer="(value) => { newPayer = value }"
                  @updatePayer="(value) => { payer = value }"
                />
              </div>
            </div>
          </div>

          <q-btn type="submit" icon="fas fa-plus" color="primary" label="Add" />

        </q-form>

      </div>
    </div>

  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import BreadCrumbs from "../../components/ui/BreadCrumbs";
import PageHeading from "../../components/ui/PageHeading";
import RecipientList from "../../components/ui/RecipientList";
import PayerList from "../../components/ui/PayerList";
import HTTP from "../../http-common"

export default {
  name: 'AddToNewScheduledTransactionList',

  components: {
    BreadCrumbs : BreadCrumbs,
    Heading : PageHeading,
    RecipientList : RecipientList,
    PayerList : PayerList,
  }, // components

  data () {
    return {
      tab: 'expense',
      day: 1,
      name : '',
      amount : "",
      incomeOrExpense : 'expense',
      recipient : "",
      newRecipient : "",
      payer : "",
      newPayer : "",
    }
  }, // data

  computed: {
    crumbs() {
      if (this.accounts[this.$route.params.id] !== undefined) {
        return [
          {
            icon: 'fas fa-money-check-alt',
            label: this.accounts[this.$route.params.id].accountName,
            to: '/account/' + this.$route.params.id + '/' + this.$route.params.slug + '/' + this.$route.params.year + '/' + this.$route.params.month + '/',
          },
          {
            icon: 'fas fa-plus',
            label: 'Add Scheduled Transaction',
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
    addToScheduledList() {

      let amount = this.amount

      /**
       * A double check on amounts and if they are properly negated
       */
      if (this.incomeOrExpense == "expense") {
        if (amount > 0)  {
          console.log("got here")
          amount = -Math.abs(amount)
        }
      }

      /**
       * A double check that the amount is positive
       */
      if (this.incomeOrExpense == "income") {
        if (amount < 0)  {
          amount = Math.abs(amount)
        }
      }

      let payload = {
        "account" : this.$route.params.id,
        "dayOfMonth" : this.day,
        "amount" : amount,
        "newRecipient" : this.newRecipient,
        "recipient" : (this.incomeOrExpense == "expense" ? this.recipient : ""),
        "newPayer" : this.newPayer,
        "payer" : (this.incomeOrExpense == "income" ? this.payer : ""),

      }
      console.log(payload)
      HTTP.post("transaction/add-to-scheduled-transaction-list",payload).then( response => {
        if (response.data.success === true) {
          this.$router.push('/account/' + this.$route.params.id + '/' + this.$route.params.slug + '/' + this.$route.params.year + '/' + this.$route.params.month + '/')
        }
      })

    },
  }, // methods

} // export default
</script>
