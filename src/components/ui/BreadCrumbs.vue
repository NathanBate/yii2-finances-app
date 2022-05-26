<template>
  <div class="row q-pb-lg q-pt-md" :class="$q.platform.is.mobile ? 'q-pl-sm' : 'q-pl-lg' ">
    <div class="col-md-12" :style="$q.platform.is.mobile ? 'font-size:8px;' : ''">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="fas fa-home" to="/" />
        <q-breadcrumbs-el v-for="crumb in crumbs"
          :icon="crumb.icon"
          :label="crumb.label"
          :to="crumb.to"
          :key="'bread-crumb-key-' + crumb.label"
        />
      </q-breadcrumbs>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BreadCrumbs',

  props: {
    crumbs: {
      type: [Array], // [{icon, label, toPath}]
      default: []
    },
  }, // props
  computed: {
    ...mapGetters({
      "accounts" : "accounts/getAccounts",
    }),
  }, // computed
} // export default
</script>
