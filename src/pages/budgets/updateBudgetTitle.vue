<template>
  <q-page>
    <BreadCrumbs :crumbs="crumbs"/>

    <div class="row justify-center q-mt-lg">
      <div class="col-xs-10 col-sm-8 col-md-6 col-lg-6 col-xl-5">
        <q-form @submit="updateBudgetTitle" class="q-gutter-md q-mt-lg">

          <q-input
            outlined
            label="Budget Name"
            v-model="budgetName"
            ref="input"
            no-error-icon
            :rules="[val => !!val || 'Field is required']"
          />

          <q-btn type="submit" color="primary" label="Save" />

        </q-form>
      </div>
    </div>

  </q-page>
</template>

<script>
  import { mapGetters } from 'vuex'
  import BreadCrumbs from "../../components/ui/BreadCrumbs";
  import HTTP from "../../http-common";

  export default {
    name: 'Update Budget Title',

    components: {
      BreadCrumbs : BreadCrumbs,
    }, // components

    data () {
      return {
        budgetName: "",
      }
    }, // data

    computed: {
      crumbs() {
        return [
          {
            icon: 'view_list',
            label: "Budgeting",
            to: '/budgets/'
          },
          {
            icon: 'add',
            label: 'Create Budget',
            to: '',
          }
        ];
      },
    }, // computed

    methods: {
      updateBudgetTitle() {
        let payload = {
          "name" : this.budgetName,
          "id" : this.$route.params.id,
        }
        console.log(payload)
        HTTP.post("budget/update-title",payload)
          .then( response => {
            if (response.data.success === true) {
              this.$router.push('/budgets/')
            }
          })
          .catch((error) => {
            // handle error
            console.log(error);
            this.$q.notify({
              message: 'There was a problem updating the budget title',
              color: 'red',
              position: "top",
              timeout: 5000,
            })

          })
          .then(function () {
            // always executed
          });
      },

      getBudget() {
        HTTP.get("budget/get-budget/" + this.$route.params.id)
          .then( response => {

            console.log("Budget from API")
            console.log(response.data)

            if (response.data.success === true) {
              this.budgetName = response.data.budget.name
            }
          })
          .catch((error) => {
            // handle error
            console.log(error);
            this.$q.notify({
              message: 'There was a problem getting the budget info',
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

    created() {
      this.getBudget()
    },
  } // export default
</script>
