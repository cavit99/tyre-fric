'use client'

import { Button } from "@/components/ui/button"

export default function ResetAllButton({ onReset }) {
  return (
    <Button onClick={onReset} className="mt-4">
      Reset All
    </Button>
  )
}
