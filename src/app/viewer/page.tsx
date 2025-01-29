'use client'

import React from 'react'
import Link from 'next/link'

export default function ViewerLandingPage() {
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

        <div className="grid gap-8 md:grid-cols-2">
          {/* Info Section */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">About the Viewer</h2>
            <p className="text-gray-300 mb-4">
              Our Model Viewer tool provides detailed analysis and statistics for your 3D models, helping you understand their structure and complexity.
            </p>
            <h3 className="text-xl font-semibold mb-2">Features</h3>
            <ul className="list-disc list-inside text-gray-300 mb-4">
              <li>Support for GLTF/GLB and SVG</li>
              <li>Detailed geometry analysis</li>
              <li>Model statistics</li>
              <li>Performance metrics</li>
            </ul>
            <Link 
              href="/viewer/use"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold"
            >
              Start Analyzing
            </Link>
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
      </div>
    </main>
  )
}
