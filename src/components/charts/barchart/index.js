import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'

const BarChart = ({ votesYES = 0, votesNO = 0 }) => {
  const [seriesChart, setseriesChart] = useState([])
  const optionsChart = {
    chart: {
      id: 'result-voting',
    },
    xaxis: {
      categories: ['Votes'],
    },
  }

  useEffect(() => {
    setseriesChart([
      {
        name: 'Votes for NO',
        data: [votesNO],
      },
      {
        name: 'Votes for YES',
        data: [votesYES],
      },
    ])
  }, [votesNO, votesYES])

  return (
    <Chart
      options={optionsChart}
      series={seriesChart}
      type="bar"
      width={350}
      height={320}
    />
  )
}

export default BarChart
