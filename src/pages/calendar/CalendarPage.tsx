// src/pages/calendar/CalendarPage.tsx
import JournalCalendar from '@/sections/JournalCalendar';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from '../../api';
import './calendar.css';

type User = { id: number; username: string; email: string };

/* ── Icons ── */
const BloomLogoMark = () => (
	<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width={28} height={28}>
		<path d="M24 4C24 4 28 12 28 18C28 24 24 28 24 28C24 28 20 24 20 18C20 12 24 4 24 4Z"
			fill="currentColor" opacity="0.3" />
		<path d="M24 4C24 4 28 12 28 18C28 24 24 28 24 28C24 28 20 24 20 18C20 12 24 4 24 4Z"
			stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M10 16C10 16 16 18 20 22C24 26 24 32 24 32C24 32 18 30 14 26C10 22 10 16 10 16Z"
			fill="currentColor" opacity="0.2" />
		<path d="M10 16C10 16 16 18 20 22C24 26 24 32 24 32C24 32 18 30 14 26C10 22 10 16 10 16Z"
			stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M38 16C38 16 32 18 28 22C24 26 24 32 24 32C24 32 30 30 34 26C38 22 38 16 38 16Z"
			fill="currentColor" opacity="0.2" />
		<path d="M38 16C38 16 32 18 28 22C24 26 24 32 24 32C24 32 30 30 34 26C38 22 38 16 38 16Z"
			stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		<circle cx="24" cy="38" r="4" fill="currentColor" opacity="0.3" />
		<path d="M24 32V44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
	</svg>
);

const HomeIcon = () => (
	<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
		<path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
			stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

const LogoutIcon = () => (
	<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
		<path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
			stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M21 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

const SunIcon = () => (
	<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
		<circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
		<path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M17.66 6.34l1.41-1.41M4.93 19.07l1.41-1.41"
			stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
	</svg>
);

const MoonIcon = () => (
	<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
		<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
			stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

const CalendarPage = () => {
	const { theme, toggleTheme } = useTheme();
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) { window.location.href = '/auth/login'; return; }
		try {
			const base64Url = token.split('.')[1];
			const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
			const decoded = JSON.parse(decodeURIComponent(
				atob(base64).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
			));
			setUser({ id: decoded.userId, username: decoded.username, email: decoded.email });
		} catch {
			authAPI.logout();
			window.location.href = '/auth/login';
		}
	}, []);

	const handleLogout = () => {
		authAPI.logout();
		window.location.href = '/auth/login';
	};

	if (!user) {
		return (
			<div className="loading" style={{
				fontFamily: 'var(--font-display)',
				color: 'var(--text-secondary)',
				background: 'var(--surface-base)',
			}}>
				Loading…
			</div>
		);
	}

	return (
		<div className="calendar-root">
			{/* ── Navbar ── */}
			<nav style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				padding: 'var(--space-4) var(--space-6)',
				background: 'var(--surface-overlay)',
				backdropFilter: 'blur(12px)',
				WebkitBackdropFilter: 'blur(12px)',
				borderBottom: '1px solid rgba(124, 106, 86, 0.1)',
				position: 'sticky',
				top: 0,
				zIndex: 100,
			}}>
				{/* Logo */}
				<div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
					<span style={{ color: 'var(--bloom-accent)' }}><BloomLogoMark /></span>
					<span style={{
						fontFamily: 'var(--font-display)',
						fontSize: 'var(--text-xl)',
						fontWeight: 500,
						color: 'var(--text-primary)',
						letterSpacing: '-0.01em',
					}}>
						Mind-Bloom
					</span>
				</div>

				{/* Nav Actions */}
				<div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
					<button
						onClick={toggleTheme}
						aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
						title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
						style={{
							width: 36,
							height: 36,
							borderRadius: 'var(--radius-lg)',
							border: '1.5px solid rgba(124, 106, 86, 0.2)',
							background: 'transparent',
							color: 'var(--text-secondary)',
							cursor: 'pointer',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							transition: 'all 0.2s ease',
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.background = 'var(--surface-sunken)';
							e.currentTarget.style.color = 'var(--text-primary)';
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.background = 'transparent';
							e.currentTarget.style.color = 'var(--text-secondary)';
						}}
					>
						{theme === 'dark' ? <SunIcon /> : <MoonIcon />}
					</button>
					<Link to="/home" style={{
						display: 'inline-flex',
						alignItems: 'center',
						gap: 'var(--space-2)',
						padding: 'var(--space-2) var(--space-4)',
						fontFamily: 'var(--font-body)',
						fontSize: 'var(--text-sm)',
						fontWeight: 500,
						color: 'var(--text-secondary)',
						background: 'transparent',
						border: '1.5px solid rgba(124, 106, 86, 0.2)',
						borderRadius: 'var(--radius-lg)',
						textDecoration: 'none',
						transition: 'all 0.2s ease',
					}}
						onMouseEnter={(e) => {
							e.currentTarget.style.background = 'var(--surface-sunken)';
							e.currentTarget.style.color = 'var(--text-primary)';
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.background = 'transparent';
							e.currentTarget.style.color = 'var(--text-secondary)';
						}}
					>
						<HomeIcon />
						Home
					</Link>
					<button
						onClick={handleLogout}
						style={{
							display: 'inline-flex',
							alignItems: 'center',
							gap: 'var(--space-2)',
							padding: 'var(--space-2) var(--space-4)',
							fontFamily: 'var(--font-body)',
							fontSize: 'var(--text-sm)',
							fontWeight: 500,
							color: '#C08B7E',
							background: 'transparent',
							border: '1.5px solid rgba(192, 139, 126, 0.25)',
							borderRadius: 'var(--radius-lg)',
							cursor: 'pointer',
							transition: 'all 0.2s ease',
						}}
						onMouseEnter={(e) => { e.currentTarget.style.background = '#F8F0EE'; }}
						onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
					>
						<LogoutIcon />
						Sign out
					</button>
				</div>
			</nav>

			{/* ── Page Content ── */}
			<div className="calendar-page-content">
				{/* Page Header */}
				<motion.div
					className="calendar-page-header"
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
				>
					<p className="calendar-page-label">Journal History</p>
					<h1 className="calendar-page-title">{user.username}'s Garden</h1>
					<p className="calendar-page-sub">Every entry is a seed you've planted in your growth</p>
				</motion.div>

				{/* Calendar Body */}
				<motion.div
					className="calendar-body-card"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
				>
					<JournalCalendar />

					{/* Legend */}
					<div className="calendar-legend">
						<div className="legend-item">
							<div className="legend-dot" />
							<span>Has journal entry</span>
						</div>
						<div className="legend-item">
							<div className="legend-dot legend-dot-today" />
							<span>Today</span>
						</div>
						<div className="legend-item" style={{ fontStyle: 'italic', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
							Click any highlighted date to view your entries
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default CalendarPage;
