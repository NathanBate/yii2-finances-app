<template>
  <div>
    <q-card bordered class="bg-grey-2 my-card">
      <q-card-section>
        <div class="text-h6 q-pl-sm q-pb-none" v-if="itemType=='I'">Add Income Budget Item</div>
        <div class="text-h6 q-pl-sm q-pb-none" v-else="itemType=='I'">Add Expense Budget Item</div>
        <!--<div class="text-subtitle2">by John Doe</div>-->
      </q-card-section>

      <q-card-section>
        <q-form @submit="addBudgetItem">
          <div class="row">
            <div class="col-6 q-px-sm">
              <q-select
                filled
                color="white"
                dense
                bg-color="white"
                v-model="category"
                :label="itemType == 'I' ? 'Income Category' : 'Expense Category'"
                :options="unusedCategories"
                clearable
                no-error-icon
                :rules="[val => !!val || 'Required!']"
              >
              </q-select>
            </div>

            <div class="col-6 q-px-sm">
              <q-input
                v-model="amount"
                label-color="white"
                bg-color="white"
                label="Amount"
                dense
                filled
                no-error-icon
                :rules="[val => !!val || 'Required!']"
              ></q-input>
            </div>
          </div>

          <div class="row q-mt-sm">
            <div class="col-shrink q-px-sm">
              <q-btn class="q-mr-md" type="submit">
                Add
              </q-btn>
              <q-btn class="q-mr-md" @click="$emit('showAddBudgetItem', false); category=''; amount=''">
                Cancel
              </q-btn>
              <q-btn class="q-mr-md" @click="showAddCategoryBox=true">
                Add Category
              </q-btn>
            </div>
          </div>
        </q-form>

        <div class="row">
          <div class="col-12">
            <AddEditCategory v-show="showAddCategoryBox" :Add="true" :categoryType="itemType" />
          </div>
        </div>

      </q-card-section>
    </q-card>

  </div>

</template>

<script>
import HTTP from "../../http-common";
import AddEditCategory from "./addEditCategory";

export default {
  name: "AddBudgetItem",

  components: {
    AddEditCategory : AddEditCategory,
  },

  props: {
    itemType: {
      validator: function(value) {
        if (value == 'I') {
          return true
        }
        if (value == 'E') {
          return true
        }
        return false;
      }
    },
    categories : {
      type: [Array],
      default: []
    },
    budget: {
      type: [Number],
      required: true,
    },
    currentlyUsedCategories: {
      type: [Object],
      required: true,
    }
  },

  data() {
    return {
      category : "",
      amount : "",
      showAddCategoryBox : false,
    }
  },

  computed: {
    unusedCategories: function() {
      let filteredCategories = []
      let index = 0;
      this.categories.forEach((category) => {
        if (!this.currentlyUsedCategories.hasOwnProperty(category.value)) {
          console.log("category")
          console.log(category)
          filteredCategories[index] = category
          index++
        }
      })
      console.log("filtered categories")
      console.log(filteredCategories)
      return filteredCategories
    },
  },

  methods: {
    addBudgetItem() {
      let payload = {
        "categoryId" : this.category.value,
        "categoryName" : this.category.label,
        "amount" : this.amount,
        "budget" : this.budget,
        "budgetItemId" : this.budget,
      }
      HTTP.post("budget/add-budget-item",payload)
        .then( response => {
          if (response.data.success === true) {
            this.$emit("newBudgetItem", response.data.budgetItem)
            this.category = ""
            this.amount = ""
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
    }
  },
}
</script>

