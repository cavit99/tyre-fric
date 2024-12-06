'use client'

import { useState } from 'react'
import TyreVisualization from './components/TyreVisualization'
import Sliders from './components/Sliders'
import ResetAllButton from './components/ResetAllButton'
import GlobalLegend from './components/GlobalLegend'

export default function Home() {
  const [tyreStates, setTyreStates] = useState({
    frontLeft: { lateral: 0, longitudinal: 0, radius: 0.7 },
    frontRight: { lateral: 0, longitudinal: 0, radius: 0.7 },
    rearLeft: { lateral: 0, longitudinal: 0, radius: 0.7 },
    rearRight: { lateral: 0, longitudinal: 0, radius: 0.7 },
  })

  const updateTyreState = (tyre, property, value) => {
    setTyreStates(prevState => ({
      ...prevState,
      [tyre]: { ...prevState[tyre], [property]: value },
    }))
  }

  const resetAll = () => {
    setTyreStates({
      frontLeft: { lateral: 0, longitudinal: 0, radius: 0.7 },
      frontRight: { lateral: 0, longitudinal: 0, radius: 0.7 },
      rearLeft: { lateral: 0, longitudinal: 0, radius: 0.7 },
      rearRight: { lateral: 0, longitudinal: 0, radius: 0.7 },
    })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Tyre Friction Circles Visualization</h1>
      <div className="grid grid-cols-2 gap-8 mb-8">
        {Object.entries(tyreStates).map(([tyre, state]) => (
          <div key={tyre} className="flex flex-col items-center">
            <TyreVisualization title={`${tyre.replace(/([A-Z])/g, ' $1').trim()} Tyre`} state={state} />
            <Sliders
              title={`${tyre.replace(/([A-Z])/g, ' $1').trim()} Tyre`}
              state={state}
              updateState={(property, value) => updateTyreState(tyre, property, value)}
            />
          </div>
        ))}
      </div>
      <GlobalLegend />
      <ResetAllButton onReset={resetAll} />
    </main>
  )
}
