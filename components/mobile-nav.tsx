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
	{ href: '/store', label: 'Store' },
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
				<div className='flex flex-col gap-2 px-2'>
					<SheetClose asChild>
						<Button
							asChild
							className='bg-accent font-heading font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent/90'
						>
							<Link href='/store'>Shop Online</Link>
						</Button>
					</SheetClose>
					<SheetClose asChild>
						<Button
							asChild
							variant='outline'
							className='font-heading font-bold uppercase tracking-wide'
						>
							<Link href='/contact'>Get a Quote</Link>
						</Button>
					</SheetClose>
				</div>
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
