CREATE TYPE "public"."activite_enum" AS ENUM('BALEINES', 'DAUPHINS', 'PRIVATISATION_TIKAP', 'PRIVATISATION_GRAND_BLEU');--> statement-breakpoint
CREATE TYPE "public"."canal_paiement_enum" AS ENUM('EN_LIGNE', 'SUR_PLACE_CB');--> statement-breakpoint
CREATE TYPE "public"."port_enum" AS ENUM('SAINT_GILLES', 'SAINT_LEU');--> statement-breakpoint
CREATE TYPE "public"."role_enum" AS ENUM('CLIENT', 'ADMIN');--> statement-breakpoint
CREATE TYPE "public"."statut_emission_facture_enum" AS ENUM('EN_ATTENTE', 'ENVOYEE_SUCCES', 'ECHEC_ENVOI');--> statement-breakpoint
CREATE TYPE "public"."statut_reservation_enum" AS ENUM('EN_ATTENTE_PAIEMENT', 'PAYEE_PARTIELLEMENT', 'PAYEE_COMPLETEMENT', 'ANNULEE');--> statement-breakpoint
CREATE TYPE "public"."type_billet_enum" AS ENUM('ADULTE', 'ENFANT', 'PRIVATISATION');--> statement-breakpoint
CREATE TYPE "public"."type_paiement_enum" AS ENUM('ACOMPTE', 'SOLDE');--> statement-breakpoint
CREATE TABLE "alertes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"message" text NOT NULL,
	"date_emission" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "billets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reservation_id" uuid NOT NULL,
	"type_billet" "type_billet_enum" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "creneaux" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"date" date NOT NULL,
	"heure_depart" time NOT NULL,
	"port" "port_enum" NOT NULL,
	"activite" "activite_enum" NOT NULL,
	"est_ouvert" boolean DEFAULT true NOT NULL,
	"sous_pre_alerte" boolean DEFAULT false NOT NULL,
	"alerte_id" uuid,
	CONSTRAINT "uq_creneau_port_date_heure_activite" UNIQUE("port","date","heure_depart","activite")
);
--> statement-breakpoint
CREATE TABLE "paiements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reservation_id" uuid NOT NULL,
	"type_paiement" "type_paiement_enum" NOT NULL,
	"canal_paiement" "canal_paiement_enum" NOT NULL,
	"reference_transaction" varchar(100) NOT NULL,
	"montant" numeric(10, 2) NOT NULL,
	"date_paiement" timestamp with time zone DEFAULT now() NOT NULL,
	"reference_facture" varchar(50) NOT NULL,
	"statut_emission_facture" "statut_emission_facture_enum" DEFAULT 'EN_ATTENTE' NOT NULL,
	"date_emission_facture" timestamp with time zone,
	CONSTRAINT "paiements_reference_transaction_unique" UNIQUE("reference_transaction"),
	CONSTRAINT "paiements_reference_facture_unique" UNIQUE("reference_facture"),
	CONSTRAINT "uq_paiement_reservation_type" UNIQUE("reservation_id","type_paiement")
);
--> statement-breakpoint
CREATE TABLE "reservations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reference" varchar(20) NOT NULL,
	"statut" "statut_reservation_enum" DEFAULT 'EN_ATTENTE_PAIEMENT' NOT NULL,
	"creneau_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"date_creation" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "reservations_reference_unique" UNIQUE("reference")
);
--> statement-breakpoint
CREATE TABLE "tokens_paiement_solde" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reservation_id" uuid NOT NULL,
	"token" varchar(255) NOT NULL,
	"date_creation" timestamp with time zone DEFAULT now() NOT NULL,
	"date_expiration" timestamp with time zone NOT NULL,
	"est_utilise" boolean DEFAULT false NOT NULL,
	CONSTRAINT "tokens_paiement_solde_reservation_id_unique" UNIQUE("reservation_id"),
	CONSTRAINT "tokens_paiement_solde_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nom" varchar(100) NOT NULL,
	"prenom" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"telephone" varchar(20) NOT NULL,
	"role" "role_enum" DEFAULT 'CLIENT' NOT NULL,
	"mot_de_passe" varchar(255),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "billets" ADD CONSTRAINT "billets_reservation_id_reservations_id_fk" FOREIGN KEY ("reservation_id") REFERENCES "public"."reservations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "creneaux" ADD CONSTRAINT "creneaux_alerte_id_alertes_id_fk" FOREIGN KEY ("alerte_id") REFERENCES "public"."alertes"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "paiements" ADD CONSTRAINT "paiements_reservation_id_reservations_id_fk" FOREIGN KEY ("reservation_id") REFERENCES "public"."reservations"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_creneau_id_creneaux_id_fk" FOREIGN KEY ("creneau_id") REFERENCES "public"."creneaux"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tokens_paiement_solde" ADD CONSTRAINT "tokens_paiement_solde_reservation_id_reservations_id_fk" FOREIGN KEY ("reservation_id") REFERENCES "public"."reservations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_billets_reservation_id" ON "billets" USING btree ("reservation_id");--> statement-breakpoint
CREATE INDEX "idx_creneaux_date_port" ON "creneaux" USING btree ("date","port");--> statement-breakpoint
CREATE INDEX "idx_creneaux_alerte_id" ON "creneaux" USING btree ("alerte_id");--> statement-breakpoint
CREATE INDEX "idx_paiements_reservation_id" ON "paiements" USING btree ("reservation_id");--> statement-breakpoint
CREATE INDEX "idx_reservations_creneau_id" ON "reservations" USING btree ("creneau_id");--> statement-breakpoint
CREATE INDEX "idx_reservations_user_id" ON "reservations" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_reservations_statut" ON "reservations" USING btree ("statut");--> statement-breakpoint
CREATE INDEX "idx_reservations_date_creation" ON "reservations" USING btree ("date_creation");--> statement-breakpoint
CREATE INDEX "idx_tokens_reservation_id" ON "tokens_paiement_solde" USING btree ("reservation_id");--> statement-breakpoint
CREATE INDEX "idx_tokens_date_expiration" ON "tokens_paiement_solde" USING btree ("date_expiration");