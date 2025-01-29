'use client'

import React from 'react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">MCP Model Converter Tools</h1>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Model Conversion Card */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Model Conversion</h2>
            <p className="text-gray-300 mb-4">
              Convert between different 3D model formats with support for SVG, GLTF, and more.
            </p>
            <Link 
              href="/converter"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Open Converter
            </Link>
          </div>

          {/* Model Optimization Card */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Model Optimization</h2>
            <p className="text-gray-300 mb-4">
              Optimize your 3D models with Draco compression and mesh simplification.
            </p>
            <Link 
              href="/optimizer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Open Optimizer
            </Link>
          </div>

          {/* Model Viewer Card */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Model Viewer</h2>
            <p className="text-gray-300 mb-4">
              Preview and inspect your 3D models in real-time with our interactive viewer.
            </p>
            <Link 
              href="/viewer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Open Viewer
            </Link>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
          <p className="text-gray-300 mb-4">
            Select one of the tools above to begin working with your 3D models. Each tool provides
            specific functionality for handling different aspects of 3D model processing.
          </p>
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
            <ul className="list-disc list-inside text-gray-300">
              <li>
                <Link href="/docs" className="text-blue-400 hover:underline">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/examples" className="text-blue-400 hover:underline">
                  Example Models
                </Link>
              </li>
              <li>
                <Link href="/api-docs" className="text-blue-400 hover:underline">
                  API Reference
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
} 