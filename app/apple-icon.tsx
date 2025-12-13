import { ImageResponse } from 'next/og';

export const size = {
	width: 180,
	height: 180,
};

export const contentType = 'image/png';

export default function AppleIcon() {
	return new ImageResponse(
		(
			<div
				style={{
					width: '100%',
					height: '100%',
					background:
						'linear-gradient(145deg, #022c22, #059669, #10b981)',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					color: '#ecfdf5',
					fontSize: 72,
					fontWeight: 800,
					borderRadius: 40,
					fontFamily:
						"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
				}}
			>
				GP
			</div>
		),
		{
			...size,
		}
	);
}
