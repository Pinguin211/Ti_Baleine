ALTER TABLE "creneaux" ADD COLUMN "navires" text[] DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "creneaux" ADD COLUMN "capacite_maximale" integer;