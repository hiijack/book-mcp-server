import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { getServer } from './server';

async function main() {
  const server = getServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Book MCP Server running on stdio');
}

main();
