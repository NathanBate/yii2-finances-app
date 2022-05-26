<template>
  <q-page>
    <BreadCrumbs :crumbs="crumbs"/>

    <div class="row justify-center q-mt-none q-pt-none">
      <div class="col-xs-10 col-sm-8 col-md-6 col-lg-6 col-xl-5">
        <div class="text-h5 q-mb-lg">{{ categoryName }}</div>
        <q-form @submit="updateBudgetItem">
          <q-input
            type="text"
            label="Amount"
            v-model="amount"
            filled
            style="width:200px;"
            :rules="[val => !!val || 'Field is required']"
          />
          <div class="row">
            <div class="col-shrink">
              <q-btn type="submit" label="Save" class="q-mr-lg" />
            </div>
            <div class="col-shrink">
              <q-btn label="Delete" @click="deleteBudgetItem" />
            </div>
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
import HTTP from "../../http-common"
import BreadCrumbs from "../../components/ui/BreadCrumbs";

export default {
  name: 'UpdateBudgetItem',
  components: {
    BreadCrumbs : BreadCrumbs,
  },
  data() {
    return {
      itemId : "",
      categoryName : "",
      amount : "",
    }
  },
  computed: {
    crumbs() {
      return [
        {
          icon: 'view_list',
          label: "Budgeting",
          to: '/budgets/'
        },
        {
          icon: 'edit',
          label: 'Update Budget Item',
          to: '',
        }
      ];
    },
  },
  methods: {
    updateBudgetItem() {
      let payload = {
        "budgetItemId" : this.$route.params.budgetitemid,
        "amount" : this.amount
      }
      HTTP.post("budget/update-budget-item", payload)
        .then((response)=>{
          if (response.data.success) {
            this.$router.push("/budgets/update/" + this.$route.params.budgetid + "/")
          }
        })
        .catch((error) => {
          // handle error
          console.log(error);
          this.$q.notify({
            message: 'There was a problem updating the budget item',
            color: 'red',
            position: "top",
            timeout: 5000,
          })

        })
        .then(function () {
          // always executed
        });
    },
    deleteBudgetItem() {

      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure you would like to delete this budget item?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        HTTP.get("budget/delete-budget-item/" + this.$route.params.budgetitemid)
          .then((response)=>{
            if (response.data.success) {
              this.$router.push("/budgets/update/" + this.$route.params.budgetid + "/")
            }
          }) // then
          .catch((error) => {
            // handle error
            console.log(error);
            this.$q.notify({
              message: 'There was a problem deleting the budget item',
              color: 'red',
              position: "top",
              timeout: 5000,
            })
          }) // catch
          .then(function () {
            // always executed
          }); // then always
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })

    }, // deleteBudgetItem
  }, // methods
  created() {
    HTTP.get("budget/get-budget-item/" + this.$route.params.budgetitemid)
      .then((response) =>{
        if (response.data.success) {
          this.itemId = response.data.budgetItem.budgetItemId
          this.categoryName = response.data.budgetItem.categoryName
          this.amount = response.data.budgetItem.amount
        }
      })
      .catch((error) => {
        // handle error
        console.log(error);
        this.$q.notify({
          message: 'There was a problem getting the budget item',
          color: 'red',
          position: "top",
          timeout: 5000,
        })

      })
      .then(function () {
        // always executed
      });
  },
}
</script>
