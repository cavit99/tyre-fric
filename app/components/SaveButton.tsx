'use client'

import { Button } from "@/components/ui/button"
import html2canvas from 'html2canvas'

export default function SaveButton() {
  const handleSave = async () => {
    // Create a temporary container for just the plots
    const tempContainer = document.createElement('div')
    tempContainer.style.cssText = 'position: absolute; left: -9999px; width: 1200px;'
    tempContainer.className = 'grid grid-cols-2 gap-4'
    
    // Get all plot divs (but not their sliders)
    const plotDivs = document.querySelectorAll('.plots-container > div')
    plotDivs.forEach(div => {
      // Clone only the TyreVisualization part (first child)
      const plotClone = div.firstElementChild?.cloneNode(true)
      if (plotClone) {
        const wrapper = document.createElement('div')
        wrapper.className = 'p-4 border rounded-lg'
        wrapper.appendChild(plotClone)
        tempContainer.appendChild(wrapper)
      }
    })

    // Add to document temporarily
    document.body.appendChild(tempContainer)

    try {
      // Create canvas from the temporary container
      const canvas = await html2canvas(tempContainer, {
        backgroundColor: null,
        scale: 2, // Higher quality
      })

      // Convert to blob
      canvas.toBlob((blob) => {
        if (!blob) return

        // Create download link
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'tyre-friction-circles.png'
        
        // Trigger download
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        // Cleanup
        URL.revokeObjectURL(url)
      }, 'image/png')
    } catch (error) {
      console.error('Error saving plots:', error)
    } finally {
      // Clean up temporary container
      document.body.removeChild(tempContainer)
    }
  }

  return (
    <Button onClick={handleSave} className="mt-4 ml-2">
      Save Image
    </Button>
  )
} 