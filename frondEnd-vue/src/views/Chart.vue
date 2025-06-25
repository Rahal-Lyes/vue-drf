<!-- src/components/MyChart.vue -->
<template>
  <canvas ref="chartCanvas" class="test"></canvas>
</template>

<script>
import { Chart } from 'chart.js/auto';

export default {
  name: 'MyChart',
  mounted() {
    const ctx = this.$refs.chartCanvas.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Rouge', 'Bleu', 'Jaune', 'Vert'],
        datasets: [{
          label: 'Votes',
          data: [12, 19, 3, 5],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  },
  beforeUnmount() {
    // Nettoyage pour éviter les fuites mémoire
    if (this.chart) {
      this.chart.destroy();
    }
  }
};
</script>

<style scoped>
canvas {
  max-width: 100%;
  height: 400px;
}
</style>
