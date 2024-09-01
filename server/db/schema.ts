import {
	boolean,
	integer,
	numeric,
	pgTable,
	serial,
	text,
	varchar,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	last_names: text('last_names').notNull(),
});

export const owners = pgTable('owners', {
	id: serial('id').primaryKey().unique(),
	user_id: text('user_id')
		.references(() => users.id)
		.notNull(),
	phone: varchar('phone', { length: 256 }).notNull(),
});

export const restaurants = pgTable('restaurants', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	owner_id: integer('owner_id')
		.references(() => owners.id)
		.notNull(),
});

export const employee_roles = pgTable('employee_roles', {
	id: serial('id').primaryKey(),
	can_create_employee: boolean('can_create_employee')
		.notNull()
		.$default(() => false),
	can_delete_employee: boolean('can_delete_employee')
		.notNull()
		.$default(() => false),
	can_create_check: boolean('can_create_check')
		.notNull()
		.$default(() => false),
	can_delete_check: boolean('can_delete_check')
		.notNull()
		.$default(() => false),
	can_validate_cash_input: boolean('can_validate_cash_input')
		.notNull()
		.$default(() => false),
	can_mark_check_as_completed: boolean('can_mark_check_as_completed')
		.notNull()
		.$default(() => false),
});

export const employees = pgTable('employees', {
	id: serial('id').primaryKey(),
	user_id: text('user_id')
		.references(() => users.id)
		.notNull(),
	restaurant_id: integer('restaurant_id')
		.references(() => restaurants.id)
		.notNull(),
	role_id: integer('role_id')
		.references(() => employee_roles.id)
		.notNull(),
});

export const checks = pgTable('checks', {
	id: serial('id').primaryKey(),
	restaurant_id: integer('restaurant_id')
		.references(() => restaurants.id)
		.notNull(),
});

export const check_items = pgTable('check_items', {
	id: serial('id').primaryKey(),
	check_id: serial('check_id')
		.references(() => checks.id)
		.notNull(),
	name: text('name').notNull(),
	qtty: integer('qtty').notNull(),
	price: numeric('price', { precision: 2 }),
});
