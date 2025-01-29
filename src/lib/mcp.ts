export interface MCPToolResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export async function callModelConverterTool(toolName: string, args: any): Promise<MCPToolResponse> {
  try {
    // Get the base URL from window.location or use default
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const response = await fetch(`${baseUrl}/api/mcp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        serverName: 'model-converter',
        toolName,
        args
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Error using model converter:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
