import { SignJWT } from 'jose';

export async function POST(req: Request, res: Response) {
  const { user } = await req.json();
  if (!user) {
    return Response.json({ message: 'user require' }, { status: 400 });
  }
  if (user !== process.env.MCP_USER) {
    return Response.json({ message: 'user fail' }, { status: 401 });
  }
  console.log(`user:${user} get new token`);
  const access_token = await new SignJWT({ user })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));

  return Response.json({ code: 0, message: 'success', data: { access_token } });
}
