import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
    id: integer('id').primaryKey({ autoIncrement: true }), // not sure if theres a predetermined user id. 
    discordUserId: text('discord_user_id').unique(),
    discordUsername: text('discord_username').unique(),
    discordAvatar: text('discord_avatar'),
});

export const createSessionRequest = sqliteTable("create_session_request", {
    sessionID: text("session_id").primaryKey(), // no without rowid support in drizzle
    discordUserID: text("discord_user_id"),
    discordUsername: text("discord_username"),
    discordAvatar: text("discord_avatar"),
});

export const submission = sqliteTable("submission", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    formID: text("form_id"),
    userID: integer("user_id").references(() => user.id),
    data: text("data"),
    submittedAt: integer("submitted_at").default(sql`null`), //unix timestamp in milliseconds. null if draft.
    
});

export const createUserRequest = sqliteTable("create_user_request", {
    sessionID: text("session_id"),
    discordUserID: text("discord_user_id"),
    discordUsername: text("discord_username"),
    discordAvatar: text("discord_avatar"),
});

