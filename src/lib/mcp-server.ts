interface MCPToolResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export async function use_mcp_tool(serverName: string, toolName: string, args: any): Promise<MCPToolResponse> {
  try {
    // Get the MCP server URL from environment variable or use default
    const mcpServerUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}/api/mcp`
      : 'http://localhost:3000/api/mcp';

    const response = await fetch(mcpServerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        serverName,
        toolName,
        args
      }),
    });

    if (!response.ok) {
      throw new Error(`MCP server error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error using MCP tool:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
