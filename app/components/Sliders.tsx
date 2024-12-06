'use client'

import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

interface SliderState {
  lateral: number;
  longitudinal: number;
  radius: number;
}

interface SlidersProps {
  title: string;
  state: SliderState;
  updateState: (key: keyof SliderState, value: number) => void;
}

export default function Sliders({ title, state, updateState }: SlidersProps) {
  return (
    <div className="p-3 border rounded-lg w-full mt-2">
      <h3 className="text-md font-semibold mb-2">{title} Controls</h3>
      <div className="space-y-3">
        <div className="flex flex-col">
          <Label htmlFor={`${title}-lateral`} className="mb-1 text-sm">Lateral: {state.lateral.toFixed(2)}</Label>
          <Slider
            id={`${title}-lateral`}
            min={-1}
            max={1}
            step={0.01}
            value={[state.lateral]}
            onValueChange={([value]) => updateState('lateral', value)}
            className="slider-thin"
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor={`${title}-longitudinal`} className="mb-1 text-sm">Longitudinal: {state.longitudinal.toFixed(2)}</Label>
          <Slider
            id={`${title}-longitudinal`}
            min={-1}
            max={1}
            step={0.01}
            value={[state.longitudinal]}
            onValueChange={([value]) => updateState('longitudinal', value)}
            className="slider-thin"
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor={`${title}-radius`} className="mb-1 text-sm">Radius: {state.radius.toFixed(2)}</Label>
          <Slider
            id={`${title}-radius`}
            min={0}
            max={1}
            step={0.01}
            value={[state.radius]}
            onValueChange={([value]) => updateState('radius', value)}
            className="slider-thin"
          />
        </div>
      </div>
    </div>
  )
}
