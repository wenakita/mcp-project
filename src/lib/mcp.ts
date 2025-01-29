export interface MCPToolResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export async function callModelConverterTool(toolName: string, args: any): Promise<MCPToolResponse> {
  try {
    // Use environment variable for API URL or fallback to relative path
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${apiUrl}/mcp`, {
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

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error using model converter:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
