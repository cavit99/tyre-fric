'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import html2canvas from 'html2canvas'

export default function SaveButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)

    // Declare tempContainer here so it's accessible in the finally block
    let tempContainer: HTMLDivElement | null = null;

    // Defer processing to next frame
    requestAnimationFrame(async () => {
      try {
        // Create temporary container
        tempContainer = document.createElement('div')
        tempContainer.style.cssText = 'position: absolute; left: -9999px; width: 1200px;'
        tempContainer.className = 'grid grid-cols-2 gap-4'
        
        // Get plot divs
        const plotDivs = document.querySelectorAll('.plots-container > div')
        plotDivs.forEach(div => {
          const plotClone = div.firstElementChild?.cloneNode(true)
          if (plotClone && tempContainer) {
            const wrapper = document.createElement('div')
            wrapper.className = 'p-4 border rounded-lg'
            wrapper.appendChild(plotClone)
            tempContainer.appendChild(wrapper)
          }
        })

        if (!tempContainer) {
          throw new Error('Failed to create temporary container')
        }

        document.body.appendChild(tempContainer)

        // Create canvas with higher quality
        const canvas = await html2canvas(tempContainer, {
          backgroundColor: null,
          scale: 2,
        })

        // Handle download
        canvas.toBlob((blob) => {
          if (!blob) {
            throw new Error('Failed to create image')
          }

          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = 'tyre-friction-circles.png'
          
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(url)
          
        }, 'image/png')
      } catch (error) {
        console.error('Error saving plots:', error)
        // You could add a toast notification here for error feedback
      } finally {
        if (tempContainer) {
          document.body.removeChild(tempContainer)
        }
        setIsLoading(false)
      }
    })
  }

  return (
    <Button 
      onClick={handleSave} 
      className="mt-4 ml-2"
      disabled={isLoading}
    >
      {isLoading ? 'Saving...' : 'Save Image'}
    </Button>
  )
} 