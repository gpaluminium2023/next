import Link from 'next/link';
import { Facebook, Instagram, Mail, MessageCircle } from 'lucide-react';

import { Separator } from '@/components/ui/separator';

export function SiteFooter() {
	return (
		<footer className='w-full border-t border-border bg-muted/30'>
			<div className='mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
					<div className='lg:col-span-2'>
						<h3 className='text-lg font-semibold text-foreground'>
							Gods Promise Aluminium
						</h3>
						<p className='mt-3 text-sm leading-relaxed text-muted-foreground'>
							Nigeria&apos;s trusted provider of premium aluminium
							roofing and construction materials. We help
							homeowners, builders, and churches protect what
							matters most with durable, beautiful roofs.
						</p>
					</div>

					<div>
						<h4 className='text-sm font-semibold text-foreground'>
							Quick links
						</h4>
						<ul className='mt-3 space-y-2 text-sm'>
							<li>
								<Link
									href='/'
									className='text-muted-foreground transition-colors hover:text-foreground'
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									href='/about'
									className='text-muted-foreground transition-colors hover:text-foreground'
								>
									About us
								</Link>
							</li>
							<li>
								<Link
									href='/services'
									className='text-muted-foreground transition-colors hover:text-foreground'
								>
									Services
								</Link>
							</li>
							<li>
								<Link
									href='/contact'
									className='text-muted-foreground transition-colors hover:text-foreground'
								>
									Contact
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className='text-sm font-semibold text-foreground'>
							Products
						</h4>
						<ul className='mt-3 space-y-2 text-sm'>
							<li>
								<Link
									href='/products#roofing'
									className='text-muted-foreground transition-colors hover:text-foreground'
								>
									Aluminium roofing sheets
								</Link>
							</li>
							<li>
								<Link
									href='/products#stone-coated'
									className='text-muted-foreground transition-colors hover:text-foreground'
								>
									Stone coated tiles
								</Link>
							</li>
							<li>
								<Link
									href='/products#accessories'
									className='text-muted-foreground transition-colors hover:text-foreground'
								>
									Roofing accessories
								</Link>
							</li>
							<li>
								<Link
									href='/products'
									className='text-muted-foreground transition-colors hover:text-foreground'
								>
									View all products
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className='text-sm font-semibold text-foreground'>
							Contact & social
						</h4>
						<ul className='mt-3 space-y-2 text-sm'>
							<li className='flex items-center gap-2 text-muted-foreground'>
								<Mail className='h-4 w-4' />
								<a
									href='mailto:godspromisealuminumconceptltd@gmail.com'
									className='transition-colors hover:text-foreground'
								>
									godspromisealuminumconceptltd@gmail.com
								</a>
							</li>
							<li className='flex items-center gap-2 text-muted-foreground'>
								<MessageCircle className='h-4 w-4' />
								<a
									href='https://wa.me/2349150459964'
									target='_blank'
									rel='noopener'
									className='transition-colors hover:text-foreground'
								>
									WhatsApp: +234 5150459964
								</a>
							</li>
							<li className='flex items-center gap-2 text-muted-foreground'>
								<Instagram className='h-4 w-4' />
								<a
									href='https://www.instagram.com/godspacltd?igsh=dWxybXJrOTBhbXJi'
									target='_blank'
									rel='noopener'
									className='transition-colors hover:text-foreground'
								>
									Instagram
								</a>
							</li>
							<li className='flex items-center gap-2 text-muted-foreground'>
								<Facebook className='h-4 w-4' />
								<a
									href='https://www.facebook.com/share/1G88rStYo2/?mibextid=wwXIfr'
									target='_blank'
									rel='noopener'
									className='transition-colors hover:text-foreground'
								>
									Facebook
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<Separator className='bg-border' />

			<div className='mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8'>
				<div className='flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row'>
					<p>
						© {new Date().getFullYear()} Gods Promise Aluminium.
						Quality roofing, reliable service.
					</p>
					<p>Made in Nigeria 🇳🇬</p>
				</div>
			</div>
		</footer>
	);
}
