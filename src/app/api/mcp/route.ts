import { NextRequest, NextResponse } from 'next/server'
import { use_mcp_tool } from '@/lib/mcp-server'

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

    const result = await use_mcp_tool(serverName, toolName, args)
    return NextResponse.json(result)
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
