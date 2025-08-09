import { pgTable, text } from "drizzle-orm/pg-core";
import { user } from "./user.entity";

export const twoFactor = pgTable("two_factor", {
	id: text("id").primaryKey(),
	secret: text("secret").notNull(),
	backupCodes: text("backup_codes").notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export type CreateTwoFactor = typeof twoFactor.$inferInsert;
export type SelectTwoFactor = typeof twoFactor.$inferSelect;
