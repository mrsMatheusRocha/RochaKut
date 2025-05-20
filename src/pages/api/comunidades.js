import { SiteClient } from 'datocms-client';

export default async function requestReceiver(request, response) {
  if (request.method === 'POST') {
    const TOKEN = '883cfdf461b056058be8d759df3594';
    const client = new SiteClient(TOKEN);
  
    const record = await client.items.create({
      itemType: 'dg99XyMHTgaR5sKTg-zFaA',
      ...request.body 
    })
  
    response.json({
      record: record
    })
  }
}