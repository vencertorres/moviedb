CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "watchlist" (
	"id" serial PRIMARY KEY NOT NULL,
	"movie_id" integer NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "watchlist" ADD CONSTRAINT "watchlist_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
