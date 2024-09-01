import { cn } from '@/lib/utils';
import {
	ClerkProvider,
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton,
} from '@clerk/nextjs';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { user_sign_in } from '@/server/auth';
import Navbar from '@/components/navbar';

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
});

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	await user_sign_in();

	return (
		<ClerkProvider>
			<html lang="en">
				<body
					className={cn(
						'min-h-screen w-screen overflow-x-hidden bg-background font-sans antialiased',
						fontSans.variable,
					)}
				>
					<Navbar />
					{/* <SignedOut>
						<SignInButton />
					</SignedOut>
					<SignedIn>
						<UserButton />
					</SignedIn> */}
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
