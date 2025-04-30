import { FastMCP } from 'fastmcp';
import { z } from 'zod';
import { fetchBook } from '../lib/data';

const server = new FastMCP({
  name: 'book-searching-mcp-server',
  version: '0.0.1',
});

server.addTool({
  name: 'get book',
  description: '根据类型查找书，类型为中文',
  parameters: z.object({
    type: z.string().array(),
  }),
  execute: async ({ type }) => {
    console.log(type);
    const data = await fetchBook(type[0]);
    console.log(data);
    return JSON.stringify(data);
  },
});

server.start({
  transportType: 'sse',
  sse: {
    endpoint: '/sse',
    port: 80
  },
});
