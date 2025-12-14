'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';

const navItems = [
	{ href: '/', label: 'Home' },
	{ href: '/about', label: 'About' },
	{ href: '/products', label: 'Products' },
	{ href: '/services', label: 'Services' },
	{ href: '/gallery', label: 'Gallery' },
	{ href: '/blog', label: 'Blog' },
	{ href: '/contact', label: 'Contact' },
];

export function MobileNav() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant='ghost'
					size='icon'
					className='md:hidden'
					aria-label='Open navigation'
				>
					<Menu
						className='h-5 w-5'
						aria-hidden='true'
					/>
				</Button>
			</SheetTrigger>
			<SheetContent
				side='right'
				className='flex flex-col gap-6'
			>
				<SheetHeader className='mt-2 text-left'>
					<SheetTitle className='text-base font-semibold'>
						Gods Promise Aluminium
					</SheetTitle>
				</SheetHeader>
				<nav className='flex flex-col gap-2 text-sm'>
					{navItems.map((item) => (
						<SheetClose
							key={item.href}
							asChild
						>
							<Button
								asChild
								variant='ghost'
								className='justify-start px-2 font-medium text-foreground'
							>
								<Link href={item.href}>{item.label}</Link>
							</Button>
						</SheetClose>
					))}
				</nav>
			</SheetContent>
		</Sheet>
	);
}
