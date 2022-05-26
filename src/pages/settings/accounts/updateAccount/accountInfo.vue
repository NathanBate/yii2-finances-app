<template>
  <q-form @submit="onSubmit" class="q-py-lg">
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
        <q-btn type="submit" color="primary" label="Save" class="q-mt-lg" />
      </div>
  </div>
  </q-form>
</template>

<script>
import { mapGetters } from 'vuex'
import { Loading } from 'quasar'


export default {

  name: 'AccountInfoTab',

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
      "accounts" : "accounts/getAccounts",
      "user" : "access/getUser"
    })
  },

  methods: {

    onSubmit() {
      Loading.show()

      let updateAccountPayload = {
        "id"          : this.$route.params.accountId,
        "accountName" : this.accountName,
        "bankName" : this.bankName,
        "accountNumber" : this.accountNumber,
        "slug" : this.slug,

      }

      this.$store.dispatch("accounts/updateAccount", updateAccountPayload).then( updateAccountResponse => {

        Loading.hide()
        if (updateAccountResponse.data.success === false) {
          this.$q.notify({
            message: 'There was a problem saving your update.',
            color: 'red',
            position: "top",
            timeout: 5000,
          })
        } else {
          this.$router.push("/accounts/")
        }
      })

    },

    populate() {
      let account;
      account = this.accounts[this.$route.params.accountId]
      this.accountName = account.accountName
      this.bankName = account.bankName
      this.accountNumber = account.accountNumber
      if (account.slug !== null) {
        this.slug = account.slug
      }
    }

  },

  mounted() {

    if (this.accounts.length == 0) {
      Loading.show()
      this.$store.dispatch("accounts/getAccounts").then( LoadAccountsResponse => {
        Loading.hide()
        this.populate()
      })
    } else {
      this.populate()
    }
  }

}
</script>
