<template>
  <div>
    <q-form @submit="addBudgetCategory" class="q-gutter-md q-mt-lg">

      <h6 class="q-mb-sm" v-if="categoryType == 'I'">Add Income Category</h6>
      <h6 class="q-mb-sm" v-if="categoryType == 'E'">Add Expense Category</h6>

      <q-input
        outlined
        label="Category Name"
        v-model="budgetCategoryName"
        ref="input"
        no-error-icon
        :rules="[val => !!val || 'Field is required']"
        class="q-mb-none"
      />

      <q-btn type="submit" color="primary" label="Add" class="q-mt-none" />

    </q-form>
  </div>
</template>

<script>
  import HTTP from "../../http-common";

  export default {
    name: 'AddEditCategory',

    props: {
      categoryType: {
        validator: function(value) {
          if (value == 'I') { return true }
          if (value == 'E') { return true}
          return false;
        }
      },
      Add: {
        type: [Boolean],
        required: true,
      }
    },

    data () {
      return {
        budgetCategoryName : "",
      }
    }, // data

    methods: {

      addBudgetCategory() {
        let payload = {
          "name" : this.budgetCategoryName,
          "type" : this.categoryType
        }
        console.log(payload)
        HTTP.post("budget/add-budget-category",payload)
          .then( response => {
            if (response.data.success === true) {
              this.$router.push('/budgets/')
            }
          })
          .catch((error) => {
            // handle error
            console.log(error);
            this.$q.notify({
              message: 'There was a problem adding the category',
              color: 'red',
              position: "top",
              timeout: 5000,
            })

          })
          .then(function () {
            // always executed
          });
      },

    },

  } // export default
</script>
