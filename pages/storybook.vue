<template>
  <div>
      <h1>This is storybook</h1>

      <h3>InputNumberCounter</h3>
      <InputNumberCounter v-model.lazy="inputNumberCount"
                          :min="2"
                          :max="5"
                          :has-label="false"
                          @change="inputNumberCounterChange"
          />
          <p>count = {{ inputNumberCount }}</p>

  </div>
</template>

<script>
const InputNumberCounter = () => import('@/components/common/input-number-counter');

export default {
  components: {
      InputNumberCounter
  },
  layout: 'clean',
  validate({ params, query, store }) {
    if (process.env.GRT_ENV !== 'development') {
        return false
    }
    return true
  },
  data() {
    return {
        inputNumberCount: 3
    };
  },
  methods: {
      inputNumberCounterChange(after, before) {
          if (process.client) {
            this.$toast.show(`inputNumberCounterChange ${before} -> ${after}`)
          }
      }
  }
};
</script>
