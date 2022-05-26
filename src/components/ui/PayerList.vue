<template>
  <q-input
    v-if="bManualPaidTo"
    outlined
    label="Received From"
    v-model="newPayer"
    @keyup="$emit('updateNewPayer', newPayer)"
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
    v-model="incomeSearch"
    use-input
    hide-selected
    fill-input
    input-debounce="0"
    label="Payer"
    :rules="[val => !!val || 'Field is required']"
    no-error-icon
    :options="payerOptions"
    clearable
    emit-value
    map-options
    @filter="payerFilterFn"
    @input="$emit('updatePayer', incomeSearch)"
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
import { date } from 'quasar'
import HTTP from "../../http-common";

export default {
  name: 'PayerList',

  data () {
    return {
      bManualPaidTo : false,
      newPayer : "",
      incomeSearch: "",
      payerOptions : this.payers,
    }
  }, // data

  methods: {
    payerFilterFn (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.payerOptions = this.payers.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },
    updateNewPayer() {
      this.$emit('updateNewPayer', this.newPayer)
    },
  }, // methods
  created() {
    HTTP.get("transaction/get-payers/" + this.$route.params.id).then( response => {
      console.log("payers")
      console.log(response.data)
      this.payerOptions = this.payers = response.data
    }) // http.get
  }, // created
} // export default
</script>
