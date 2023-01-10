import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

  const ShowBlog = (props) => {
    const data = {
      labels: ['May 12', 'May 13', 'May 14', 'May 15', 'May 16', 'May 17'],
      datasets: [{
        data: [8, 7.8, 6, 8, 7, 5, 6],
        backgroundColor: 'transparent',
        pointBorderColer: '#f26c6d',
        pointBorderWith: 4,
        tension: 0.4
      }]
    };
    const options = {
      plugin: {
        legend: false,
      },
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          min: 2,
          max: 10,
          ticks: {
            stepSize: 2,
            callBack: (value) => value + 'K'
          },
          grid: {
            borderDash: [10]
          }
        }
      }
    }

  return (
    <>
    <Line data={data} option={options}></Line>
    </>
    )
}

export default ShowBlog