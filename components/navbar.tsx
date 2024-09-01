import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SignInButton, SignOutButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import { UserIcon } from 'lucide-react';
import { Button } from './ui/button';

export default function Navbar() {
	return (
		<nav className="absolute top-0 left-0 w-screen bg-gray-200 h-16 flex items-center px-10">
			<div className="flex flex-grow h-full items-center">Check Divider</div>
			<UserButton />
		</nav>
	);
}

export async function UserButton() {
	const user = await currentUser();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild={!!user}>
				<div className="flex justify-center items-center w-12 aspect-square overflow-hidden rounded-full">
					{user ? (
						<img
							src={user.imageUrl}
							alt="Profile"
							className="object-cover object-center"
						/>
					) : (
						<Button variant={'outline'} className="h-full w-full">
							<UserIcon size={100} />
						</Button>
					)}
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{user ? (
					<>
						<DropdownMenuLabel>{user.fullName}</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Perfil</DropdownMenuItem>
						<DropdownMenuItem>
							<SignOutButton>Cerrar sesion</SignOutButton>
						</DropdownMenuItem>
					</>
				) : (
					<>
						<DropdownMenuLabel>Anonimo</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<SignInButton>Iniciar sesion</SignInButton>
						</DropdownMenuItem>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
