<template>
  <div class="col-12 q-pt-lg">
    <q-card>

      <div class="row bg-grey-2 q-pa-md">
        Category Transaction Report
      </div>

      <div class="row" v-for="t in transactions">

        <!--------------------------------- Desktop View -------------------------------------->
        <div class="xs-hide sm-hide col-12">
          <div class="row q-pa-md">
            <div class="col-3">{{ t.transactionDateFormatted }}</div>
            <div class="col-7">{{ t.recipientName }}{{ t.payerName }}</div>
            <div class="col-2">${{ t.amount }}</div>
            <div class="col-12 q-mt-md q-pa-sm">Note: {{ t.note }}</div>
          </div>
          <div class="col-12"><q-separator/></div>
        </div>

        <!--------------------------------- Mobile View -------------------------------------->
        <div class="col-12 md-hide lg-hide xl-hide">
          <div class="row q-pa-md">
            <div class="col-12 q-pb-sm">{{ t.transactionDateFormatted }}</div>
            <div class="col-12 q-pb-sm">{{ t.recipientName }}{{ t.payerName }}</div>
            <div class="col-12 q-pb-sm">${{ t.amount }}</div>
            <div class="col-12 q-mt-md q-py-sm">
              <div>Note:</div>
              <div>{{ t.note }}</div>
            </div>
          </div>
          <div class="col-12"><q-separator/></div>
        </div>

      </div>

    </q-card>
  </div>
</template>

<script>

export default {
  name: "categoryTransactionReport",

  props: {
    transactions: {
      required: true,
      type: [Array],
    }
  }
}

</script>
