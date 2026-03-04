import { useMood } from '@/context/MoodContext';
import { motion } from 'framer-motion';

/* ─── Mood definitions with design system colors & SVG icons ─── */
const moods = [
	{
		name: 'Happy',
		color: '#E8B86D',
		bg: '#FDF6E9',
		icon: (
			<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={28} height={28}>
				<circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
				<path d="M12 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
				<path d="M12 20V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
				<path d="M4.93 4.93L6.34 6.34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
				<path d="M17.66 17.66L19.07 19.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
				<path d="M2 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
				<path d="M20 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
				<path d="M4.93 19.07L6.34 17.66" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
				<path d="M17.66 6.34L19.07 4.93" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
			</svg>
		),
	},
	{
		name: 'Relaxed',
		color: '#7EB5A6',
		bg: '#EEF6F3',
		icon: (
			<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={28} height={28}>
				<path d="M6 21C6 21 7 14 12 9C17 4 21 3 21 3C21 3 20 10 15 15C10 20 6 21 6 21Z"
					stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M6 21C6 21 6 16 9 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
				<path d="M3 3L6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
			</svg>
		),
	},
	{
		name: 'Confident',
		color: '#D49A6A',
		bg: '#FBF3EC',
		icon: (
			<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={28} height={28}>
				<path d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
					stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
	},
	{
		name: 'Calm',
		color: '#7EB5A6',
		bg: '#EEF6F3',
		icon: (
			<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={28} height={28}>
				<circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
				<path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
				<path d="M12 8V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
			</svg>
		),
	},
	{
		name: 'Content',
		color: '#B5936B',
		bg: '#F8F2EA',
		icon: (
			<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={28} height={28}>
				<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
					stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
	},
	{
		name: 'Reflective',
		color: '#9B8AA6',
		bg: '#F5F2F7',
		icon: (
			<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={28} height={28}>
				<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
					stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
	},
	{
		name: 'Sad',
		color: '#7A8B9A',
		bg: '#F0F3F5',
		icon: (
			<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={28} height={28}>
				<path d="M18 10H17.74C17.3659 8.551 16.4925 7.27885 15.2718 6.40667C14.051 5.53448 12.5583 5.11679 11.0569 5.22589C9.55542 5.33499 8.1425 5.96377 7.06935 7.00209C5.9962 8.04041 5.33057 9.42356 5.18 10.92C3.94882 11.1537 2.85267 11.832 2.09568 12.8246C1.3387 13.8172 0.972461 15.0536 1.06558 16.2991C1.15869 17.5445 1.7047 18.7127 2.60067 19.5836C3.49664 20.4546 4.68019 20.9679 5.93 21.03H18C19.3261 21.03 20.5979 20.5032 21.5355 19.5656C22.4732 18.6279 23 17.3561 23 16.03C23 14.7039 22.4732 13.4321 21.5355 12.4944C20.5979 11.5568 19.3261 11.03 18 11.03V10Z"
					stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
	},
	{
		name: 'Anxious',
		color: '#C4A77D',
		bg: '#F9F5EE',
		icon: (
			<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={28} height={28}>
				<path d="M2 12C2 12 5 8 8 8C11 8 11 16 14 16C17 16 20 12 22 12"
					stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M2 18C2 18 5 14 8 14C11 14 11 22 14 22C17 22 20 18 22 18"
					stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.45" />
			</svg>
		),
	},
	{
		name: 'Frustrated',
		color: '#C08B7E',
		bg: '#F8F0EE',
		icon: (
			<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={28} height={28}>
				<path d="M12 4C8 4 6 7 6 10C6 13 9 13 9 16C9 19 6 20 6 20"
					stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
				<path d="M12 4C16 4 18 7 18 10C18 13 15 13 15 16C15 19 18 20 18 20"
					stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
			</svg>
		),
	},
	{
		name: 'Bittersweet',
		color: '#C48FAA',
		bg: '#F9F0F4',
		icon: (
			<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={28} height={28}>
				<path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"
					stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M7 12H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
			</svg>
		),
	},
	{
		name: 'Nostalgic',
		color: '#8B8FAC',
		bg: '#F3F3F8',
		icon: (
			<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={28} height={28}>
				<circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
				<path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
	},
	{
		name: 'Conflicted',
		color: '#8B9FAC',
		bg: '#EFF3F5',
		icon: (
			<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={28} height={28}>
				<path d="M8 3L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
				<path d="M16 3L19 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
				<path d="M5 9H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
				<path d="M5 15H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
			</svg>
		),
	},
];

/* ─── Moods Component ─────────────────────────────────────────── */
const Moods = () => {
	const { selectedMood, setSelectedMood } = useMood();

	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(4, 1fr)',
				gap: '12px',
				padding: '4px',
			}}
		>
			{moods.map((mood, i) => {
				const isSelected = selectedMood === mood.name;

				return (
					<motion.button
						key={mood.name}
						onClick={() => {
							if (selectedMood !== mood.name) {
								setSelectedMood(mood.name);
								setTimeout(() => setSelectedMood(null), 60000);
							} else {
								setSelectedMood(null);
							}
						}}
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.35,
							delay: i * 0.04,
							ease: [0.34, 1.56, 0.64, 1],
						}}
						whileHover={{ scale: 1.04, y: -3 }}
						whileTap={{ scale: 0.96 }}
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: '10px',
							padding: '16px 8px',
							background: isSelected ? mood.bg : 'var(--surface-elevated)',
							border: `2px solid ${isSelected ? mood.color : 'transparent'}`,
							borderRadius: 'var(--radius-xl)',
							cursor: 'pointer',
							outline: 'none',
							boxShadow: isSelected
								? `0 0 0 3px ${mood.color}30, var(--shadow-md)`
								: 'var(--shadow-xs)',
							transition: 'background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
							color: mood.color,
						}}
					>
						{/* Icon Container */}
						<div
							style={{
								width: 52,
								height: 52,
								borderRadius: '50%',
								background: `${mood.color}18`,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								transition: 'background 0.2s ease',
								...(isSelected && { background: `${mood.color}28` }),
							}}
						>
							{mood.icon}
						</div>

						{/* Label */}
						<span
							style={{
								fontFamily: 'var(--font-body)',
								fontSize: 'var(--text-xs)',
								fontWeight: isSelected ? 600 : 500,
								color: isSelected ? mood.color : 'var(--text-secondary)',
								letterSpacing: '0.01em',
								transition: 'color 0.2s ease',
							}}
						>
							{mood.name}
						</span>
					</motion.button>
				);
			})}
		</div>
	);
};

export default Moods;
