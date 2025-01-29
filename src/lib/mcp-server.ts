interface MCPToolResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export async function use_mcp_tool(serverName: string, toolName: string, args: any): Promise<MCPToolResponse> {
  try {
    // For server-side MCP calls, we need to connect to the local MCP server
    const response = await fetch(`http://127.0.0.1:3000/mcp/${serverName}/${toolName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    });

    if (!response.ok) {
      throw new Error(`MCP server error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Error using MCP tool:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
