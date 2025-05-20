import { SiteClient } from 'datocms-client';

export default async function requestReceiver(request, response) {
  if (request.method === 'POST') {
    const TOKEN = '883cfdf461b056058be8d759df3594';
    const client = new SiteClient(TOKEN);

    const recordThougths = await client.item.create({
      itemType: 'fI7EUjlYR5q-VckkV_gPog',
      ...request.body
    })
  
    response.json({
      recordThougths: recordThougths
    })
  }
}