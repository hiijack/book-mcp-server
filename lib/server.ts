import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { z } from 'zod';
import { fetchBook } from './data';

export function getServer() {
  const server = new McpServer({
    name: 'book-searching-mcp-server',
    version: '0.0.1',
  });

  server.tool(
    'get-book',
    '根据类型查找书，类型为中文',
    {
      type: z.string().array(),
    },
    async ({ type }) => {
      console.log(type);
      try {
        const data = await fetchBook(type[0]);
        console.log(data);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(data),
            },
          ],
        };
      } catch (error) {
        console.log('call tool error:', error);
        return {
          content: [
            {
              type: 'text',
              text: 'failed to get book',
            },
          ],
        };
      }
    }
  );
  return server;
}
