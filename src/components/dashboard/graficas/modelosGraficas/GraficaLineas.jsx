import React from 'react'
import Chart from "react-apexcharts";

const GraficaLineas = ({ datos, categorias, nombreSeries = "" }) => {
    //console.log(`datos,categorias`, datos, categorias);
    const state = {
        options: {
            plotOptions: {
                bar: {
                    borderRadius: 10,
                    columnWidth: '55%',
                }
            },
            markers: {
                size: 4,
                colors: "white",
                strokeColors: '#000000',
                strokeWidth: 2,
                strokeOpacity: 0.9,
                strokeDashArray: 0,
                fillOpacity: 1,
                discrete: [],
                shape: "square",
                radius: 2,
                offsetX: 0,
                offsetY: 0,
                onClick: undefined,
                onDblClick: undefined,
                showNullDataPoints: true,
                hover: {
                    size: undefined,
                    sizeOffset: 3
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
        <div className='mt-3'>
            <Chart
                options={state.options}
                series={state.series}
                type="line"
                width={600}
                height={400}
                align="center"
            />
        </div>
    );
};

export default GraficaLineas