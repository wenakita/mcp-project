import { NextRequest, NextResponse } from 'next/server';
import { use_mcp_tool } from '@/lib/mcp';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { server, tool, args } = body;

        if (!server || !tool || !args) {
            return NextResponse.json(
                { error: 'Missing required parameters' },
                { status: 400 }
            );
        }

        const result = await use_mcp_tool(server, tool, args);
        return NextResponse.json(result);
    } catch (error) {
        console.error('MCP API Error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Unknown error occurred' },
            { status: 500 }
        );
    }
}
