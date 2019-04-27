<template>
  <div class="w-1/2 mx-auto">
    <div class="mb-8">
      <label class="block text-sm font-bold mb-1">Paste or enter your constraint:</label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        v-model="constraint"
      >
    </div>
    <div class="flex">
      <div class="text-sm my-auto">
        The constraint "{{ constraint ? constraint : '-' }}" evaluates to the following version range:
      </div>
      <constraint-display
        class="text-4xl my-auto"
        :constraint-string="constraint"
        v-if="isValid(constraint)"
      ></constraint-display>
      <strong class="text-red font-bold pl-1" v-else>Invalid</strong>
    </div>
  </div>
</template>

<script>
import semver from 'semver'
import ConstraintDisplay from './ConstraintDisplay'

export default {
  name: 'SingleConstraintChecker',
  data () {
    return {
      constraint: '~1.0.0'
    }
  },
  components: {
    ConstraintDisplay
  },
  methods: {
    isValid (constraint) {
      return semver.coerce(constraint) !== null
    }
  }
}
</script>
