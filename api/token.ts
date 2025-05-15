import { SignJWT } from 'jose';

export async function POST(req: Request, res: Response) {
  const { user } = await req.json();
  console.log(user);
  if (!user) {
    return Response.json({ message: 'user require' }, { status: 400 });
  }
  if (user !== process.env.MCP_USER) {
    return Response.json({ message: 'user fail' }, { status: 401 });
  }
  const access_token = await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));

  console.log(access_token);

  return Response.json({ code: 0, message: 'success', data: { access_token } });
}
