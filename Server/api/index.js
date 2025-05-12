import serverless from 'serverless-http'
import app from '../Server/servidor.js'

export const handler = serverless(app)
