# MCP Project

A comprehensive toolkit for converting, optimizing, and analyzing 3D models with a focus on performance and compatibility.

## Features

- **Model Conversion**
  - SVG to GLTF/GLB conversion
  - Support for multiple input formats
  - Batch processing capabilities

- **Model Optimization**
  - Draco compression integration
  - Mesh optimization and simplification
  - Texture compression and resizing
  - LOD (Level of Detail) generation

- **Analysis Tools**
  - Polygon count analysis
  - Texture memory usage
  - Performance metrics
  - Compatibility checking

- **Model Viewer**
  - Real-time 3D preview
  - Material and lighting adjustment
  - Animation playback
  - Scene composition tools

## Getting Started

### Prerequisites

```bash
# Install Node.js (v18 or higher recommended)
# Install required dependencies
npm install
```

### Installation

```bash
# Clone the repository
git clone https://github.com/wenakita/mcp-project.git

# Navigate to project directory
cd mcp-project

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Usage

```bash
# Convert an SVG file to GLTF
npm run convert -- input.svg output.gltf

# Optimize a GLTF model with Draco compression
npm run optimize -- input.gltf output.gltf --draco

# Analyze a 3D model
npm run analyze -- model.gltf

# Start the model viewer
npm run viewer
```

## Project Structure

```
mcp-project/
├── src/                    # Source files
│   ├── converters/        # Model conversion logic
│   ├── optimizers/        # Optimization tools
│   ├── analyzers/         # Analysis utilities
│   └── viewer/            # 3D viewer application
├── public/                # Static assets
├── tests/                 # Test files
└── docs/                  # Documentation
```

## Configuration

The project can be configured through environment variables or a config file:

```env
COMPRESSION_LEVEL=9        # Draco compression level (0-10)
TEXTURE_MAX_SIZE=2048     # Maximum texture size
ENABLE_ANALYTICS=true     # Enable usage analytics
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Three.js for 3D rendering capabilities
- Draco compression library
- Model optimization techniques from various open-source projects
