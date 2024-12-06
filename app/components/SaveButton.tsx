'use client'

import { useState, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import html2canvas from 'html2canvas'

export default function SaveButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = useCallback(async () => {
    setIsLoading(true)

    let tempContainer: HTMLDivElement | null = null;

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

      // Create canvas in a separate microtask
      const canvas = await new Promise<HTMLCanvasElement>((resolve) => {
        setTimeout(async () => {
          const canvas = await html2canvas(tempContainer!, {
            backgroundColor: null,
            scale: 2,
          })
          resolve(canvas)
        }, 0)
      })

      // Convert to blob in worker
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (!blob) reject(new Error('Failed to create image'))
          else resolve(blob)
        }, 'image/png')
      })

      // Handle download
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'tyre-friction-circles.png'
      
      // Use requestAnimationFrame for DOM updates
      requestAnimationFrame(() => {
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      })

    } catch (error) {
      console.error('Error saving plots:', error)
    } finally {
      if (tempContainer) {
        requestAnimationFrame(() => {
          document.body.removeChild(tempContainer!)
        })
      }
      setIsLoading(false)
    }
  }, [])

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