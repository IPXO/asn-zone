import globalJson from '../../../../data/current/global.json';

// Make this a static asset during export
export const dynamic = 'force-static';

export async function GET() {
  return Response.json(globalJson);
}
