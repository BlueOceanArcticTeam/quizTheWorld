/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */

import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import React, { useState, useContext, useEffect } from 'react';

export default function ComponentName(props) {
  // set state variables below:

  // component functions - event handlers

  // use Effect:
  // render component:
  return (
    <div id="userbarchart" style={{ height: '100%', width: '100%', transform: 'scale(1.2)' }}>
      <Bar
        data={props.data}
        options={{
          plugins: {
            title: {
              display: true,
            },
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              max: 100,
              min: 0,
              ticks: {
                min: 0,
                max: 0,
                stepSize: 10,
                callback(val, index) {
                  return val / 10 % 2 === 0 ? this.getLabelForValue(val) : '';
                },
              },
            },
          },
          responseive: true,
        }}
      />
    </div>
  );
}
