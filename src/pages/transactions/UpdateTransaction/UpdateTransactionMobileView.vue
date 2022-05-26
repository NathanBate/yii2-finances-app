<template>
  <div class="q-ma-sm">
      <div class="text-h3">{{ transaction.title }}</div>

      <q-form @submit="onSubmit" class="q-gutter-sm q-mt-lg">
          <q-input
            outlined
            label="Amount"
            filled
            v-model="transaction.amount"
            type="text"
            prefix="$"
            class="q-mb-lg"
          />

          <CategoryPicker
            mode="Update"
            :category-type="categoryType"
            @categoryChosen="(value) => { selectedCategory = value }"
            class="q-mb-sm"
          />


        <div v-if="transaction.transactionDate != ''">
          <DatePicker
            @updateDatePicker="(value) => { transaction.transactionDate = value }"
            :initialDate="transaction.transactionDate"
          />
        </div>

        <q-input
          outlined
          label="Order"
          filled
          v-model="transaction.minuteOrder"
          min="0"
          max="31"
          type="number"
          class="q-mb-lg"
        />

        <q-input
          outlined
          no-error-icon
          label="Note"
          v-model="transaction.note"
        />

        <div class="q-mb-lg">
          <q-toggle
            v-model="transaction.reconciled"
            label="Reconciled?"
            color="green"
          />
        </div>

        <div>
          <q-btn class="q-mb-lg" type="submit" color="primary" label="Save" />
        </div>

        <br/><br/>

        <div>
          <q-btn class="q-mb-lg" type="button" color="primary" label="Delete" icon="delete" @click="deleteTransaction" />
        </div>

      </q-form>
    </div>
</template>

<script>
import DatePicker from "../../../components/ui/DatePicker";
import HTTP from "../../../http-common";
import CategoryPicker from "../../../pages/transactions/transactionCategory"

export default {
  name: 'UpdateTransactionMobileView',

  components: {
    DatePicker : DatePicker,
    CategoryPicker : CategoryPicker,
  },

  props: {
    transaction: {
      type: [Object],
      required: true,
    },
    transactionYear: {
      type: [String],
      required: true,
    },
    transactionMonth: {
      type: [String],
      required: true,
    },
    categoryType: {
      validator: function (value) {
        if (value == 'I') {
          return true
        }
        if (value == 'E') {
          return true
        }
        return false;
      }
    },
    budgetAttached: {
      type: [Boolean],
      default: false,
    },
  },

  data() {
    return {
      selectedCategory: "",
    }
  },

  methods: {
    onSubmit () {
      let payload = {
        "id" : this.transaction.transactionId,
        "amount" : this.transaction.amount,
        "transactionDate" : this.transaction.transactionDate,
        "note" : this.transaction.note,
        "reconciled" : (this.transaction.reconciled ? "Y" : 'N'),
        "minuteOrder" : (this.transaction.minuteOrder != '' ? this.transaction.minuteOrder : 0),
      }

      if (this.budgetAttached) {
        if (this.selectedCategory !== null) {
          payload["category"] = this.selectedCategory.value
        }
      }

      console.log("sending this payload to update transaction")
      console.log(payload)

      HTTP.post("transaction/update",payload).then( response => {
        if (response.data.success === true) {
          this.$router.push('/account/' + this.$route.params.id + '/' + this.$route.params.slug + '/' + this.transactionYear + '/' + this.transactionMonth + '/')
        }
      })

    },   // on submit

    deleteTransaction() {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure you would like to delete this transaction?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        HTTP.get("transaction/delete/" + this.transaction.transactionId).then( response => {
          if (response.data.success === true) {
            this.$router.push('/account/' + this.transaction.account + '/' + this.$route.params.slug + '/' + this.transactionYear + '/' + this.transactionMonth + '/')
          }
        })
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
  },

  created() {
    console.log("transaction")
    console.log(JSON.stringify(this.transaction))
  },
}
</script>
