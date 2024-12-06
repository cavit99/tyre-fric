'use client'

import dynamic from 'next/dynamic'

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })

export default function TyreVisualization({ title, state }) {
  const { lateral, longitudinal, radius } = state
  const resultant = Math.sqrt(lateral ** 2 + longitudinal ** 2)

  const data = [
    // Friction Circle
    {
      type: 'scatter',
      x: [...Array(101)].map((_, i) => radius * Math.cos((2 * Math.PI * i) / 100)),
      y: [...Array(101)].map((_, i) => radius * Math.sin((2 * Math.PI * i) / 100)),
      mode: 'lines',
      line: { color: 'gray', dash: 'dash' },
      name: 'Friction Circle',
      showlegend: false,
    },
  ]

  const layout = {
    title,
    xaxis: { range: [-1.5, 1.5], zeroline: true, scaleanchor: 'y', scaleratio: 1 },
    yaxis: { range: [-1.5, 1.5], zeroline: true },
    width: 400,
    height: 400,
    showlegend: false,
    shapes: resultant > radius ? [{
      type: 'circle',
      xref: 'x',
      yref: 'y',
      x0: -radius,
      y0: -radius,
      x1: radius,
      y1: radius,
      line: { color: 'red' },
    }] : [],
    annotations: [
      // Lateral Force Arrow
      {
        x: lateral,
        y: 0,
        ax: 0,
        ay: 0,
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowhead: 2,
        arrowsize: 1,
        arrowwidth: 2,
        arrowcolor: 'blue',
        standoff: 0,
        axref: 'x',
        ayref: 'y'
      },
      // Longitudinal Force Arrow
      {
        x: 0,
        y: longitudinal,
        ax: 0,
        ay: 0,
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowhead: 2,
        arrowsize: 1,
        arrowwidth: 2,
        arrowcolor: 'orange',
        standoff: 0,
        axref: 'x',
        ayref: 'y'
      },
      // Resultant Force Arrow
      {
        x: lateral,
        y: longitudinal,
        ax: 0,
        ay: 0,
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowhead: 2,
        arrowsize: 1,
        arrowwidth: 3,
        arrowcolor: 'green',
        standoff: 0,
        axref: 'x',
        ayref: 'y'
      }
    ]
  }

  return <Plot data={data} layout={layout} />
}
