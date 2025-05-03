import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { IncomingMessage, ServerResponse } from 'http';
import { getServer } from '../lib/server';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const url = new URL(req.url, 'https://book-mcp-server.vercel.app');
  if (url.pathname === '/mcp') {
    if (req.method === 'GET') {
      console.log('Received GET MCP request');
      res.writeHead(405).end(
        JSON.stringify({
          message: 'method not allow',
        })
      );
    } else if (req.method === 'DELETE') {
      console.log('Received DELETE MCP request');
      res.writeHead(405).end(
        JSON.stringify({
          message: 'method not allow',
        })
      );
    } else {
      console.log('create new MCP connection:', req.url, req.headers, req.method);
      try {
        const server = getServer();
        const transport = new StreamableHTTPServerTransport({
          sessionIdGenerator: undefined,
        });
        res.on('close', () => {
          console.log('Request closed');
          transport.close();
          server.close();
        });
        await server.connect(transport);
        await transport.handleRequest(req, res);
      } catch (error) {
        console.error('Error handling MCP request:', error);
      }
    }
  } else if (url.pathname === '/sse') {
    // todo
  }
}
