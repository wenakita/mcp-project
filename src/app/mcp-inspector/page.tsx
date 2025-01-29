'use client';

import { useState } from 'react';

export default function McpInspector() {
  const [svgContent, setSvgContent] = useState('');
  const [svgScale, setSvgScale] = useState(1);
  const [svgResult, setSvgResult] = useState<any>(null);
  const [svgError, setSvgError] = useState('');

  const [gltfContent, setGltfContent] = useState('');
  const [compress, setCompress] = useState(true);
  const [simplify, setSimplify] = useState(true);
  const [gltfResult, setGltfResult] = useState<any>(null);
  const [gltfError, setGltfError] = useState('');

  const [modelContent, setModelContent] = useState('');
  const [modelFormat, setModelFormat] = useState<'gltf' | 'svg'>('gltf');
  const [modelResult, setModelResult] = useState<any>(null);
  const [modelError, setModelError] = useState('');

  async function callMcpTool(toolName: string, args: any) {
    try {
      const response = await fetch('/api/mcp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          server: 'model-converter',
          tool: toolName,
          args
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async function convertSvgToGltf() {
    setSvgError('');
    setSvgResult(null);
    
    try {
      const result = await callMcpTool('svg_to_gltf', {
        svg_content: svgContent,
        scale: svgScale
      });
      
      setSvgResult(result);
    } catch (error) {
      setSvgError(error instanceof Error ? error.message : 'An error occurred');
    }
  }

  async function optimizeGltf() {
    setGltfError('');
    setGltfResult(null);
    
    try {
      const result = await callMcpTool('optimize_gltf', {
        gltf_content: gltfContent,
        compress,
        simplify
      });
      
      setGltfResult(result);
    } catch (error) {
      setGltfError(error instanceof Error ? error.message : 'An error occurred');
    }
  }

  async function analyzeModel() {
    setModelError('');
    setModelResult(null);
    
    try {
      const result = await callMcpTool('analyze_model', {
        model_content: modelContent,
        format: modelFormat
      });
      
      setModelResult(result);
    } catch (error) {
      setModelError(error instanceof Error ? error.message : 'An error occurred');
    }
  }

  return (
    <div className="container mx-auto p-6 bg-background min-h-screen">
      <div className="bg-card rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">MCP Inspector - Model Converter</h1>
        
        {/* SVG to GLTF Tool */}
        <div className="mb-12 p-6 border border-border rounded-lg">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-foreground">svg_to_gltf</h2>
            <p className="text-muted-foreground">Convert SVG to GLTF format</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="svg-content" className="block text-sm font-medium text-foreground">
                SVG Content:
              </label>
              <textarea
                id="svg-content"
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                rows={5}
                value={svgContent}
                onChange={(e) => setSvgContent(e.target.value)}
                placeholder="Paste SVG content here"
              />
            </div>
            
            <div>
              <label htmlFor="svg-scale" className="block text-sm font-medium text-foreground">
                Scale (optional, default: 1.0):
              </label>
              <input
                type="number"
                id="svg-scale"
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={svgScale}
                onChange={(e) => setSvgScale(Number(e.target.value))}
                step="0.1"
              />
            </div>
            
            <button
              onClick={convertSvgToGltf}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Convert
            </button>
            
            {svgError && (
              <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-md">
                {svgError}
              </div>
            )}
            
            {svgResult && (
              <div className="mt-4 p-4 bg-muted rounded-md">
                <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(svgResult, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>

        {/* Optimize GLTF Tool */}
        <div className="mb-12 p-6 border border-border rounded-lg">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-foreground">optimize_gltf</h2>
            <p className="text-muted-foreground">Optimize a GLTF model using various techniques</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="gltf-content" className="block text-sm font-medium text-foreground">
                GLTF Content:
              </label>
              <textarea
                id="gltf-content"
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                rows={5}
                value={gltfContent}
                onChange={(e) => setGltfContent(e.target.value)}
                placeholder="Paste GLTF content here"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="compress"
                  className="h-4 w-4 rounded border-input bg-background text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  checked={compress}
                  onChange={(e) => setCompress(e.target.checked)}
                />
                <label htmlFor="compress" className="ml-2 text-sm text-foreground">
                  Apply Draco compression
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="simplify"
                  className="h-4 w-4 rounded border-input bg-background text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  checked={simplify}
                  onChange={(e) => setSimplify(e.target.checked)}
                />
                <label htmlFor="simplify" className="ml-2 text-sm text-foreground">
                  Simplify geometry
                </label>
              </div>
            </div>
            
            <button
              onClick={optimizeGltf}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Optimize
            </button>
            
            {gltfError && (
              <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-md">
                {gltfError}
              </div>
            )}
            
            {gltfResult && (
              <div className="mt-4 p-4 bg-muted rounded-md">
                <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(gltfResult, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>

        {/* Analyze Model Tool */}
        <div className="mb-12 p-6 border border-border rounded-lg">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-foreground">analyze_model</h2>
            <p className="text-muted-foreground">Analyze a 3D model and return statistics</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="model-content" className="block text-sm font-medium text-foreground">
                Model Content:
              </label>
              <textarea
                id="model-content"
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                rows={5}
                value={modelContent}
                onChange={(e) => setModelContent(e.target.value)}
                placeholder="Paste model content here"
              />
            </div>
            
            <div>
              <label htmlFor="model-format" className="block text-sm font-medium text-foreground">
                Format:
              </label>
              <select
                id="model-format"
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={modelFormat}
                onChange={(e) => setModelFormat(e.target.value as 'gltf' | 'svg')}
              >
                <option value="gltf">GLTF</option>
                <option value="svg">SVG</option>
              </select>
            </div>
            
            <button
              onClick={analyzeModel}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Analyze
            </button>
            
            {modelError && (
              <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-md">
                {modelError}
              </div>
            )}
            
            {modelResult && (
              <div className="mt-4 p-4 bg-muted rounded-md">
                <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(modelResult, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
