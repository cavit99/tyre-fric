'use client'

import { Button } from "@/components/ui/button"

interface ResetAllButtonProps {
  onReset: () => void;
}

export default function ResetAllButton({ onReset }: ResetAllButtonProps) {
  return (
    <Button onClick={onReset} className="mt-4">
      Reset All
    </Button>
  )
}
