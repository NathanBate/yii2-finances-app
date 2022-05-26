<template>
  <q-page>
    <BreadCrumbs :crumbs="crumbs"/>

    <div class="row justify-center q-mt-lg">
      <div class="col-xs-10 col-sm-8 col-md-6 col-lg-6 col-xl-5">
        <q-form @submit="addBudget" class="q-gutter-md q-mt-lg">

          <q-input
            outlined
            label="Budget Name"
            v-model="budgetName"
            ref="input"
            no-error-icon
            :rules="[val => !!val || 'Field is required']"
          />

          <q-btn type="submit" icon="fas fa-plus" color="primary" label="Create" />

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
    name: 'AddBudget',

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
      ...mapGetters({
        "accounts" : "accounts/getAccounts",
      }),
    }, // computed

    methods: {
      addBudget() {
        let payload = {
          "name" : this.budgetName,
        }
        console.log(payload)
        HTTP.post("budget/add",payload)
          .then( response => {
            if (response.data.success === true) {
              this.$router.push('/budgets/')
            }
          })
          .catch((error) => {
            // handle error
            console.log(error);
            this.$q.notify({
              message: 'There was a problem adding the budget',
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
