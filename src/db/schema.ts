import {
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const emergencyProfiles = pgTable("emergency_profiles", {
  id: serial("id").primaryKey(),
  emergencyId: uuid("emergency_id").defaultRandom().notNull().unique(),
  fullName: varchar("full_name", { length: 200 }).notNull(),
  bloodGroup: varchar("blood_group", { length: 10 }).notNull(),
  dateOfBirth: varchar("date_of_birth", { length: 32 }).notNull(),
  emergencyContactName: varchar("emergency_contact_name", {
    length: 200,
  }).notNull(),
  emergencyContactPhone: varchar("emergency_contact_phone", {
    length: 40,
  }).notNull(),
  allergies: text("allergies").notNull().default(""),
  medicalConditions: text("medical_conditions").notNull().default(""),
  importantInfo: text("important_info").notNull().default(""),
  city: varchar("city", { length: 120 }).notNull().default(""),
  photoUrl: text("photo_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type EmergencyProfile = typeof emergencyProfiles.$inferSelect;
export type NewEmergencyProfile = typeof emergencyProfiles.$inferInsert;
