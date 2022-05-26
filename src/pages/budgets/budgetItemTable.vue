<template>
  <q-markup-table class="q-mt-sm">
    <thead class="bg-grey-2">
    <tr>
      <th colspan="2" class="text-left">
        <div class="text-h5" v-if="itemType=='I'">Income</div>
        <div class="text-h5" v-if="itemType=='E'">Expenses</div>
      </th>
    </tr>
    <tr>
      <th class="text-left">Category</th>
      <th class="text-left">Amount</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in items" :key="'budget-items-list-item-id-'+item.id">
      <td>{{ item.categoryName }}</td>
      <td>
        <router-link
          style="text-decoration: none;
          color:black;"
          :to="'/budgets/' + $route.params.id + '/update-budget-item/' + item.budgetItemId + '/'"
          v-if="updatable"
        >
          ${{ item.amount }}
        </router-link>
        <div v-else>
          ${{ item.amount }}
        </div>
      </td>
    </tr>
    <tr class="bg-grey-2">
      <td></td>
      <td class="text-left text-bold">${{ total }}</td>
    </tr>
    </tbody>
  </q-markup-table>
</template>

<script>

export default {
  name: "BudgetItemTable",
  props: {
    items: {
      type: [Array],
      required: true,
    },
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
    total: {
      type: [Number],
      required: true,
    },
    updatable: {
      type: [Boolean],
      required: false,
      default: false,
    }
  },
}
</script>
