// pages/api/login.js

import { query, testDatabaseConnection } from '../../lib/db'; // Your database-related functions

export default async function handler(req, res) {
  await testDatabaseConnection();

  if (req.method === 'POST') {
    const { sql, values } = req.body;

    try {
      const result = await query({
        query: sql,
        values: values,
      });

      res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.error('Error executing query:', error);
      console.error('Values:', values);
      res.status(500).json({ success: false, data: result, message: 'Internal Server Error: ' + error.message });
    }
  } else {
    res.status(405).json({ success: false, data: result, message: 'Method Not Allowed' });
  }
}
