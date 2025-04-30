import postgres from 'postgres';
import { Book } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const ITEMS_PER_PAGE = 7;
export async function fetchBook(query: string, currentPage: number = 1) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const data = await sql<Book[]>`SELECT * FROM book
      WHERE book.name ILIKE ${`%${query}%`} OR
        book.tag::text ILIKE ${`%${query}%`}
      ORDER BY book.date desc
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch book data.');
  }
}
