'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
import { cn } from '@/lib/utils';
import { siteNav, isNavGroup } from '@/lib/site-nav';

function isActive(pathname: string, href: string) {
	if (href === '/') return pathname === '/';
	return pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileNav() {
	const pathname = usePathname();

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant='ghost'
					size='icon'
					className='lg:hidden'
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
				className='flex w-full flex-col gap-6 overflow-y-auto sm:max-w-sm'
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

				<nav className='flex flex-col gap-4 pb-6 text-sm'>
					{siteNav.map((entry) => {
						if (!isNavGroup(entry)) {
							return (
								<SheetClose
									key={entry.href}
									asChild
								>
									<Link
										href={entry.href}
										aria-current={
											isActive(pathname, entry.href) ? 'page' : undefined
										}
										className={cn(
											'font-heading rounded-sm px-2 py-2 text-sm font-bold uppercase tracking-wide transition-colors hover:bg-muted',
											isActive(pathname, entry.href)
												? 'bg-muted text-foreground'
												: 'text-foreground',
										)}
									>
										{entry.label}
									</Link>
								</SheetClose>
							);
						}

						return (
							<div key={entry.label}>
								<p className='font-heading px-2 pb-1 text-xs font-bold uppercase tracking-widest text-accent'>
									{entry.label}
								</p>
								<div className='flex flex-col'>
									{entry.items.map((item) => (
										<SheetClose
											key={item.href}
											asChild
										>
											<Link
												href={item.href}
												aria-current={
													isActive(pathname, item.href) ? 'page' : undefined
												}
												className={cn(
													'rounded-sm px-2 py-2 text-sm transition-colors hover:bg-muted',
													isActive(pathname, item.href)
														? 'bg-muted font-medium text-foreground'
														: 'text-muted-foreground',
												)}
											>
												{item.label}
											</Link>
										</SheetClose>
									))}
								</div>
							</div>
						);
					})}
				</nav>
			</SheetContent>
		</Sheet>
	);
}
