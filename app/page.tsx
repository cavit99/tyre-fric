'use client'

import { useState } from 'react'
import TyreVisualization from './components/TyreVisualization'
import Sliders from './components/Sliders'
import ResetAllButton from './components/ResetAllButton'
import SaveButton from './components/SaveButton'
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
    <main className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center">
        Tyre Friction Circles Visualization
      </h1>
      <div className="plots-container w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8">
        {Object.entries(tyreStates).map(([tyre, state]) => (
          <div key={tyre} className="flex flex-col items-center p-4 border rounded-lg">
            <TyreVisualization 
              title={`${tyre.replace(/([A-Z])/g, ' $1').trim()} Tyre`} 
              state={state} 
            />
            <Sliders
              title={`${tyre.replace(/([A-Z])/g, ' $1').trim()} Tyre`}
              state={state}
              updateState={(property, value) => updateTyreState(tyre, property, value)}
            />
          </div>
        ))}
      </div>
      <div className="w-full max-w-3xl">
        <GlobalLegend />
      </div>
      <div className="flex gap-2">
        <ResetAllButton onReset={resetAll} />
        <SaveButton />
      </div>
    </main>
  )
}
