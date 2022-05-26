<template>
  <q-header elevated>
    <q-toolbar>
      <q-avatar square>
        <img src="statics/icons/favicon-128x128.png">
      </q-avatar>

      <!-- Don't show the app name if we are in mobile -->
      <q-toolbar-title v-if="$q.platform.is.mobile">
        <!--{{ appName }}-->
      </q-toolbar-title>
      <q-toolbar-title v-else>
        {{ appName }}
      </q-toolbar-title>

      <!-- quick access dropdown menu -->
      <q-btn-dropdown stretch flat label="Quick Access">
        <q-list>
          <q-item-label header>Accounts</q-item-label>
          <q-item v-for="account in accounts" :key="`x.${account['id']}`" clickable v-close-popup tabindex="0" :to="'/account/' + account['accountId'] + '/' + account['slug'] + '/' + accountDefaultDate">
            <q-item-section avatar>
              <q-avatar icon="account_balance" color="secondary" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ account['accountName'] }}</q-item-label>
              <q-item-label caption>Balance: </q-item-label>
            </q-item-section>
            <q-item-section side>
              <!--<q-icon name="settings" />-->
            </q-item-section>
          </q-item>
          <q-separator inset spaced />
          <q-item-label header>Statements</q-item-label>
          <!--<q-item v-for="n in 3" :key="`y.${n}`" clickable v-close-popup tabindex="0">
            <q-item-section avatar>
              <q-avatar icon="assignment" color="primary" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Vacation</q-item-label>
              <q-item-label caption>February 22, 2016</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="info" />
            </q-item-section>
          </q-item>-->
          <q-item-label header>Budget</q-item-label>
        </q-list>
      </q-btn-dropdown>
      <q-btn flat round dense icon="person" clickable tag="a" to="/viewprofile/" />
      <q-btn flat round dense icon="settings" clickable tag="a" to="/settings/" />
    </q-toolbar>
  </q-header>
</template>

<script>
import { mapGetters } from 'vuex'
import {Loading} from "quasar";
import { date } from 'quasar'
import HTTP from "../../http-common";

export default {
  name: 'TitleBar',

  data () {
    return {
      appName: process.env.APP_NAME,
      accountDefaultDate : '',
    }
  },

  computed: {
    ...mapGetters({
      "user" : "access/getUser",
      "accounts" : "accounts/getAccounts",
    })
  },

  methods: {
    logout() {
      this.$store.commit("access/logout")
    },
    getAccounts() {
      Loading.show()
      this.$store.dispatch("accounts/getAccounts")
        .then( LoadAccountsResponse => {
          Loading.hide()
        })
        .catch((error) => {
          // handle error
          console.log(error);
          Loading.hide();
          this.tryagain()
        })
        .then(function () {
          // always executed
        });
    },
    tryagain() {
      this.$q.dialog({
        title: 'Retry?',
        message: 'There was a problem communicating with the server.  Would you like to retry?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.getAccounts()
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
  },

  created() {

    this.getAccounts()

    // Get he current year and month and make that the default month to load accounts with
    let currentDate = new Date()
    let currentYear = date.formatDate(currentDate, 'YYYY')
    let currentMonth = date.formatDate(currentDate, 'MM')

    if (currentMonth < 10) {
      currentMonth = date.formatDate(currentDate, 'M')
    }
    this.accountDefaultDate = currentYear + '/' + currentMonth + '/'

  },
}
</script>
