import { openDb } from '@/infra/Db/SQLite/helpers/SQLiteHelper';

void openDb().then(async () => {
  const app = (await import('./config/App')).default
  app.listen(3000, () => { console.log('Server running at http://localhost:3000'); })
}).catch(console.error)
