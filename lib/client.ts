import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse.js';

const origin = 'https://book-mcp-server.vercel.app';

async function test() {
  let client: Client | undefined = undefined;
  try {
    client = new Client({
      name: 'streamable-http-client',
      version: '1.0.0',
    });
    const transport = new StreamableHTTPClientTransport(new URL(`${origin}/mcp`));
    await client.connect(transport);
    const result = await client.callTool({
      name: 'get-book',
      arguments: {
        type: ['历史'],
      },
    });
    console.log('Connected Streamable HTTP transport');
    console.log(result);
  } catch (error) {
    // If that fails with a 4xx error, try the older SSE transport
    console.log('fall back to SSE transport');
    client = new Client({
      name: 'sse-client',
      version: '1.0.0',
    });
    const sseTransport = new SSEClientTransport(new URL(`${origin}/sse`));
    await client.connect(sseTransport);
    console.log('Connected SSE');
  }
}

test();
