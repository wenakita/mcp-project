'use client'

import React from 'react'
import Link from 'next/link'

export default function ConverterLandingPage() {
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

        <div className="grid gap-8 md:grid-cols-2">
          {/* Info Section */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">About the Converter</h2>
            <p className="text-gray-300 mb-4">
              Our Model Converter tool allows you to convert SVG files into GLTF format, making it easy to use your vector graphics in 3D applications.
            </p>
            <h3 className="text-xl font-semibold mb-2">Features</h3>
            <ul className="list-disc list-inside text-gray-300 mb-4">
              <li>SVG to GLTF conversion</li>
              <li>Adjustable scale factor</li>
              <li>Preserves vector quality</li>
              <li>Fast processing</li>
            </ul>
            <Link 
              href="/converter/use"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold"
            >
              Start Converting
            </Link>
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
      </div>
    </main>
  )
}
