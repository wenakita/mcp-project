'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { callModelConverterTool } from '@/lib/mcp'

export default function OptimizerToolPage() {
  const [gltfContent, setGltfContent] = useState('')
  const [compress, setCompress] = useState(true)
  const [simplify, setSimplify] = useState(true)
  const [result, setResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setGltfContent(e.target?.result as string)
      }
      reader.readAsText(file)
    }
  }

  const handleOptimize = async () => {
    if (!gltfContent) return
    
    setIsLoading(true)
    try {
      const response = await callModelConverterTool('optimize_gltf', {
        gltf_content: gltfContent,
        compress,
        simplify
      })
      
      if (response.success && response.data) {
        setResult(JSON.stringify(response.data, null, 2))
      } else {
        throw new Error(response.error || 'Optimization failed')
      }
    } catch (error) {
      console.error('Optimization error:', error)
      setResult('Error during optimization')
    }
    setIsLoading(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8 flex items-center">
          <Link 
            href="/optimizer"
            className="mr-4 text-blue-400 hover:text-blue-300"
          >
            ← Back to Optimizer
          </Link>
          <h1 className="text-4xl font-bold">Optimize GLTF Model</h1>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">
              Upload GLTF File
            </label>
            <input
              type="file"
              accept=".gltf,.glb"
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

          <div className="mb-6 space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="compress"
                checked={compress}
                onChange={(e) => setCompress(e.target.checked)}
                className="mr-2 h-4 w-4"
              />
              <label htmlFor="compress" className="text-lg">
                Apply Draco Compression
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="simplify"
                checked={simplify}
                onChange={(e) => setSimplify(e.target.checked)}
                className="mr-2 h-4 w-4"
              />
              <label htmlFor="simplify" className="text-lg">
                Simplify Geometry
              </label>
            </div>
          </div>

          <button
            onClick={handleOptimize}
            disabled={!gltfContent || isLoading}
            className={`bg-blue-600 text-white px-6 py-2 rounded font-semibold
              ${(!gltfContent || isLoading) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          >
            {isLoading ? 'Optimizing...' : 'Optimize Model'}
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
