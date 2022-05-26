<template>
  <q-page>
    <BreadCrumbs :crumbs="crumbs" v-if="accounts[$route.params.id] !== undefined" />

    <DesktopView
      v-if="$q.platform.is.desktop"
      :budgetAttached="budgetAttached"
    />
    <MobileView
      v-else
      :budgetAttached="budgetAttached"
    />

  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import BreadCrumbs from "../../../components/ui/BreadCrumbs";
import AddTransactionDesktopView from "./AddTransactionDesktopView";
import AddTransactionMobileView from "./AddTransactionMobileView";
import HTTP from "../../../http-common";

export default {
  name: 'AddTransaction',

  components: {
    BreadCrumbs : BreadCrumbs,
    DesktopView : AddTransactionDesktopView,
    MobileView : AddTransactionMobileView,
  }, // components

  data () {
    return {
      budgetAttached : false,
    }
  }, // data

  computed: {
    crumbs() {
      if (this.accounts[this.$route.params.id] !== undefined) {
        return [
          {
            icon: 'account_balance',
            label: this.accounts[this.$route.params.id].accountName,
            to: '/account/' + this.$route.params.id + '/' + this.$route.params.slug + '/' + this.$route.params.year + '/' + this.$route.params.month + '/'
          },
          {
            icon: 'edit',
            label: 'Add Transaction',
            to: '',
          }
        ];
      }
    },
    ...mapGetters({
      "accounts" : "accounts/getAccounts",
    }),
  }, // computed

  created() {
    HTTP.get("budget/get-budget-info-by-statement-id/" + this.$route.params.statementid)
      .then( response =>{
        if (response.data.success) {
          this.budgetAttached = response.data.budgetAttached
        }
      })
      .catch((error) => {
        // handle error
        console.log(error);
        this.$q.notify({
          message: 'There was a problem getting the budget information',
          color: 'red',
          position: "top",
          timeout: 5000,
        })

      })
      .then(function () {
        // always executed
      });
  },


} // export default
</script>
