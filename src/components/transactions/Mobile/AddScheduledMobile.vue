<template>
  <div class="q-mt-lg">
    <div class="text-h5">
      Add Scheduled
    </div>

    <q-btn
      size="sm"
      color="deep-orange"
      icon="fas fa-plus"
      label="Add New Scheduled Transaction"
      type="a" :to="'/account/' + $route.params.id + '/' + $route.params.slug + '/add_scheduled_transaction/' + $route.params.year + '/' + $route.params.month + '/'"
      class="q-mb-lg q-mt-md"
    />

    <div v-for="(st, index) in scheduled" :key="'st-' + st.StId" class="q-mt-lg q-mb-lg">

      <div v-if="((st.payer != null) && (payersThisMonth.hasOwnProperty(st.payer)))">
        <q-btn round disable color="green" icon="fas fa-check" size="7px"/>
      </div>
      <div v-if="((st.recipient != null) && (recipientsThisMonth.hasOwnProperty(st.recipient)))">
        <q-btn round disable color="green" icon="fas fa-check" size="7px"/>
      </div>

      <div v-if="((st.payer != null) && (! payersThisMonth.hasOwnProperty(st.payer)))">
        <q-btn round color="primary" icon="fas fa-plus" size="7px" @click="addScheduledTransaction(st.dayOfMonth, st.amount, st.payer, 'payer')" />
      </div>

      <div v-if="((st.recipient != null) && (! recipientsThisMonth.hasOwnProperty(st.recipient)))">
        <q-btn round color="primary" icon="fas fa-plus" size="7px" @click="addScheduledTransaction(st.dayOfMonth, st.amount, st.recipient, 'recipient')" />
      </div>

      <div>
        <b>Day of the Month: </b>
        {{st.dayOfMonth}}
      </div>

      <div v-if="st.payer != null">
        <b>Payer Name: </b>
        {{st.payerName}}
      </div>

      <div v-else>
        <b>Recipient Name: </b>
        {{st.recipientName}}
      </div>


      <div>
        <b>Amount: </b>
        {{st.amount}}
      </div>


      <div>
        <q-btn
          color="primary"
          size="7px"
          icon="fas fa-pencil-alt"
          label="Edit"
          type="a" :to="'/account/' + $route.params.id + '/' + $route.params.slug + '/update_scheduled_transaction/' + st.StId + '/' + $route.params.year + '/' + $route.params.month + '/'"
        />
      </div>

    </div>
  </div>
</template>

<script>
import HTTP from "../../../http-common";

export default {
  name: 'AddScheduled',

  data () {
    return {
      scheduled : [],
      payersThisMonth: [],
      recipientsThisMonth: [],
    }
  }, // data
  methods: {
    addScheduledTransaction(day, amount, tofrom, mode) {

      let dayFormatted

      if (day > 9) {
        dayFormatted = day
      } else {
        dayFormatted = "0" + day
      }

      let monthFormatted
      if (this.$route.params.month > 9) {
        monthFormatted = this.$route.params.month
      } else {
        monthFormatted = "0" + this.$route.params.month
      }

      let payload = {
        "transactionDate": this.$route.params.year + '/' + monthFormatted + '/' + dayFormatted,
        "account": this.$route.params.id,
        "newRecipient" : "",
        "recipient": (mode == "recipient" ? tofrom : ''),
        "newPayer": "",
        "payer": (mode == "payer" ? tofrom : ''),
        "amount": amount,
        "reconciled": "N",
        "note": "Scheduled Transaction",
        "minuteOrder" : 0,
      }
      console.log("add scheduled transaction payload")
      console.log(payload)

      HTTP.post("transaction/add-transaction", payload).then(response => {
        if (response.data.success === true) {
          this.$router.push('/account/' + this.$route.params.id + '/' + this.$route.params.slug + '/' + this.$route.params.year + '/' + this.$route.params.month + '/')
        }
      }) // http.post
    }, // add scheduled transaction
  }, // methods
  created() {
    HTTP.get("transaction/get-recipients-and-payers/" + this.$route.params.id + '/' + this.$route.params.year + '/' + this.$route.params.month).then( response => {
      this.scheduled = response.data.scheduled
      this.payersThisMonth = response.data.payersThisMonth
      this.recipientsThisMonth = response.data.recipientsThisMonth
    }) // http.get
  }, // created
} // export default
</script>
