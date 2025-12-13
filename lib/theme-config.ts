// Seasonal / business themes for the site.
// These map to CSS variable overrides defined in `app/globals.css`.

export type ThemeName =
	| 'default'
	| 'christmas'
	| 'new-year'
	| 'valentine'
	| 'easter'
	| 'independence'
	| 'black-friday';

export type ThemeConfig = {
	/** Human‑readable label for the theme */
	label: string;
	/** CSS class applied to the `<body>` element (e.g. `theme-christmas`) */
	bodyClass: string;
};

export const themes: Record<ThemeName, ThemeConfig> = {
	default: {
		label: 'Default',
		bodyClass: 'theme-default',
	},
	christmas: {
		label: 'Christmas',
		bodyClass: 'theme-christmas',
	},
	'new-year': {
		label: 'New Year',
		bodyClass: 'theme-new-year',
	},
	valentine: {
		label: 'Valentine',
		bodyClass: 'theme-valentine',
	},
	easter: {
		label: 'Easter',
		bodyClass: 'theme-easter',
	},
	independence: {
		label: 'Independence',
		bodyClass: 'theme-independence',
	},
	'black-friday': {
		label: 'Black Friday',
		bodyClass: 'theme-black-friday',
	},
};

// Choose a theme name based on the current date.
// This is a simple, readable mapping for key seasons.
export function getSeasonalThemeNameForDate(
	date: Date = new Date()
): ThemeName {
	const month = date.getMonth() + 1; // 1-12
	const day = date.getDate();

	// test
	if (month === 12 && day <= 9) {
		return 'independence';
	}

	// New Year: first week of January
	if (month === 1 && day <= 7) {
		return 'new-year';
	}

	// Valentine: around February 14th
	if (month === 2 && day >= 7 && day <= 15) {
		return 'valentine';
	}

	// Easter: approximate window in March/April
	if ((month === 3 && day >= 15) || (month === 4 && day <= 15)) {
		return 'easter';
	}

	// Nigerian Independence: first week of October
	if (month === 10 && day <= 7) {
		return 'independence';
	}

	// Black Friday: last 20 days of November
	if (month === 11 && day >= 10) {
		return 'black-friday';
	}

	// Christmas: second half of December
	if (month === 12 && day >= 15) {
		return 'christmas';
	}

	return 'default';
}

export function getActiveThemeForDate(date?: Date): ThemeConfig {
	const themeName = getSeasonalThemeNameForDate(date ?? new Date());
	return themes[themeName];
}
