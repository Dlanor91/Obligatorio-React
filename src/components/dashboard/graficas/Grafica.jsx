import React from 'react'
import Chart from "react-apexcharts";

const Grafica = ({ datos, categorias, nombreSeries = "" }) => {
  console.log(`datos,categorias`, datos, categorias);
  const state = {
    options: {
      chart: {
        id: "apexchart-example",
      },
      xaxis: {
        categories: categorias,
      },     
    },
    series: [
      {
        name: nombreSeries,
        data: datos,
      },
    ],
  };

  return (
    <Chart
      options={state.options}
      series={state.series}
      type="bar"
      width={600}
      height={400}
      align="center"
    />
  );
};

export default Grafica;