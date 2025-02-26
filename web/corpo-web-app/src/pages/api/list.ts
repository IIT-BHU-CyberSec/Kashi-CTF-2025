import { NextApiRequest, NextApiResponse } from 'next'
import { initDB } from '../../lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'HTTP 405: Method not supported' })
  }
  
  try {
    const db = await initDB()
    // Return corporate requests (excluding flags)
    const query = `SELECT employee_name, request_detail, status, department, role, email FROM requests WHERE status = 'pending'`
    const users = await db.all(query)
    res.status(200).json(users)
  } catch {
    res.status(500).json({ error: 'Internal Server Error: Database communication failed' })
  }
}