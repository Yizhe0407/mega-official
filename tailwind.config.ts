import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		extend: {
			colors: {
				background: '#ffffff',
				foreground: '#18181b',
				card: {
					DEFAULT: '#ffffff',
					foreground: '#18181b'
				},
				popover: {
					DEFAULT: '#ffffff',
					foreground: '#18181b'
				},
				primary: {
					DEFAULT: '#18181b',
					foreground: '#ffffff'
				},
				secondary: {
					DEFAULT: '#f4f4f5',
					foreground: '#18181b'
				},
				muted: {
					DEFAULT: '#f4f4f5',
					foreground: '#71717a'
				},
				accent: {
					DEFAULT: '#f4f4f5',
					foreground: '#18181b'
				},
				destructive: '#ef4444',
				'destructive-foreground': '#ffffff',
				border: '#e4e4e7',
				input: '#e4e4e7',
				ring: '#18181b',
				chart: {
					'1': '#60a5fa',
					'2': '#f472b6',
					'3': '#34d399',
					'4': '#fbbf24',
					'5': '#a78bfa'
				},
				sidebar: {
					DEFAULT: '#18181b',
					foreground: '#ffffff',
					primary: '#18181b',
					'primary-foreground': '#ffffff',
					accent: '#27272a',
					'accent-foreground': '#ffffff',
					border: '#27272a',
					ring: '#27272a'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	}
};

export default config;
