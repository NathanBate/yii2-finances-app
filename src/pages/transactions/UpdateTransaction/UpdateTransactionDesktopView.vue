<template>
  <div>
    <div class="row justify-center q-mt-lg q-ml-sm">
      <div class="col-xs-10 col-sm-10 col-md-10">

        <div class="row q-gutter-sm">
          <div class="col-sm-12">
            <div class="text-h3">{{ transaction.title }}</div>
          </div>
        </div>

        <q-form @submit="onSubmit" class="q-gutter-sm q-mt-lg">
          <div class="row q-gutter-sm">
            <div class="col-12 col-sm-12 col-md-3 col-lg-3">
              <q-input
                outlined
                label="Amount"
                filled
                v-model="transaction.amount"
                type="text"
                prefix="$"
                class="q-mb-lg"
              />
            </div>

            <div class="col-12 col-sm-12 col-md-3 col-lg-3" v-if="transaction.transactionDate != ''">
              <DatePicker
                @updateDatePicker="(value) => { transaction.transactionDate = value }"
                :initialDate="transaction.transactionDate"
              />
            </div>

            <div class="col-12 col-sm-12 col-md-3 col-lg-3">
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
            </div>

          </div>

          <div class="row">
            <div class="col-shrink" v-if="budgetAttached" >
              <CategoryPicker
                mode="Update"
                :category-type="categoryType"
                @categoryChosen="(value) => { selectedCategory = value }"
                class="q-ml-sm q-mb-lg"
              />
            </div>
          </div>

          <div class="row q-gutter-sm">
            <div class="col-12 col-sm-12 col-md-10">
              <q-input
                outlined
                no-error-icon
                label="Note"
                v-model="transaction.note"
              />
            </div>
          </div>

          <div class="row q-gutter-sm">
            <div class="col-sm-12">
              <q-toggle
                v-model="transaction.reconciled"
                label="Reconciled?"
                color="green"
              />
            </div>
          </div>

          <div class="row q-gutter-sm">
            <div class="col-sm-12">
              <q-btn class="q-mb-lg" type="submit" color="primary" label="Save" />
            </div>
          </div>

          <div class="row q-gutter-sm">
            <div class="col-sm-12">
              <q-btn class="q-mb-lg" type="button" color="primary" label="Delete" icon="delete" @click="deleteTransaction" />
            </div>
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "../../../components/ui/DatePicker";
import HTTP from "../../../http-common";
import CategoryPicker from "../../../pages/transactions/transactionCategory"

export default {
  name: 'UpdateTransactionDesktopView',

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
