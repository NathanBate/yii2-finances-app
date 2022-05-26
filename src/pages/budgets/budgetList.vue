<template>
  <q-page>

    <div class="row q-pl-lg q-pb-lg q-pt-md">
      <div class="col-md-12">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Dashboard" icon="fas fa-home" to="/" />
          <q-breadcrumbs-el label="Settings" icon="settings" to="/settings"/>
          <q-breadcrumbs-el label="Budgeting" icon="view_list"/>
        </q-breadcrumbs>
      </div>
    </div>

    <div class="row justify-center q-mt-lg">
      <div class="col-xs-10 col-sm-8 col-md-6 col-lg-6 col-xl-5">
        <q-toolbar class="bg-primary text-white shadow-2">
          <q-toolbar-title>Budgets</q-toolbar-title>
          <q-btn flat round dense icon="add" to="/budgets/add/" />
        </q-toolbar>
        <q-list bordered separator>
          <q-item v-for="budget in budgets" :key="budget.id">
            <q-item-section>
              <q-item-label>{{ budget.name }}</q-item-label>
              <q-item-label caption>
                <!--
                <span></span>
                <span></span>
                -->
              </q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-btn size="xs" round color="primary" icon="edit" :to="'/budgets/update/' + budget.id + '/'"/>
            </q-item-section>
          </q-item>
        </q-list>

      </div>
    </div>

  </q-page>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Loading } from 'quasar'
  import HTTP from "../../http-common"

  export default {

    name: 'BudgetList',

    data () {
      return {
        budgets: []
      }
    },

    computed: {
      ...mapGetters({
        "accounts" : "accounts/getAccounts",
      })
    },

    methods: {
      getBudgets() {

        HTTP.get("budgets")
          .then( response => {
            console.log("Budget List Response")
            console.log(response.data)

            if (response.data.hasOwnProperty("success")) {
              this.budgets = response.data.budgets
            }

          })
          .catch((error) => {
            // handle error
            console.log(error);
            this.$q.notify({
              message: 'There was a problem getting the budgets',
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
      this.getBudgets()
    },

  }
</script>
