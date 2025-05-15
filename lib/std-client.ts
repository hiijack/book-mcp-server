import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

async function main() {
  const transport = new StdioClientTransport({
    command: 'tsx',
    args: ['--env-file', '.env', 'lib/std.ts'],
  });

  const client = new Client({
    name: 'std-client',
    version: '1.0.0',
  });

  await client.connect(transport);

  const result = await client.callTool({
    name: 'get-book',
    arguments: {
      type: ['历史'],
    },
  });
  console.log(result);

  await client.close();
}

main();
