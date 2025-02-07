'use client'

import dynamic from 'next/dynamic'
import { Data, Layout } from 'plotly.js'

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })

export default function GlobalLegend() {
  const data: Data[] = [
    {
      x: [0],
      y: [0],
      type: 'scatter' as const,
      mode: 'lines' as const,
      line: { color: 'blue' },
      name: 'Lateral Force',
    },
    {
      x: [0],
      y: [0],
      type: 'scatter' as const,
      mode: 'lines' as const,
      line: { color: 'orange' },
      name: 'Longitudinal Force',
    },
    {
      x: [0],
      y: [0],
      type: 'scatter' as const,
      mode: 'lines' as const,
      line: { color: 'green' },
      name: 'Resultant Force',
    },
    {
      x: [0, 1],
      y: [0, 0],
      type: 'scatter' as const,
      mode: 'lines' as const,
      line: { color: 'gray', dash: 'dash' },
      name: 'Friction Circle',
    },
  ]

  const layout: Partial<Layout> = {
    showlegend: true,
    legend: { orientation: 'h' as const },
    height: 50,
    margin: { l: 0, r: 0, t: 0, b: 0 },
    xaxis: { 
      visible: false,
      fixedrange: true
    },
    yaxis: { 
      visible: false,
      fixedrange: true
    },
    dragmode: false as const,
    annotations: [
      {
        x: 0,
        y: 0,
        ax: 0.5,
        ay: 0,
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowhead: 2,
        arrowsize: 1,
        arrowwidth: 2,
        arrowcolor: 'blue',
      },
      {
        x: 0,
        y: 0,
        ax: 0,
        ay: 0.5,
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowhead: 2,
        arrowsize: 1,
        arrowwidth: 2,
        arrowcolor: 'orange',
      },
      {
        x: 0,
        y: 0,
        ax: 0.35,
        ay: 0.35,
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowhead: 2,
        arrowsize: 1,
        arrowwidth: 2,
        arrowcolor: 'green',
      },
    ],
  }

  const config = {
    displayModeBar: false,
    responsive: true,
    scrollZoom: false,
  }

  return <Plot data={data} layout={layout} config={config} />
}
