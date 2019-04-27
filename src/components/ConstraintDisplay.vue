<template>
  <div class="inline-flex text-center font-hairline">
    <display-digit class="flex-auto"
      :current="major(version)"
      :min="major(min)"
      :max="major(max)"
    >
    </display-digit>
    <div class="flex-auto">.</div>
    <display-digit class="flex-auto"
      :current="minor(version)"
      :min="minor(min)"
      :max="minor(max)"
    >
    </display-digit>
    <div class="flex-auto">.</div>
    <display-digit class="flex-auto"
      :current="patch(version)"
      :min="patch(min)"
      :max="patch(max)"
    >
    </display-digit>
    <div class="flex-auto" v-if="hasPre">.</div>
    <div class="flex-auto" v-if="hasPre">
      <span>{{ pre }}</span>
      <br>
      <span class="text-xs">pre</span>
    </div>
  </div>
</template>

<script>
import semver from 'semver'
import DisplayDigit from './DisplayDigit'

export default {
  name: 'ConstraintDisplay',
  props: {
    constraintString: {
      type: String,
      required: true
    }
  },
  components: {
    DisplayDigit
  },
  computed: {
    version () {
      return semver.coerce(this.constraintString)
    },
    pre () {
      return semver.coerce(this.constraintString).prerelease
    },
    hasPre () {
      return semver.coerce(this.constraintString).prerelease.length > 0
    },
    min () {
      return semver.coerce(this.minmax()[0] || null)
    },
    max () {
      return semver.coerce(this.minmax()[1] || null)
    }
  },
  methods: {
    minmax () {
      const rangeString = semver.validRange(this.constraintString)

      if (rangeString && rangeString.match(' ')) {
        return rangeString.split(' ')
      }

      return []
    },
    major (version) {
      return version ? version.major : null
    },
    minor (version) {
      return version ? version.minor : null
    },
    patch (version) {
      return version ? version.patch : null
    }
  }
}
</script>
