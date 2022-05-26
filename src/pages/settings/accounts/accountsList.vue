<template>
  <q-page>

    <div class="row q-pl-lg q-pb-lg q-pt-md">
      <div class="col-md-12">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Dashboard" icon="fas fa-home" to="/" />
          <q-breadcrumbs-el label="Settings" icon="settings" to="/settings"/>
          <q-breadcrumbs-el label="Accounts" icon="account_balance"/>
        </q-breadcrumbs>
      </div>
    </div>

    <div class="row justify-center q-mt-lg">
      <div class="col-xs-10 col-sm-8 col-md-6 col-lg-6 col-xl-5">
        <q-toolbar class="bg-primary text-white shadow-2">
          <q-toolbar-title>Bank Accounts</q-toolbar-title>
          <q-btn flat round dense icon="add" to="/accounts/add/" />
        </q-toolbar>
        <q-list bordered separator>
          <q-item v-for="account in accounts"  :key="account.id">
            <q-item-section>
              <q-item-label>{{ account.accountName }}</q-item-label>
              <q-item-label caption>
                <span>{{ account.bankName }}</span>
                <span v-if="account.accountNumber != null"> - {{ account.accountNumber }}</span>
              </q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-btn size="xs" round color="primary" icon="edit" :to="'/settings/accounts/updateaccount/' + account.accountId + '/'" />
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
        "accounts" : "accounts/getAccounts",
      })
    },

    created() {
      Loading.show()
      this.$store.dispatch("accounts/getAccounts").then( LoadAccountsResponse => {
        Loading.hide()
      })
    },
    mounted() {
    }

  }
</script>
