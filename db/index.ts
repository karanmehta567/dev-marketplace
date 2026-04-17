import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

if(!process.env.DATABASE_URL){
    throw new Error("No URL For DB")
}
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });
