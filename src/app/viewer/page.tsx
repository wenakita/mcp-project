'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import { useGLTF } from '@react-three/drei'

interface ModelStats {
  vertices: number
  faces: number
  materials: number
  textures: number
  animations: number
  fileSize: number
}

interface ViewerResult {
  success: boolean
  data?: {
    stats: ModelStats
    analysis: {
      performance: string
      recommendations: string[]
    }
  }
  error?: string
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}

export default function ViewerPage() {
  const [file, setFile] = useState<File | null>(null)
  const [modelUrl, setModelUrl] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ViewerResult | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && (
      selectedFile.name.toLowerCase().endsWith('.gltf') ||
      selectedFile.name.toLowerCase().endsWith('.glb')
    )) {
      setFile(selectedFile)
      setResult(null)

      // Create object URL for the model
      const url = URL.createObjectURL(selectedFile)
      setModelUrl(url)

      // Analyze the model
      await analyzeModel(selectedFile)
    } else {
      alert('Please select a GLTF or GLB file')
    }
  }

  const analyzeModel = async (modelFile: File) => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', modelFile)

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        error: 'Failed to analyze model. Please try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  const formatFileSize = (bytes: number | undefined) => {
    if (typeof bytes === 'undefined') return 'N/A'
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center mb-8">
          <Link
            href="/"
            className="text-blue-400 hover:text-blue-300 mr-4"
          >
            ← Back
          </Link>
          <h1 className="text-4xl font-bold">Model Viewer & Analyzer</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Viewer Section */}
          <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
            <div className="mb-6">
              <label className="block text-lg mb-2">Upload Model</label>
              <input
                ref={fileInputRef}
                type="file"
                accept=".gltf,.glb"
                onChange={handleFileChange}
                className="w-full bg-gray-700 rounded p-2"
              />
            </div>

            {modelUrl && (
              <div className="relative aspect-square w-full bg-gray-900 rounded-lg overflow-hidden">
                <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
                  <Stage environment="city" intensity={0.5}>
                    <Model url={modelUrl} />
                  </Stage>
                  <OrbitControls autoRotate />
                </Canvas>
              </div>
            )}
          </div>

          {/* Analysis Section */}
          <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Model Analysis</h2>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p>Analyzing model...</p>
              </div>
            ) : result ? (
              result.success ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Statistics</h3>
                    <dl className="grid grid-cols-2 gap-4">
                      <div>
                        <dt className="text-gray-400">Vertices</dt>
                        <dd>{result.data?.stats.vertices.toLocaleString() ?? 'N/A'}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-400">Faces</dt>
                        <dd>{result.data?.stats.faces.toLocaleString() ?? 'N/A'}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-400">Materials</dt>
                        <dd>{result.data?.stats.materials ?? 'N/A'}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-400">Textures</dt>
                        <dd>{result.data?.stats.textures ?? 'N/A'}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-400">Animations</dt>
                        <dd>{result.data?.stats.animations ?? 'N/A'}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-400">File Size</dt>
                        <dd>{formatFileSize(result.data?.stats.fileSize)}</dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Performance</h3>
                    <p className="text-gray-300">{result.data?.analysis.performance ?? 'No performance data available'}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Recommendations</h3>
                    <ul className="list-disc list-inside text-gray-300">
                      {result.data?.analysis.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      )) ?? <li>No recommendations available</li>}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="bg-red-900/50 text-red-200 rounded p-4">
                  {result.error}
                </div>
              )
            ) : (
              <p className="text-gray-400">
                Upload a model to see detailed analysis
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
