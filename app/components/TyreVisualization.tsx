'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useWindowSize } from '@/hooks/useWindowSize'

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })

export default function TyreVisualization({ title, state }) {
  const { lateral, longitudinal, radius } = state
  const resultant = Math.sqrt(lateral ** 2 + longitudinal ** 2)
  const { width } = useWindowSize()
  const [plotSize, setPlotSize] = useState(400)

  useEffect(() => {
    // Responsive sizing logic
    if (width < 640) { // mobile
      setPlotSize(300)
    } else if (width < 1024) { // tablet
      setPlotSize(350)
    } else { // desktop
      setPlotSize(400)
    }
  }, [width])

  const data = [
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
    xaxis: { 
      range: [-1.5, 1.5], 
      zeroline: true, 
      scaleanchor: 'y', 
      scaleratio: 1,
      fixedrange: true 
    },
    yaxis: { 
      range: [-1.5, 1.5], 
      zeroline: true,
      fixedrange: true 
    },
    width: plotSize,
    height: plotSize,
    showlegend: false,
    dragmode: false,
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
        axref: 'x',
        ayref: 'y',
        xanchor: lateral >= 0 ? 'right' : 'left',
        yanchor: 'middle',
        text: '',
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
        axref: 'x',
        ayref: 'y',
        xanchor: 'middle',
        yanchor: longitudinal >= 0 ? 'bottom' : 'top',
        text: '',
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
        axref: 'x',
        ayref: 'y',
        xanchor: lateral >= 0 ? 'right' : 'left',
        yanchor: longitudinal >= 0 ? 'bottom' : 'top',
        text: '',
      }
    ]
  }

  const config = {
    displayModeBar: false,
    responsive: true,
    scrollZoom: false,
  }

  return <Plot data={data} layout={layout} config={config} />
}
