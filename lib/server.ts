import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { fetchBook, fetchPopularBook } from './data';

// todo add find the most popular book
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
      console.log(type); // todo type array
      try {
        const data = await fetchBook(type[0]);
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

  server.tool('get-popular-book', '查找热门的、最受欢迎的、最多人看的书', {}, async () => {
    try {
      const data = await fetchPopularBook();
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
  });

  return server;
}
