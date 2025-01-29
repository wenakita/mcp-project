import Link from 'next/link'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-white mb-8">MCP Tools</h1>
      
      <div className="grid gap-8 md:grid-cols-3">
        <Link href="/converter" className="block">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:bg-gray-700 transition-colors">
            <h2 className="text-2xl font-semibold text-white mb-4">Model Converter</h2>
            <p className="text-gray-300">
              Convert SVG files to GLTF format with customizable options.
            </p>
          </div>
        </Link>

        <Link href="/optimizer" className="block">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:bg-gray-700 transition-colors">
            <h2 className="text-2xl font-semibold text-white mb-4">Model Optimizer</h2>
            <p className="text-gray-300">
              Optimize GLTF models with compression and simplification.
            </p>
          </div>
        </Link>

        <Link href="/viewer" className="block">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:bg-gray-700 transition-colors">
            <h2 className="text-2xl font-semibold text-white mb-4">Model Viewer</h2>
            <p className="text-gray-300">
              Analyze and inspect 3D models with detailed statistics.
            </p>
          </div>
        </Link>
      </div>
    </main>
  )
}
