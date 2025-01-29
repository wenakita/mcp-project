'use client'

import React, { useState } from 'react'
import Link from 'next/link'

interface OptimizationResult {
  success: boolean
  data?: {
    optimizedGltf: string
    stats: {
      originalSize: number
      optimizedSize: number
      compressionRatio: number
      vertexCount: number
      faceCount: number
    }
  }
  error?: string
}

export default function OptimizerPage() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<OptimizationResult | null>(null)
  const [settings, setSettings] = useState({
    compressionLevel: 7,
    quantizationBits: 14,
    simplificationRatio: 1.0,
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.name.toLowerCase().endsWith('.gltf')) {
      setFile(selectedFile)
      setResult(null)
    } else {
      alert('Please select a GLTF file')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('settings', JSON.stringify(settings))

      const response = await fetch('/api/optimize', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        error: 'Failed to optimize file. Please try again.',
      })
    } finally {
      setLoading(false)
    }
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
          <h1 className="text-4xl font-bold">GLTF Optimizer</h1>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg mb-2">Upload GLTF File</label>
              <input
                type="file"
                accept=".gltf"
                onChange={handleFileChange}
                className="w-full bg-gray-700 rounded p-2"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="block text-lg mb-2">Compression Level</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={settings.compressionLevel}
                  onChange={(e) => setSettings({
                    ...settings,
                    compressionLevel: Number(e.target.value)
                  })}
                  className="w-full"
                />
                <span className="text-sm text-gray-300">
                  Level: {settings.compressionLevel}
                </span>
              </div>

              <div>
                <label className="block text-lg mb-2">Quantization Bits</label>
                <input
                  type="range"
                  min="8"
                  max="16"
                  value={settings.quantizationBits}
                  onChange={(e) => setSettings({
                    ...settings,
                    quantizationBits: Number(e.target.value)
                  })}
                  className="w-full"
                />
                <span className="text-sm text-gray-300">
                  Bits: {settings.quantizationBits}
                </span>
              </div>

              <div>
                <label className="block text-lg mb-2">Simplification Ratio</label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={settings.simplificationRatio}
                  onChange={(e) => setSettings({
                    ...settings,
                    simplificationRatio: Number(e.target.value)
                  })}
                  className="w-full"
                />
                <span className="text-sm text-gray-300">
                  Ratio: {settings.simplificationRatio}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={!file || loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-50"
            >
              {loading ? 'Optimizing...' : 'Optimize GLTF'}
            </button>
          </form>

          {result && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Result</h2>
              {result.success ? (
                <div className="bg-gray-700 rounded p-4">
                  <pre className="whitespace-pre-wrap">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                  <a
                    href={result.data?.optimizedGltf}
                    download="optimized.gltf"
                    className="inline-block mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  >
                    Download Optimized GLTF
                  </a>
                </div>
              ) : (
                <div className="bg-red-900/50 text-red-200 rounded p-4">
                  {result.error}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
