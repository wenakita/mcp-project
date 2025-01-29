'use client'

import React from 'react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">MCP Tools</h1>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Converter Card */}
          <Link href="/converter" className="block">
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:bg-gray-700 transition-colors">
              <h2 className="text-2xl font-semibold mb-4">SVG to GLTF Converter</h2>
              <p className="text-gray-300">
                Convert SVG files to GLTF format with customizable scale factor. 
                Perfect for transforming 2D vector graphics into 3D models.
              </p>
            </div>
          </Link>

          {/* Optimizer Card */}
          <Link href="/optimizer" className="block">
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:bg-gray-700 transition-colors">
              <h2 className="text-2xl font-semibold mb-4">GLTF Optimizer</h2>
              <p className="text-gray-300">
                Optimize GLTF models with Draco compression and mesh simplification. 
                Reduce file size while maintaining visual quality.
              </p>
            </div>
          </Link>

          {/* Viewer Card */}
          <Link href="/viewer" className="block">
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:bg-gray-700 transition-colors">
              <h2 className="text-2xl font-semibold mb-4">Model Viewer & Analyzer</h2>
              <p className="text-gray-300">
                View and analyze GLTF/GLB models in 3D. Get detailed statistics 
                and performance recommendations.
              </p>
            </div>
          </Link>
        </div>

        {/* Getting Started Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <p className="text-gray-300 mb-4">
              Welcome to MCP Tools! This suite of tools helps you work with 3D models efficiently:
            </p>
            <ol className="list-decimal list-inside text-gray-300 space-y-2">
              <li>Start by converting your SVG files to GLTF format using the Converter</li>
              <li>Optimize your GLTF models to improve performance with the Optimizer</li>
              <li>View and analyze your models using the Model Viewer</li>
            </ol>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <a href="/docs" className="text-blue-400 hover:text-blue-300">Documentation</a>
              <a href="/examples" className="text-blue-400 hover:text-blue-300">Example Models</a>
              <a href="/api-docs" className="text-blue-400 hover:text-blue-300">API Reference</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 