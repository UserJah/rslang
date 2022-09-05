import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'График слов',
    },
  },
}

const labels = [1, 2, 3, 4, 5, 6, 7]

export const data = {
  labels,
  datasets: [
    {
      label: 'за весь период обучения',
      data: [10, 25, 38, 14, 75, 36, 87, 87],
      borderColor: '#94b49f',
      backgroundColor: '#94b49f',
    },
  ],
}

export function TotalWordsGraph() {
  return <Line options={options} data={data} />
}
