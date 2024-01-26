import { db } from "@/app/lib/db";
import "dotenv/config";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";

migrate(db, { migrationsFolder: "./db/migrations" });
