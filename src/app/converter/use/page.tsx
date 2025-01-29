'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { callModelConverterTool } from '@/lib/mcp'

export default function ConverterToolPage() {
  const [svgContent, setSvgContent] = useState('')
  const [scale, setScale] = useState(1)
  const [result, setResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSvgContent(e.target?.result as string)
      }
      reader.readAsText(file)
    }
  }

  const handleConvert = async () => {
    if (!svgContent) return
    
    setIsLoading(true)
    try {
      const response = await callModelConverterTool('svg_to_gltf', {
        svg_content: svgContent,
        scale: scale
      })
      if (response.success && response.data) {
        setResult(JSON.stringify(response.data, null, 2))
      } else {
        throw new Error(response.error || 'Conversion failed')
      }
    } catch (error) {
      console.error('Conversion error:', error)
      setResult('Error during conversion')
    }
    setIsLoading(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8 flex items-center">
          <Link 
            href="/converter"
            className="mr-4 text-blue-400 hover:text-blue-300"
          >
            ← Back to Converter
          </Link>
          <h1 className="text-4xl font-bold">Convert SVG to GLTF</h1>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">
              Upload SVG File
            </label>
            <input
              type="file"
              accept=".svg"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-300
                file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-600 file:text-white
                hover:file:bg-blue-700
                cursor-pointer"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">
              Scale Factor
            </label>
            <input
              type="number"
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              min="0.1"
              step="0.1"
              className="bg-gray-700 text-white rounded px-3 py-2 w-32"
            />
          </div>

          <button
            onClick={handleConvert}
            disabled={!svgContent || isLoading}
            className={`bg-blue-600 text-white px-6 py-2 rounded font-semibold
              ${(!svgContent || isLoading) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          >
            {isLoading ? 'Converting...' : 'Convert to GLTF'}
          </button>

          {result && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Result:</h3>
              <pre className="bg-gray-900 p-4 rounded overflow-x-auto">
                {result}
              </pre>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
