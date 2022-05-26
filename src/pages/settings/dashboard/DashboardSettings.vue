<template>
  <q-page>

    <div class="row q-pl-lg q-pb-lg q-pt-md">
      <div class="col-md-12">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Dashboard" icon="fas fa-home" to="/" />
          <q-breadcrumbs-el label="Settings" icon="settings" to="/settings"/>
          <q-breadcrumbs-el label="Dashboard Settings" icon="dashboard"/>
        </q-breadcrumbs>
      </div>
    </div>

    <div class="row justify-center q-mt-lg">
      <div class="col-xs-10 col-sm-8 col-md-6 col-lg-6 col-xl-5">
        <q-toolbar class="bg-primary text-white shadow-2">
          <q-toolbar-title>Dashboard Items</q-toolbar-title>
          <q-btn flat round dense icon="add" to="/accounts/add/" />
        </q-toolbar>
        <q-list bordered separator>
          <q-item v-for="item in dashboardItems"  :key="dashboard.id">
            <q-item-section>
              <q-item-label></q-item-label>
              <q-item-label caption>
                <span></span>
                <span></span>
              </q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-btn size="xs" round color="primary" icon="edit" :to="'/settings/dashboard/removeitem/' + item.id + '/'" />
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

  export default {

    name: 'UsersPage',

    data () {
      return {
      }
    },

    computed: {
      ...mapGetters({
        "dashboardItems" : "dashboard/getDashboardItems",
      })
    },

    created() {
      // Loading.show()
      // this.$store.dispatch("accounts/getAccounts").then( LoadAccountsResponse => {
      //  Loading.hide()
      // })
    },
    mounted() {
    }

  }
</script>
