import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { serverName, toolName, args } = body

    if (!serverName || !toolName) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    // For now, return a mock response since MCP server is local-only
    return NextResponse.json({
      success: true,
      data: {
        message: 'This is a mock response. The MCP server is only available in local development.',
        requestedServer: serverName,
        requestedTool: toolName,
        providedArgs: args
      }
    })
  } catch (error) {
    console.error('MCP API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    )
  }
}

// Enable CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
