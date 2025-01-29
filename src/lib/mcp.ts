import { use_mcp_tool as mcpTool } from '@modelcontextprotocol/sdk/client';

export async function use_mcp_tool(serverName: string, toolName: string, args: any) {
  try {
    const result = await mcpTool(serverName, toolName, args);
    return result;
  } catch (error) {
    console.error('MCP Tool Error:', error);
    throw error;
  }
}

export async function callModelConverterTool(toolName: string, args: any) {
  return use_mcp_tool('model-converter', toolName, args);
}
