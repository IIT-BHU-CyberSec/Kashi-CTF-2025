import { NextApiRequest, NextApiResponse } from 'next'
import { initDB } from '../../lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'HTTP 405: Method not supported' })
  }

  const { filter, name } = req.body

  try {
    const db = await initDB()
    let query: string
    let results: any[]

    if (name) {
      // Safe search by name, combined with pending status
      query = `SELECT employee_name, request_detail, status, department, role, email 
               FROM requests 
               WHERE status = 'pending' AND employee_name LIKE ?`
      console.log('Executing safe search query:', query)
      results = await db.all(query, [`%${name}%`])
    } else {
      // Apply department filter with pending status condition
      query = filter 
        ? `SELECT employee_name, request_detail, status, department, role, email 
           FROM requests 
           WHERE status = 'pending' AND department LIKE '%${filter}%'`
        : `SELECT employee_name, request_detail, status, department, role, email 
           FROM requests 
           WHERE status = 'pending'`
      console.log('Executing filter query:', query)
      results = await db.all(query)
    }

    res.status(200).json(results)
  } catch {
    res.status(500).json({ error: 'Internal Server Error: Database communication failed' })
  }
}
