import { next } from '@vercel/edge';
import { jwtVerify } from 'jose';

export const config = {
  matcher: '/mcp',
};

export default async function middleware(request: Request) {
  const authorization = request.headers.get('authorization');
  if (!authorization) {
    return Response.json(
      { message: 'authentication required' },
      {
        status: 401,
      }
    );
  }
  
  try {
    const token = authorization.split(' ')[1];
    const data = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    console.log(data);
    return next();
  } catch (error) {
    console.log('jwt verify fail: ', error);
    return Response.json(
      { message: 'token expired' },
      {
        status: 401,
      }
    );
  }
}
