'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface ConversionResult {
  success: boolean
  data?: {
    gltf: string
    stats: {
      vertices: number
      faces: number
      fileSize: number
    }
  }
  error?: string
}

export default function ConverterPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [scaleFactor, setScaleFactor] = useState(1)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ConversionResult | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.name.toLowerCase().endsWith('.svg')) {
      setFile(selectedFile)
      setResult(null)
    } else {
      alert('Please select an SVG file')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('scaleFactor', scaleFactor.toString())

      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        error: 'Failed to convert file. Please try again.',
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
          <h1 className="text-4xl font-bold">SVG to GLTF Converter</h1>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg mb-2">Upload SVG File</label>
              <input
                type="file"
                accept=".svg"
                onChange={handleFileChange}
                className="w-full bg-gray-700 rounded p-2"
              />
            </div>

            <div>
              <label className="block text-lg mb-2">Scale Factor</label>
              <input
                type="number"
                value={scaleFactor}
                onChange={(e) => setScaleFactor(Number(e.target.value))}
                step="0.1"
                min="0.1"
                className="w-full bg-gray-700 rounded p-2"
              />
            </div>

            <button
              type="submit"
              disabled={!file || loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-50"
            >
              {loading ? 'Converting...' : 'Convert to GLTF'}
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
                    href={result.data?.gltf}
                    download="converted.gltf"
                    className="inline-block mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  >
                    Download GLTF
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
