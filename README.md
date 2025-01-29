# MCP Inspector and Tools

A Next.js application that provides a web interface for Model Context Protocol (MCP) tools and model conversion utilities.

## Features

- MCP Inspector interface for interacting with MCP tools
- SVG to GLTF conversion
- GLTF optimization with Draco compression
- 3D model analysis
- Built-in model viewer

## Project Structure

```
mcp-project/
├── public/
│   ├── draco/          # Draco compression library
│   ├── models/         # 3D model files and viewer
│   └── scripts/        # Model conversion utilities
├── src/
│   ├── app/           # Next.js app directory
│   ├── api/           # API routes
│   └── lib/           # Utility functions
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000/mcp-inspector](http://localhost:3000/mcp-inspector) in your browser.

## Tools

### MCP Inspector
Web interface for interacting with MCP tools. Access it at `/mcp-inspector`.

### Model Conversion
Utilities for converting and optimizing 3D models:
- SVG to GLTF conversion
- GLTF optimization with Draco compression
- Model analysis and statistics

## Technologies

- Next.js 14
- TypeScript
- Tailwind CSS
- Model Context Protocol SDK
