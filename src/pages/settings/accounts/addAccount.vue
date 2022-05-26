<template>
  <q-page>

    <div class="row q-pl-lg q-pb-lg q-pt-md">
      <div class="col-md-12">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Dashboard" icon="fas fa-home" to="/" />
          <q-breadcrumbs-el label="Settings" icon="settings" to="/settings"/>
          <q-breadcrumbs-el label="Accounts" icon="account_balance" to="/accounts"/>
          <q-breadcrumbs-el label="Add Account" icon="add"/>
        </q-breadcrumbs>
      </div>
    </div>

    <q-form @submit="onSubmit" class="q-py-lg">
      <div class="row justify-center q-mt-lg">
        <div class="col-xs-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">

          <q-toolbar class="bg-primary text-white shadow-2">
            <q-toolbar-title>Add Bank Account</q-toolbar-title>
          </q-toolbar>

          <div class="row items-start content-start q-col-gutter-x-sm q-col-gutter-y-sm q-pt-lg">

            <div class="col-xs-12 col-sm-12 col-md-6">
              <q-input
                outlined
                label="Account Name"
                v-model="accountName"
                type="text"
                filled
                no-error-icon
                :rules="[val => !!val || 'Field is required']"
              />
            </div>

            <div class="col-xs-12 col-sm-12 col-md-6">
              <q-input
                outlined
                label="Bank Name"
                v-model="bankName"
                type="text"
                filled
                no-error-icon
                :rules="[val => !!val || 'Field is required']"
              />
            </div>

            <div class="col-xs-12 col-sm-12 col-md-6">
              <q-input
                outlined
                label="Account Number"
                v-model="accountNumber"
                type="text"
                filled
                no-error-icon
              >
              </q-input>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-6">
              <q-input
                outlined
                label="Slug"
                v-model="slug"
                type="text"
                filled
                no-error-icon
                hint="At Least 4 Chars & Only Lowercase and dashes (i.e. personal-checking)"
                :rules="[val => val.match(slugRegEx) || 'At least 4 chars & only lowercase and dashes']"
              >
              </q-input>
            </div>

            <div class="col-12">
              <q-btn type="submit" color="primary" label="Add" class="q-mt-lg" />
            </div>

          </div>

        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
  import { mapGetters } from 'vuex'


  export default {

    name: 'AddBankAccountPage',

    data () {
      return {
        accountName: '',
        bankName : '',
        accountNumber : '',
        slug : '',
        slugRegEx : /^[a-z\-]{4,}$/,
      }
    },

    computed: {
      ...mapGetters({

        "usersById" : "users/usersById"
      })
    },

    methods: {

      onSubmit() {

        let addAccountPayload = {
          "accountName" : this.accountName,
          "bankName" : this.bankName,
          "accountNumber" : this.accountNumber,
          "slug" : this.slug,
        }

        this.$store.dispatch("accounts/addAccount", addAccountPayload).then( addAccountResponse => {
          this.$router.push("/accounts/")
        })

      },

    },

  }
</script>
