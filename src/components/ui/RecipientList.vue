<template>
      <q-input
        v-if="bManualPaidTo"
        outlined
        label="Paid To / Received From"
        v-model="newRecipient"
        @keyup="updateNewRecipient()"
        ref="input"
        no-error-icon
        :rules="[val => !!val || 'Field is required']"
      >
        <template v-slot:after>
          <q-btn round dense flat icon="fas fa-hand-point-left" @click="bManualPaidTo=false" />
        </template>
      </q-input>

      <q-select
        v-else
        filled
        v-model="expenseSearch"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        label="Paid To"
        :rules="[val => !!val || 'Field is required']"
        no-error-icon
        :options="recipientOptions"
        clearable
        emit-value
        map-options
        @filter="recipientFilterFn"
        @input="updateRecipient()"
      >
        <template v-slot:after>
          <q-btn round dense flat icon="fas fa-plus" @click="bManualPaidTo=true" />
        </template>

        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>

        <template v-slot:option="scope">
          <q-item
            v-bind="scope.itemProps"
            v-on="scope.itemEvents"
            clickable
          >
            <q-item-section>{{ scope.opt.label }}</q-item-section>
          </q-item>
        </template>

      </q-select>
</template>
<script>
import HTTP from "../../http-common";

export default {
  name: 'RecipientList',

  data () {
    return {
      bManualPaidTo : false,
      newRecipient: "",
      expenseSearch: "",
      recipients : [],
      recipientOptions: this.recipients,
    }
  }, // data
  methods: {
    recipientFilterFn(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.recipientOptions = this.recipients.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },

    updateNewRecipient() {
      this.$emit('updateNewRecipient', this.newRecipient)
    },

    updateRecipient() {
      this.$emit("updateRecipient", this.expenseSearch)
    },
  },
  created() {
    HTTP.get("transaction/get-recipients/" + this.$route.params.id).then( response => {
      console.log("recipients")
      console.log(response.data)
      this.recipients = response.data
    }) // http get
  }, // created hook
} // export default
</script>
