<template>
  <q-page>

    <div class="row q-pl-lg q-pb-lg q-pt-md">
      <div class="col-md-12">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Dashboard" icon="fas fa-home" to="/" />
          <q-breadcrumbs-el label="Settings" icon="settings" to="/settings"/>
          <q-breadcrumbs-el label="Accounts" icon="account_balance" to="/accounts"/>
          <q-breadcrumbs-el label="Update Account" icon="edit"/>
        </q-breadcrumbs>
      </div>
    </div>


    <div class="row justify-center q-mt-lg">
      <div class="col-xs-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">

        <q-tabs
          v-model="tab"
          class="text-teal"
        >
          <q-tab name="accountInfo" icon="info" label="Info" />
          <q-tab name="accountSecurity" icon="security" label="Security" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="accountInfo">
            <Info />
          </q-tab-panel>
          <q-tab-panel name="accountSecurity">
            <Security />
          </q-tab-panel>
        </q-tab-panels>

        <div class="col-sm-12 q-pt-lg q-pl-md">
          <q-btn class="q-mb-lg" type="button" color="primary" label="Trash Account" icon="delete" @click="trashAccount" />
        </div>

      </div>
    </div>
  </q-page>
</template>

<script>
  import { mapGetters } from 'vuex'
  import accountInfo from "./accountInfo";
  import accountSecurity from "./accountSecurity";
  import HTTP from "../../../../http-common";


  export default {

    name: 'UpdateBankAccountPage',

    components: {
      Info : accountInfo,
      Security : accountSecurity
    },

    data () {
      return {
        tab : 'accountInfo'
      }
    },

    methods: {
      trashAccount() {
        this.$q.dialog({
          title: 'Confirm',
          message: 'Are you sure you would like to trash this account?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          HTTP.get("account/trash-bank-account/" + this.$route.params.accountId)
            .then( response => {
            if (response.data.success === true) {
              this.$router.push('/accounts/')
            } else {
              this.$q.notify({
                message: 'There was a problem trashing the account',
                color: 'red',
                position: "top",
                timeout: 5000,
              })
            }
          })
          .catch((error) => {
            // handle error
            console.log(error);
            this.$q.notify({
              message: 'There was a problem trashing the account',
              color: 'red',
              position: "top",
              timeout: 5000,
            })

          })
          .then(function () {
            // always executed
          });
        }).onOk(() => {
          // console.log('>>>> second OK catcher')
        }).onCancel(() => {
          // console.log('>>>> Cancel')
        }).onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        })
      },
    },

  }
</script>
