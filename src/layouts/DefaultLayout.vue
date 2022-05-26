<template>
  <q-layout view="hHh lpR lFf">
    <TitleBar />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
  import TitleBar from "../components/ui/TitleBar";

  export default {
    name: 'DefaultLayout',

    components: {
      TitleBar : TitleBar
    },
  }
</script>
