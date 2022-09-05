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
import classes from './TotalWordsGraph.module.css'

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

export const data1 = {
  labels,
  datasets: [
    {
      label: 'за весь период обучения',
      data: [10, 25, 38, 14, 75, 36, 87, 87],
      borderColor: '#fffff',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
}

export function TotalWordsGraph({ data }) {
  return (
    <Line
      className={classes.line}
    
      options={options}
      data={data}
    />
  )
}
