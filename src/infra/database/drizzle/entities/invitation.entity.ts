import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { organization } from "./organization.entity";
import { user } from "./user.entity";

export const invitation = pgTable("invitation", {
	id: text("id").primaryKey(),
	organizationId: text("organization_id")
		.notNull()
		.references(() => organization.id, { onDelete: "cascade" }),
	email: text("email").notNull(),
	role: text("role"),
	status: text("status").default("pending").notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	inviterId: text("inviter_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export type CreateInvitation = typeof invitation.$inferInsert;
export type SelectInvitation = typeof invitation.$inferSelect;
