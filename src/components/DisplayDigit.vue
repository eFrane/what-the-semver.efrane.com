<template>
  <div class="px-4 container relative text-center">
    {{ current }}
    <small class="absolute pin-t pin-r text-xs text-grey-darkest" v-if="hasMax">&#8804; {{ formattedMax }}</small>
    <small class="absolute pin-b pin-r text-xs text-grey-darkest" v-if="hasMin">&#8805; {{ min }}</small>
  </div>
</template>

<script>
export default {
  name: 'DisplayDigit',
  props: {
    current: {
      required: true
    },
    min: {
      type: Number,
      required: false,
      default: null,
      validate (int) {
        return int >= 0
      }
    },
    max: {
      type: Number,
      required: false,
      default: null,
      validate (int) {
        return int >= 0
      }
    }
  },
  computed: {
    hasMax () {
      return this.max !== null && this.max > this.current
    },
    hasMin () {
      return this.min !== null && this.min < this.current
    },
    formattedMax () {
      return this.max === +Infinity ? '∞' : this.max
    }
  }
}
</script>
