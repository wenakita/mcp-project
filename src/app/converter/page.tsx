'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { callModelConverterTool } from '@/lib/mcp'

export default function ConverterPage() {
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
            href="/"
            className="mr-4 text-blue-400 hover:text-blue-300"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold">Model Converter</h1>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-8">
          {/* Info Section */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">About the Converter</h2>
            <p className="text-gray-300 mb-4">
              Our Model Converter tool allows you to convert SVG files into GLTF format, making it easy to use your vector graphics in 3D applications.
            </p>
            <h3 className="text-xl font-semibold mb-2">Features</h3>
            <ul className="list-disc list-inside text-gray-300">
              <li>SVG to GLTF conversion</li>
              <li>Adjustable scale factor</li>
              <li>Preserves vector quality</li>
              <li>Fast processing</li>
            </ul>
          </div>

          {/* Usage Guide */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">How to Use</h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold mb-2">1. Prepare Your File</h3>
                <p>Ensure your SVG file is properly formatted and contains the elements you want to convert.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">2. Upload</h3>
                <p>Upload your SVG file using our simple interface.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">3. Adjust Settings</h3>
                <p>Set the scale factor to control the size of your output model.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">4. Convert</h3>
                <p>Click convert and download your new GLTF file.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Converter Interface */}
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
