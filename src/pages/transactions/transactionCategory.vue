<template>
  <div>
    <q-select

      :style="(! $q.platform.is.mobile) ? 'width:300px;' : '' "
      label="Category"
      v-model="selectedCategory"
      :options="budgetItems"
      clearable
      filled
      no-error-icon
      :rules="[val => !!val || 'Field is required']"
      @input="$emit('categoryChosen',selectedCategory)"
    />

  </div>
</template>

<script>

import HTTP from "../../http-common";
import {date} from "quasar";

export default {
  name: "TransactionCategoryPicker",
  props: {
    mode: {
      validator: function(value) {
        if (value == 'Add') { return true }
        if (value == 'Update') { return true}
        return false;
      }
    },
    categoryType: {
      validator: function(value) {
        if (value == 'I') { return true }
        if (value == 'E') { return true}
        return false;
      }
    },
  },
  data() {
    return {
      selectedCategory: "",
      selectedId : -1,
      budgetItems : [],
      transactionId : this.$route.params.transactionid,
    }
  },
  calculated: {

  },
  methods: {
    findSelected() {
      console.log("got to find selected method.  the selected Id")
      this.budgetItems.forEach(option =>{
        console.log("The current option value is")
        console.log(option)
        //console.log("the selected id is")
        //console.log(this.selectedId)
        if (Number(option.value) === Number(this.selectedId)) {
          console.log("got to found option for selected")
          console.log(option)
          this.selectedCategory = option
        }
      })
    }, // findSelected

    getBudgetInfo() {
      HTTP.get("budget/get-budget-info-by-statement-id/" + this.$route.params.statementid)
        .then( response =>{
          if (response.data.success) {
            if (this.categoryType === 'I') {
              this.budgetItems = response.data.incomeBudgetItems
            } else {
              this.budgetItems = response.data.expenseBudgetItems
            }

            if (this.mode === "Update") {
              this.getTransactionInfo()
            }

          }
        })
        .catch((error) => {
          // handle error
          console.log(error);
          this.$q.notify({
            message: 'There was a problem getting the budget information',
            color: 'red',
            position: "top",
            timeout: 5000,
          })

        })
        .then(function () {
          // always executed
        });
    }, // getBudgetInfo

    getTransactionInfo() {
      HTTP.get("transaction/view/" + this.$route.params.transactionid)
        .then( response => {
          if (response.data.success === true) {
            this.selectedId = Number(response.data.transaction.category)
            this.findSelected()
          }
        })
        .catch((error) => {
          // handle error
          console.log(error);
          this.$q.notify({
            message: 'There was a problem getting the transaction',
            color: 'red',
            position: "top",
            timeout: 5000,
          })

        })
        .then(function () {
          // always executed
        });
    },

  }, // methods

  created() {
    this.getBudgetInfo()
  }

}

</script>
