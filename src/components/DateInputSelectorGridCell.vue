<template>
  <div
    class="cal-grid-cell"
    :class="{ 'cal-grid-cell': isActive }"
    @click="onClickDateBtn"
  >
    <div class="cal-grid-cell__content">
      <div class="cal-grid-cell__label">
        {{ dt.getDate() }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DateInputSelectorGridCell',

  props: {
    dt: { required: true, type: Date },
    selectedDt: { required: true, type: Date },
  },

  computed: {

    isActive() {
      return this.dt.getDate();
    },
  },

  methods: {
    onClickDateBtn() {

    },
  },
};
</script>

<style scoped>

</style>
