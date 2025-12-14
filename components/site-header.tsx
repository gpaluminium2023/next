import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { MobileNav } from '@/components/mobile-nav';
import { ThemeToggle } from '@/components/theme-toggle';

const navItems = [
	{ href: '/', label: 'Home' },
	{ href: '/about', label: 'About' },
	{ href: '/products', label: 'Products' },
	{ href: '/services', label: 'Services' },
	{ href: '/gallery', label: 'Gallery' },
	{ href: '/blog', label: 'Blog' },
	{ href: '/contact', label: 'Contact' },
];

export function SiteHeader() {
	return (
		<header className='sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80'>
			<div className='mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8'>
				<Link
					href='/'
					className='flex items-center gap-2'
				>
					<span className='text-xl font-semibold tracking-tight text-foreground'>
						Gods Promise Aluminium
					</span>
				</Link>

				<nav className='hidden items-center gap-6 text-sm md:flex'>
					{navItems.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className='font-medium text-muted-foreground transition-colors hover:text-foreground'
						>
							{item.label}
						</Link>
					))}
				</nav>
				<div className='flex items-center gap-3'>
					<ThemeToggle />
					<div className='hidden md:block'>
						<Button asChild>
							<Link href='/contact'>Get a quote</Link>
						</Button>
					</div>
					<MobileNav />
				</div>
			</div>
		</header>
	);
}
