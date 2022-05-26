<template>
  <q-page>
    <BreadCrumbs :crumbs="crumbs" v-if="accounts[$route.params.id] !== undefined" />

    <div class="row justify-center q-mt-lg">
      <div class="col-xs-10 col-sm-8 col-md-6 col-lg-6 col-xl-5">
        <Heading :heading="name" />

        <q-form @submit="updateToScheduledList" class="q-gutter-sm q-mt-lg">

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

          <q-btn type="submit" icon="fas fa-plus" color="primary" label="Update" />

        </q-form>

        <div class="q-mt-xl q-pt-xl">
          <q-btn type="button" icon="fas fa-trash-alt" color="primary" label="Trash" @click="updateToScheduledList('Y')" />
        </div>

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
      scheduledTransactionId : -1,
      day: 1,
      name : '',
      amount : 0,
      recipient : "",
      payer : "",
      incomeOrExpense: "expense",
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
            label: 'Update Scheduled Transaction',
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
    updateToScheduledList(trash="N") {

      console.log("the trash param is: " + trash)

      let amount = this.amount

      /**
       * A double check on amounts and if they are properly negated
       */
      if (this.incomeOrExpense == "expense") {
        if (amount > 0)  {
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
        "id" : this.scheduledTransactionId,
        "dayOfMonth" : this.day,
        "amount" : amount,
        "trashed" : (trash == "Y" ? "Y" : "N"),
      }
      console.log(payload)
      HTTP.post("transaction/update-scheduled-transaction",payload).then( response => {
        if (response.data.success === true) {
          this.$router.push('/account/' + this.$route.params.id + '/' + this.$route.params.slug + '/' + this.$route.params.year + '/' + this.$route.params.month + '/')
        }
      })

    },
  }, // methods

  created() {
    HTTP.get("transaction/get-scheduled-transaction/" + this.$route.params.stid).then ( response => {
      if (response.data.success === true) {
        console.log("get scheduled transaction response")
        console.log(response.data)
        this.scheduledTransactionId = response.data.transaction.scheduledTransactionId
        this.day = response.data.transaction.dayOfMonth
        this.amount = response.data.transaction.amount
        if (response.data.transaction.payer = null) {
          this.name = response.data.transaction.payerName
          this.incomeOrExpense = "income"
        } else {
          this.name = response.data.transaction.recipientName
          this.incomeOrExpense = "expense"
        }

      }
    }) // http.get
  }, // created

  // @TODO: get the scheduled transaction in the crated hook and map it to the fileds for edit.  Also add a trash option

} // export default
</script>
