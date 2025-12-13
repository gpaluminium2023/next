'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { ThemeName, themes } from '@/lib/theme-config';

const STORAGE_KEY = 'gpa-active-theme';

const THEME_ORDER: ThemeName[] = [
	'default',
	'christmas',
	'new-year',
	'valentine',
	'easter',
	'independence',
	'black-friday',
];

function applyThemeClass(name: ThemeName) {
	if (typeof document === 'undefined') return;
	const body = document.body;

	Object.values(themes).forEach((config) => {
		body.classList.remove(config.bodyClass);
	});

	body.classList.add(themes[name].bodyClass);
}

export function ThemeToggle() {
	const [current, setCurrent] = useState<ThemeName | null>(null);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);

		if (typeof window === 'undefined') return;

		let next: ThemeName = 'default';
		try {
			const stored = localStorage.getItem(
				STORAGE_KEY
			) as ThemeName | null;
			if (stored && themes[stored]) {
				next = stored;
			} else {
				const detected = (Object.entries(themes).find(([_, config]) =>
					document.body.classList.contains(config.bodyClass)
				)?.[0] || 'default') as ThemeName;
				next = detected;
			}
		} catch {
			// ignore
		}

		setCurrent(next);
		applyThemeClass(next);
	}, []);

	const handleClick = () => {
		setCurrent((prev) => {
			const active = prev ?? 'default';
			const index = THEME_ORDER.indexOf(active);
			const next =
				THEME_ORDER[
					(index + 1 + THEME_ORDER.length) % THEME_ORDER.length
				];

			applyThemeClass(next);
			try {
				localStorage.setItem(STORAGE_KEY, next);
			} catch {
				// ignore
			}

			return next;
		});
	};

	const label = mounted && current ? themes[current].label : 'Theme';

	return (
		<Button
			type='button'
			variant='outline'
			size='sm'
			onClick={handleClick}
			className='inline-flex items-center gap-2 text-[11px] sm:text-xs'
			aria-label={`Change colour theme (current: ${label})`}
		>
			<span className='inline-block h-2 w-2 rounded-full bg-primary' />
			<span>{label}</span>
		</Button>
	);
}
