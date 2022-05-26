<template>
  <q-tab-panel name="scheduled">
    <div class="text-h6">Add Scheduled</div>
    <q-markup-table
      flat
      bordered
      class="q-mt-lg q-mr-lg"
    >
      <thead>
      <tr>
        <td></td>
        <td class="text-left">Day</td>
        <td class="text-left">Name</td>
        <td class="text-left">Amount</td>
        <th class="text-center">
          <q-btn
            round
            color="deep-orange"
            icon="fas fa-plus"
            type="a" :to="'/account/' + $route.params.id + '/' + $route.params.slug + '/add_scheduled_transaction/' + $route.params.year + '/' + $route.params.month + '/'"
          />
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(st, index) in scheduled" :key="'st-' + st.StId">

        <td v-if="((st.payer != null) && (payersThisMonth.hasOwnProperty(st.payer)))">
          <q-btn round disable color="green" icon="fas fa-check" size="7px"/>
        </td>
        <td v-if="((st.recipient != null) && (recipientsThisMonth.hasOwnProperty(st.recipient)))">
          <q-btn round disable color="green" icon="fas fa-check" size="7px"/>
        </td>

        <td v-if="((st.payer != null) && (! payersThisMonth.hasOwnProperty(st.payer)))">
          <q-btn round color="primary" icon="fas fa-plus" size="7px" @click="addScheduledTransaction(st.dayOfMonth, st.amount, st.payer, 'payer')" />
        </td>

        <td v-if="((st.recipient != null) && (! recipientsThisMonth.hasOwnProperty(st.recipient)))">
          <q-btn round color="primary" icon="fas fa-plus" size="7px" @click="addScheduledTransaction(st.dayOfMonth, st.amount, st.recipient, 'recipient')" />
        </td>

        <td>{{st.dayOfMonth}}</td>
        <td v-if="st.payer != null">{{st.payerName}}</td>
        <td v-else>{{st.recipientName}}</td>

        <td>{{st.amount}}</td>

        <td class="text-center">
          <q-btn
            round
            color="primary"
            size="7px"
            icon="fas fa-pencil-alt"
            type="a" :to="'/account/' + $route.params.id + '/' + $route.params.slug + '/update_scheduled_transaction/' + st.StId + '/' + $route.params.year + '/' + $route.params.month + '/'"
          />
        </td>

      </tr>
      </tbody>
    </q-markup-table>
  </q-tab-panel>
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
    HTTP.get("transaction/get-scheduled-transactions/" + this.$route.params.id + '/' + this.$route.params.statementid).then( response => {
      console.log("scheduled transactions")
      console.log(response.data)
      this.scheduled = response.data.scheduled
      this.payersThisMonth = response.data.payersThisMonth
      this.recipientsThisMonth = response.data.recipientsThisMonth
    }) // http.get
  }, // created
} // export default
</script>
