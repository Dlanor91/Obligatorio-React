import React from 'react'
import Chart from "react-apexcharts";

const GraficaBarras = ({ datos, categorias, nombreSeries = "" }) => {
  //console.log(`datos,categorias`, datos, categorias);
  const state = {
    options: {   
      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: '55%',          
        }
      }, 
      chart: {
        id: "apexchart-example",
        background: '#fff',
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
    <div className='mt-3'>
    <Chart
      options={state.options}
      series={state.series}
      type="bar"
      width={600}
      height={400}
      align="center"      
    />
    </div>
  );
};

export default GraficaBarras;
