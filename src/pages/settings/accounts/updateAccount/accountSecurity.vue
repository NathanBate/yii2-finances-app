<template>
  <q-form>
    <div class="row items-start content-start q-col-gutter-x-sm q-col-gutter-y-sm q-pt-lg">

      <div class="col-12">
        <q-toolbar class="bg-primary text-white shadow-2">
          <q-toolbar-title>Account Users</q-toolbar-title>
          <!-- <q-btn flat round dense icon="add" to="/accounts/add/" /> -->
        </q-toolbar>
        <q-list bordered separator>
          <q-item v-for="accountUser in accountUsers"  :key="'account-users-' + accountUser.accountUserId">
            <q-item-section>
              <q-item-label>{{ accountUser.firstName }} {{ accountUser.lastName }}</q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-btn size="xs" round color="primary" icon="fas fa-times" @click="removeUser(accountUser.accountUserId)" />
            </q-item-section>
          </q-item>

          <!-- All users who are not already given permission to the account -->
          <q-item v-for="user in allUsers"  :key="'all-users-' + user.id" v-if="! accountUsers.hasOwnProperty(user.id)" >
            <q-item-section>
              <q-item-label>{{ user.firstName }} {{ user.lastName }}</q-item-label>
              <q-item-label caption>
                <span><!-- Subtitle --></span>
              </q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-btn size="xs" round color="primary" icon="add" @click="addUser(user.id)" />
            </q-item-section>
          </q-item>

        </q-list>
      </div>


    </div>
  </q-form>

</template>

<script>
import { mapGetters } from 'vuex'
import { Loading } from 'quasar'
import HTTP from "../../../../http-common"


export default {

  name: 'AccountSecurityTab',

  data () {
    return {
      accountUsers: [],
      allUsers: [],
    }
  },

  computed: {
    ...mapGetters({
      "accounts" : "accounts/getAccounts",
      "user" : "access/getUser"
    })
  },

  methods: {

    addUser(userId=-1) {

      HTTP.get("account/add-bank-account-user/" + this.$route.params.accountId + '/' + userId)
        .then( response => {
          this.$router.push("/accounts/")
        })
        .catch((error) => {
          // handle error
          console.log(error);
          this.$q.notify({
            message: 'There was a problem adding the user',
            color: 'red',
            position: "top",
            timeout: 5000,
          })

        })
        .then(function () {
          // always executed
        });
    },

    removeUser(accountUserId=-1) {

      HTTP.get("account/remove-bank-account-user/" + accountUserId)
        .then( response => {
          this.$router.push("/accounts/")
        })
        .catch((error) => {
          // handle error
          console.log(error);
          this.$q.notify({
            message: 'There was a problem removing the user',
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

  mounted() {
    HTTP.get("account/get-account-users/" + this.$route.params.accountId)
    .then( response => {
      console.log("Account Users")
      console.log(response.data)
      this.accountUsers = response.data.accountUsers
      this.allUsers = response.data.allUsers
    })
    .catch((error) => {
      // handle error
      console.log(error);
      this.$q.notify({
        message: 'There was a problem loading the account users',
        color: 'red',
        position: "top",
        timeout: 5000,
      })

    })
    .then(function () {
      // always executed
    });
  }

}
</script>
