<template>
  <div class="w-3/4 mx-auto">
    <div class="border rounded-t bg-grey p-2 mt-4 m-0">
      Packages

      <button
        type="button"
        @click="reset"
        class="float-right bg-white hover:bg-grey-lightest text-grey-darkest border rounded shadow px-2 py-1 text-sm -mt-1"
      >
        Reset
      </button>
    </div>
    <div class="flex w-full flex-wrap border rounded-b">
      <div v-for="(constraint, name) in packages" :key="name" class="w-1/4 p-2 m-4 text-center">
        <div class="font-hairline">{{ name }}</div>
        <constraint-display class="text-4xl" :constraint-string="constraint"></constraint-display>
      </div>
    </div>
  </div>
</template>

<script>
import ConstraintDisplay from './ConstraintDisplay'

export default {
  name: 'PackageConstraintChecker',
  props: {
    packages: {
      type: Object,
      required: true
    }
  },
  components: {
    ConstraintDisplay
  },
  methods: {
    reset () {
      this.$emit('reset')
    }
  }
}
</script>
