import dotenv from 'dotenv'
dotenv.config()
import { initDatabase } from './db/init.js'
import { app } from './app.js'

try {
  await initDatabase()
  const PORT = process.env.PORT || 8080
  app.listen(PORT, '0.0.0.0', () => {
    console.info(`express server running on http://localhost:${PORT}`)
  })
} catch (err) {
  console.error('error connecting to database:', err)
}
