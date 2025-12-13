import { ImageResponse } from 'next/og';

export const size = {
	width: 64,
	height: 64,
};

export const contentType = 'image/png';

export default function Icon() {
	return new ImageResponse(
		(
			<div
				style={{
					width: '100%',
					height: '100%',
					backgroundColor: '#022c22',
					color: '#ecfdf5',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					fontSize: 32,
					fontWeight: 800,
					borderRadius: 16,
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
