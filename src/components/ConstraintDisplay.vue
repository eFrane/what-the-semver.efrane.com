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
      :current="minor('current')"
      :min="minor('min')"
      :max="minor('max')"
    >
    </display-digit>
    <div class="flex-auto">.</div>
    <display-digit class="flex-auto"
      :current="patch('current')"
      :min="patch('min')"
      :max="patch('max')"
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
    minor (type) {
      switch (type) {
        case 'current':
          return this.version.minor

        case 'min':
          return this.min.minor

        case 'max':
          if (this.max && this.max.major > this.version.major) {
            return +Infinity
          }

          return this.max.minor
      }
    },
    patch (type) {
      switch (type) {
        case 'current':
          return this.version.patch

        case 'min':
          return this.min.patch

        case 'max':
          if (this.max &&
          (this.max.major > this.version.major ||
          this.max.minor > this.version.minor)) {
            return +Infinity
          }

          return this.max.patch
      }
    }
  }
}
</script>
