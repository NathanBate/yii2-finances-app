<template>
    <q-input
      no-error-icon
      v-model="transactionDate"
      filled
      :rules="['date']"
      label="Date"
      @input="$emit('updateDatePicker', transactionDate)"
    >
      <template v-slot:append>
        <q-icon name="fas fa-calendar-day" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date
              v-model="transactionDate"
              :options="DateLimits" today-btn
              @input="$emit('updateDatePicker', transactionDate)"
            />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
</template>

<script>
import { date } from 'quasar'
import HTTP from "../../http-common";

export default {
  name: 'DatePicker',

  props: {
    initialDate: {
      type: [String],
      required: true,
    }
  },

  data () {
    return {
      transactionDate: this.initialDate,
    }
  }, // data

  methods: {
    DateLimits (pickerDate) {
      let year = date.formatDate(this.initialDate, "YYYY")
      let month = date.formatDate(this.initialDate, "MM")
      let day = date.formatDate(this.initialDate, "DD")
      let tempDate = new Date(year, month, day);

      // get the first day of this month
      let firstDay = new Date(tempDate.getFullYear(), tempDate.getMonth(), 1)
      firstDay = date.formatDate(firstDay, "DD")

      // get the last day of this month
      let lastDay = new Date(tempDate.getFullYear(), tempDate.getMonth() + 1, 0)
      lastDay = date.formatDate(lastDay , "DD")

      // build the date range
      let dateRangeStart = year + '/' + month + '/' + firstDay
      let dateRangeEnd = year + '/' + month + '/' + lastDay

      // return the date range to the date picker
      return pickerDate >= dateRangeStart && pickerDate <= dateRangeEnd
    },
  }, // methods
} // export default
</script>
