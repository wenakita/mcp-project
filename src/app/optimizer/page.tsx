'use client'

import React from 'react'
import Link from 'next/link'

export default function OptimizerLandingPage() {
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
          <h1 className="text-4xl font-bold">Model Optimizer</h1>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Info Section */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">About the Optimizer</h2>
            <p className="text-gray-300 mb-4">
              Our Model Optimizer tool helps you reduce file size and improve performance of your 3D models while maintaining visual quality.
            </p>
            <h3 className="text-xl font-semibold mb-2">Features</h3>
            <ul className="list-disc list-inside text-gray-300 mb-4">
              <li>Draco compression support</li>
              <li>Mesh simplification</li>
              <li>Optimized for web delivery</li>
              <li>Maintains model fidelity</li>
            </ul>
            <Link 
              href="/optimizer/use"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold"
            >
              Start Optimizing
            </Link>
          </div>

          {/* Usage Guide */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">How to Use</h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold mb-2">1. Upload Model</h3>
                <p>Upload your GLTF or GLB file that you want to optimize.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">2. Choose Options</h3>
                <p>Select optimization options:</p>
                <ul className="list-disc list-inside ml-4 mt-2">
                  <li>Enable Draco compression</li>
                  <li>Apply mesh simplification</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">3. Optimize</h3>
                <p>Click optimize and let our tool process your model.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">4. Download</h3>
                <p>Download your optimized model with reduced file size.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
