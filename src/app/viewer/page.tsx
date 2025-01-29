'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { callModelConverterTool } from '@/lib/mcp'

export default function ViewerPage() {
  const [modelContent, setModelContent] = useState('')
  const [modelFormat, setModelFormat] = useState<'gltf' | 'svg'>('gltf')
  const [result, setResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Set format based on file extension
      if (file.name.toLowerCase().endsWith('.svg')) {
        setModelFormat('svg')
      } else {
        setModelFormat('gltf')
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setModelContent(e.target?.result as string)
      }
      reader.readAsText(file)
    }
  }

  const handleAnalyze = async () => {
    if (!modelContent) return
    
    setIsLoading(true)
    try {
      const response = await callModelConverterTool('analyze_model', {
        model_content: modelContent,
        format: modelFormat
      })
      
      if (response.success && response.data) {
        setResult(JSON.stringify(response.data, null, 2))
      } else {
        throw new Error(response.error || 'Analysis failed')
      }
    } catch (error) {
      console.error('Analysis error:', error)
      setResult('Error during analysis')
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
          <h1 className="text-4xl font-bold">Model Viewer</h1>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-8">
          {/* Info Section */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">About the Viewer</h2>
            <p className="text-gray-300 mb-4">
              Our Model Viewer tool provides detailed analysis and statistics for your 3D models, helping you understand their structure and complexity.
            </p>
            <h3 className="text-xl font-semibold mb-2">Features</h3>
            <ul className="list-disc list-inside text-gray-300">
              <li>Support for GLTF/GLB and SVG</li>
              <li>Detailed geometry analysis</li>
              <li>Model statistics</li>
              <li>Performance metrics</li>
            </ul>
          </div>

          {/* Usage Guide */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">How to Use</h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold mb-2">1. Upload Model</h3>
                <p>Upload your GLTF, GLB, or SVG file for analysis.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">2. Select Format</h3>
                <p>Choose the correct format of your uploaded model.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">3. Analyze</h3>
                <p>Get detailed information about your model:</p>
                <ul className="list-disc list-inside ml-4 mt-2">
                  <li>Vertex and face counts</li>
                  <li>Material usage</li>
                  <li>File size metrics</li>
                  <li>Structure details</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">4. Review</h3>
                <p>Examine the analysis results to understand your model better.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Viewer Interface */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">
              Upload Model File
            </label>
            <input
              type="file"
              accept=".gltf,.glb,.svg"
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
              Model Format
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="gltf"
                  checked={modelFormat === 'gltf'}
                  onChange={(e) => setModelFormat('gltf')}
                  className="mr-2"
                />
                GLTF/GLB
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="svg"
                  checked={modelFormat === 'svg'}
                  onChange={(e) => setModelFormat('svg')}
                  className="mr-2"
                />
                SVG
              </label>
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!modelContent || isLoading}
            className={`bg-blue-600 text-white px-6 py-2 rounded font-semibold
              ${(!modelContent || isLoading) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          >
            {isLoading ? 'Analyzing...' : 'Analyze Model'}
          </button>

          {result && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Analysis Results:</h3>
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
