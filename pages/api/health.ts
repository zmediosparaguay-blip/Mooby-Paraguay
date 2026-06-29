import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  status: string
  timestamp: string
  version: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  })
}
