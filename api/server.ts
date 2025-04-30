import { FastMCP } from 'fastmcp';
import { z } from 'zod';

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
  execute: async (args) => {
    // todo
    console.log(args);
    return JSON.stringify([{ name: '咖啡的历史', description: '介绍咖啡' }]);
  },
});

server.start({
  transportType: 'sse',
  sse: {
    endpoint: '/sse',
    port: 80
  },
});
