interface MCPToolResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export async function use_mcp_tool(serverName: string, toolName: string, args: any): Promise<MCPToolResponse> {
  try {
    // Get MCP server configuration from environment variables
    const host = process.env.MCP_SERVER_HOST || '127.0.0.1';
    const port = process.env.MCP_SERVER_PORT || '3000';
    const mcpServerUrl = `http://${host}:${port}/mcp/${serverName}/${toolName}`;

    const response = await fetch(mcpServerUrl, {
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
