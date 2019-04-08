<template>
  <div class="cal-grid">
    <template v-for="(weekCells, weekIdx) in groupedByWeek">
      <div
        :key="weekIdx"
        class="cal-grid-row"
      >
        <template v-for="(date, dateIdx) in weekCells">
          <template v-if="date === null">
            <div
              :key="dateIdx"
              class="cal-grid-cell cal-grid-cell--empty"
            ></div>
          </template>

          <template v-else>
            <component
              :is="cellComponent"
              :key="dateIdx"
              :dt="date"
              v-bind="$attrs"
            />
          </template>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'MonthGrid',

  props: {
    dt: { type: Date, required: true },
    cellComponent: { required: true, type: Object },
  },

  computed: {
    firstDay() {
      return new Date(this.dt.getFullYear(), this.dt.getMonth(), 1);
    },

    lastDay() {
      return new Date(this.dt.getFullYear(), this.dt.getMonth() + 1, 0);
    },

    groupedByWeek() {
      const currentDt = this.firstDay;
      const dates = [];

      while (currentDt <= this.lastDay) {
        const weekCells = [];

        for (let gridCellIdx = 0; gridCellIdx <= 6; gridCellIdx += 1) {
          if (currentDt.getDay() !== gridCellIdx || currentDt > this.lastDay) {
            weekCells.push(null);
          } else {
            weekCells.push(new Date(currentDt.getTime()));
            currentDt.setDate(currentDt.getDate() + 1);
          }
        }

        dates.push(weekCells);
      }

      return dates;
    },
  }
};
</script>
