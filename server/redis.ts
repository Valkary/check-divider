'use server';
import { Redis } from '@upstash/redis';
import { v4 as uuid } from 'uuid';

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL,
	token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export type Role = 'employee' | 'admin' | 'user' | 'employer';
export type Item = { name: string; price: number; qtty: number };
export type Check = Item[];

export async function create_user(
	user_id: string,
	role: Role,
	restaurant_id?: string,
) {
	try {
		await redis.hset(`user:${user_id}`, {
			role,
			...(restaurant_id ? { restaurant_id } : {}),
			timestamp: new Date().getTime(),
		});
		return true;
	} catch (err) {
		console.error(err);
		return false;
	}
}

export async function create_check(restaurant_id: string, check: Check) {
	const check_id = uuid();

	try {
		await redis.lpush(`check:${restaurant_id}:${check_id}`, {
			check,
			timestamp: new Date().getTime(),
		});
		return true;
	} catch (err) {
		console.error(err);
		return false;
	}
}

export async function create_restaurant(name: string, location: string) {
	const restaurant_id = uuid();

	try {
		await redis.hset(`restaurant:${restaurant_id}`, { name, location });
		return true;
	} catch (err) {
		console.error(err);
		return false;
	}
}

export async function add_restaurant_employee(
	restaurant_id: string,
	employee_id: string,
) {
	try {
		await redis.sadd(`restaurant:${restaurant_id}:employees`, employee_id);
		return true;
	} catch (err) {
		console.error(err);
		return false;
	}
}

export async function get_restaurant_checks(restaurant_id: string) {
	try {
		return {
			success: true,
			checks: await redis.scan(0, {
				count: 100,
				match: `check:${restaurant_id}:*`,
			}),
		};
	} catch (err) {
		console.error(err);
		return {
			success: false,
		};
	}
}
