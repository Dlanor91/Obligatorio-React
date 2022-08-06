import { color } from '@mui/system';
import React from 'react'
import Chart from "react-apexcharts";
import "./Graficas.css"

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
                background: 'gold',
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
        <div className="container mt-5">
            <div className="d-flex justify-content-center h-100">
                <Chart
                    className="pepe"
                    options={state.options}
                    series={state.series}
                    type="bar"
                    width={600}
                    height={400}
                    align="center"
                />

            </div>
        </div>
    );
};

export default GraficaBarras;
