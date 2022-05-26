<template>
  <div class="row justify-center q-mt-lg">
    <div class="col-sm-12">
      <div class="row q-gutter-sm">
        <div class="col-sm-12">
          <div class="text-h3">{{ heading }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PageHeading',
  props: {
    heading : {
      type: [String],
      required: true,
    }
  },


} // export default
</script>
