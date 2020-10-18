/* App.js */
import React from 'react';
import CanvasJSReact from '../Resources/canvasjs.react'
import {histogram} from '../Processor/Histogram';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
import { default as json } from '../Resources/sample.json';

export const Chart = () =>{
        console.log(histogram(json, '01004'))
        // const data = json.map((val:any) => ({x: val.id, y: val.date_creation}))
        const data = histogram(json, '01004').values;
        const options = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2", // "light1", "dark1", "dark2"
            title: {
                text: "Investigator Deck"
            },
            axisY: {
                title: "Count",
                suffix: ""
            },
            axisX: {
                title: "Date",
                prefix: "",
            },
            data: [{
                type: "line",
                toolTipContent: " {x}: {y}%",
                dataPoints: data
            }]
        }
        return (
            <div>
            <CanvasJSChart options = { options }/>
            </div>
    		);
    }