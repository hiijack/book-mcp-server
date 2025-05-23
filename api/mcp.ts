import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { IncomingMessage, ServerResponse } from 'http';
import { getServer } from '../lib/server';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
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
    console.log('create new MCP connection');
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
}
