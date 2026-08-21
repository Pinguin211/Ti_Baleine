ALTER TABLE "reservations" ADD COLUMN "montant_total" numeric(10, 2) NOT NULL;--> statement-breakpoint
ALTER TABLE "reservations" ADD COLUMN "montant_acompte" numeric(10, 2) NOT NULL;