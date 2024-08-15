import { auth, currentUser } from '@clerk/nextjs/server';

export default async function Home() {
	const { userId, getToken } = auth();
	const user = await currentUser();

	return (
		<main className="flex flex-col items-center justify-between p-24">
			<span>{userId}</span>
			<span>{await getToken()}</span>
			<span>{user?.fullName}</span>
		</main>
	);
}
