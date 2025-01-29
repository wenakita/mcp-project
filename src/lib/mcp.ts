interface MCPToolResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export async function use_mcp_tool(serverName: string, toolName: string, args: any): Promise<MCPToolResponse> {
  try {
    // Get the base URL from window.location
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const response = await fetch(`${baseUrl}/api/mcp`, {
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
      throw new Error(`HTTP error! status: ${response.status}`);
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

export async function callModelConverterTool(toolName: string, args: any) {
  return use_mcp_tool('model-converter', toolName, args);
}
