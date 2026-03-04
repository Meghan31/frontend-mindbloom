// home.tsx
import { MoodProvider } from '@/context/MoodContext';
import { useTheme } from '@/context/ThemeContext';
import JournalCalendar from '@/sections/JournalCalendar';
import JournalEntry from '@/sections/JournalEntry';
import Moods from '@/sections/Moods';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { affirmationAPI, authAPI } from '../../api';
import './home.css';

type User = { id: number; username: string; email: string };

/* ── SVG Icons ── */
const BloomLogoMark = () => (
	<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width={28} height={28}>
		<path d="M24 4C24 4 28 12 28 18C28 24 24 28 24 28C24 28 20 24 20 18C20 12 24 4 24 4Z" fill="currentColor" opacity="0.3" />
		<path d="M24 4C24 4 28 12 28 18C28 24 24 28 24 28C24 28 20 24 20 18C20 12 24 4 24 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M10 16C10 16 16 18 20 22C24 26 24 32 24 32C24 32 18 30 14 26C10 22 10 16 10 16Z" fill="currentColor" opacity="0.2" />
		<path d="M10 16C10 16 16 18 20 22C24 26 24 32 24 32C24 32 18 30 14 26C10 22 10 16 10 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M38 16C38 16 32 18 28 22C24 26 24 32 24 32C24 32 30 30 34 26C38 22 38 16 38 16Z" fill="currentColor" opacity="0.2" />
		<path d="M38 16C38 16 32 18 28 22C24 26 24 32 24 32C24 32 30 30 34 26C38 22 38 16 38 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		<circle cx="24" cy="38" r="4" fill="currentColor" opacity="0.3" />
		<path d="M24 32V44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
	</svg>
);

const CalendarIcon = () => (
	<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
		<rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
		<path d="M3 9H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
		<path d="M8 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
		<path d="M16 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
		<circle cx="8" cy="14" r="1.5" fill="currentColor" />
		<circle cx="12" cy="14" r="1.5" fill="currentColor" />
		<circle cx="16" cy="14" r="1.5" fill="currentColor" />
	</svg>
);

const LogoutIcon = () => (
	<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
		<path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M21 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

const UserIcon = () => (
	<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={26} height={26}>
		<circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
		<path d="M4 21C4 17.134 7.58172 14 12 14C16.4183 14 20 17.134 20 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
	</svg>
);

const MailIcon = () => (
	<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={14} height={14}>
		<rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
		<path d="M3 7L12 13L21 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
	</svg>
);

const SparkleIcon = () => (
	<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
		<path d="M12 3L13.5 8.5L19 10L13.5 11.5L12 17L10.5 11.5L5 10L10.5 8.5L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M5 3L5.75 5.25L8 6L5.75 6.75L5 9L4.25 6.75L2 6L4.25 5.25L5 3Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M19 15L19.5 16.75L21 17.5L19.5 18.25L19 20L18.5 18.25L17 17.5L18.5 16.75L19 15Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

const CloseIcon = () => (
	<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
		<path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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

/* ── Affirmation Modal ── */
interface AffirmationModalProps {
	open: boolean;
	onClose: () => void;
	text: string | null;
	loading: boolean;
}

function AffirmationModal({ open, onClose, text, loading }: AffirmationModalProps) {
	const overlayRef = useRef<HTMLDivElement>(null);

	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === overlayRef.current) onClose();
	};

	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
		document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
	}, [open, onClose]);

	useEffect(() => {
		document.body.style.overflow = open ? 'hidden' : '';
		return () => { document.body.style.overflow = ''; };
	}, [open]);

	if (!open) return null;

	return createPortal(
		<div
			ref={overlayRef}
			onClick={handleOverlayClick}
			style={{
				position: 'fixed',
				inset: 0,
				background: 'rgba(44, 37, 32, 0.4)',
				backdropFilter: 'blur(8px)',
				WebkitBackdropFilter: 'blur(8px)',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				padding: '24px',
				zIndex: 9999,
				animation: 'fadeIn 0.2s ease',
			}}
		>
			<motion.div
				initial={{ opacity: 0, y: 24, scale: 0.95 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				exit={{ opacity: 0, y: 12, scale: 0.97 }}
				transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
				style={{
					width: '100%',
					maxWidth: 480,
					background: 'var(--surface-elevated)',
					borderRadius: '28px',
					boxShadow: '0 30px 80px rgba(44, 37, 32, 0.16), 0 8px 24px rgba(44, 37, 32, 0.08)',
					border: '1px solid rgba(212, 165, 116, 0.2)',
					overflow: 'hidden',
				}}
			>
				{/* Top accent bar */}
				<div style={{
					height: 4,
					background: 'linear-gradient(90deg, #D4A574 0%, #E8C9A4 50%, #8FA387 100%)',
				}} />

				{/* Header */}
				<div style={{
					display: 'flex',
					alignItems: 'flex-start',
					justifyContent: 'space-between',
					padding: '24px 28px 16px',
				}}>
					<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
						<div style={{
							width: 40,
							height: 40,
							borderRadius: '12px',
							background: 'linear-gradient(135deg, var(--bloom-accent-glow) 0%, var(--bloom-accent-light) 100%)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: 'var(--bloom-primary)',
						}}>
							<SparkleIcon />
						</div>
						<div>
							<p style={{
								fontFamily: 'var(--font-body)',
								fontSize: '0.68rem',
								fontWeight: 500,
								letterSpacing: '0.1em',
								textTransform: 'uppercase',
								color: 'var(--bloom-accent)',
								marginBottom: 2,
							}}>
								Daily Affirmation
							</p>
							<h2 style={{
								fontFamily: 'var(--font-display)',
								fontSize: '1.2rem',
								fontWeight: 500,
								color: 'var(--text-primary)',
								letterSpacing: '-0.01em',
							}}>
								Your spark for today
							</h2>
						</div>
					</div>

					<button
						onClick={onClose}
						style={{
							width: 32,
							height: 32,
							borderRadius: 8,
							border: '1.5px solid rgba(124, 106, 86, 0.15)',
							background: 'transparent',
							color: 'var(--text-tertiary)',
							cursor: 'pointer',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							transition: 'all 0.15s ease',
							flexShrink: 0,
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.background = 'var(--surface-sunken)';
							e.currentTarget.style.color = 'var(--text-primary)';
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.background = 'transparent';
							e.currentTarget.style.color = 'var(--text-tertiary)';
						}}
					>
						<CloseIcon />
					</button>
				</div>

				{/* Body */}
				<div style={{ padding: '8px 28px 32px' }}>
					{loading ? (
						<div style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: 12,
							padding: '32px 0',
						}}>
							{/* Pulsing bloom */}
							<div style={{
								width: 48,
								height: 48,
								borderRadius: '50%',
								background: 'var(--bloom-accent-glow)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								animation: 'gentlePulse 1.5s ease-in-out infinite',
								color: 'var(--bloom-accent)',
							}}>
								<SparkleIcon />
							</div>
							<p style={{
								fontFamily: 'var(--font-accent)',
								fontSize: '1rem',
								fontStyle: 'italic',
								color: 'var(--text-tertiary)',
							}}>
								Finding your affirmation…
							</p>
						</div>
					) : text ? (
						<div style={{
							background: 'linear-gradient(135deg, rgba(212,165,116,0.08) 0%, rgba(143,163,135,0.06) 100%)',
							borderRadius: 20,
							padding: '28px 24px',
							border: '1px solid rgba(212, 165, 116, 0.15)',
							textAlign: 'center',
							position: 'relative',
						}}>
							{/* Opening quote */}
							<span style={{
								position: 'absolute',
								top: 12,
								left: 18,
								fontFamily: 'Georgia, serif',
								fontSize: '3rem',
								lineHeight: 1,
								color: 'var(--bloom-accent)',
								opacity: 0.25,
								userSelect: 'none',
							}}>"</span>

							<p style={{
								fontFamily: 'var(--font-accent)',
								fontSize: '1.25rem',
								fontStyle: 'italic',
								lineHeight: 1.7,
								color: 'var(--text-primary)',
								letterSpacing: '0.01em',
								position: 'relative',
								zIndex: 1,
							}}>
								{text}
							</p>

							{/* Closing quote */}
							<span style={{
								position: 'absolute',
								bottom: 4,
								right: 18,
								fontFamily: 'Georgia, serif',
								fontSize: '3rem',
								lineHeight: 1,
								color: 'var(--bloom-accent)',
								opacity: 0.25,
								userSelect: 'none',
							}}>"</span>
						</div>
					) : (
						<div style={{ textAlign: 'center', padding: '24px 0' }}>
							<p style={{
								fontFamily: 'var(--font-accent)',
								fontSize: '1rem',
								fontStyle: 'italic',
								color: 'var(--text-tertiary)',
							}}>
								No affirmation available right now.
							</p>
						</div>
					)}

					{/* Footer hint */}
					{text && !loading && (
						<p style={{
							fontFamily: 'var(--font-body)',
							fontSize: '0.75rem',
							color: 'var(--text-tertiary)',
							textAlign: 'center',
							marginTop: 16,
						}}>
							Carry this with you through the day 🌸
						</p>
					)}
				</div>
			</motion.div>
		</div>,
		document.body
	);
}

/* ── Affirmation modal background: use CSS variable instead of hardcoded hex ── */

/* ─── Greeting ─── */
const getGreeting = () => {
	const h = new Date().getHours();
	if (h < 12) return { label: 'Good morning', sub: 'Start your day with intention' };
	if (h < 17) return { label: 'Good afternoon', sub: 'Take a moment to check in with yourself' };
	return { label: 'Good evening', sub: 'Reflect on the beauty of today' };
};

/* ─── Home ─── */
const Home = () => {
	const { theme, toggleTheme } = useTheme();
	const [user, setUser] = useState<User | null>(null);
	const [affirmationOpen, setAffirmationOpen] = useState(false);
	const [affirmationText, setAffirmationText] = useState<string | null>(null);
	const [affirmationLoading, setAffirmationLoading] = useState(false);
	const greeting = getGreeting();

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

	const handleLogout = () => { authAPI.logout(); window.location.href = '/auth/login'; };

	const openAffirmation = async () => {
		setAffirmationOpen(true);
		setAffirmationLoading(true);
		setAffirmationText(null);
		try {
			const data = await affirmationAPI.getTodayAffirmation('peaceful');
			setAffirmationText(
				typeof data === 'string'
					? data
					: data?.content || data?.affirmation || data?.message || null
			);
		} catch {
			setAffirmationText(null);
		} finally {
			setAffirmationLoading(false);
		}
	};

	if (!user) {
		return (
			<div className="bloom-loading">
				<div className="bloom-loading-icon">
					<BloomLogoMark />
				</div>
				<p className="bloom-loading-text">Preparing your garden…</p>
			</div>
		);
	}

	return (
		<div className="home-root">
			{/* Navbar */}
			<nav className="bloom-navbar">
				<div className="bloom-navbar-logo">
					<span style={{ color: 'var(--bloom-accent)' }}><BloomLogoMark /></span>
					<span className="bloom-navbar-brand">Mind-Bloom</span>
				</div>
				<div className="bloom-navbar-actions">
					<Link to="/calendar" className="btn-nav">
						<CalendarIcon />
						Calendar
					</Link>
					<button
						className="btn-nav btn-nav-icon"
						onClick={toggleTheme}
						aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
						title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
					>
						{theme === 'dark' ? <SunIcon /> : <MoonIcon />}
					</button>
					<button className="btn-nav btn-nav-danger" onClick={handleLogout}>
						<LogoutIcon />
						Sign out
					</button>
				</div>
			</nav>

			{/* Main */}
			<div className="home-content">
				{/* Sidebar */}
				<motion.aside
					className="home-sidebar"
					initial={{ opacity: 0, x: -16 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
				>
					<div className="user-welcome-card">
						<div className="user-avatar"><UserIcon /></div>
						<p className="user-greeting">Hi, <strong>{user.username}</strong>!</p>
						<p className="user-email"><MailIcon />{user.email}</p>
					</div>

					<div className="mini-calendar-card">
						<div className="mini-calendar-header">
							<span className="mini-calendar-title">
								<CalendarIcon /> Journal History
							</span>
						</div>
						<JournalCalendar />
					</div>
				</motion.aside>

				{/* Right main */}
				<motion.main
					className="home-main"
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
				>
					{/* Greeting Banner */}
					<div className="greeting-banner">
						<p className="greeting-time">
							{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
						</p>
						<h1 className="greeting-headline">{greeting.label}, {user.username}</h1>
						<p className="greeting-sub">{greeting.sub}</p>

						{/* Affirmation button — placed naturally below the greeting */}
						<button
							onClick={openAffirmation}
							style={{
								marginTop: 'var(--space-5)',
								display: 'inline-flex',
								alignItems: 'center',
								gap: 8,
								padding: '10px 20px',
								fontFamily: 'var(--font-body)',
								fontSize: '0.85rem',
								fontWeight: 500,
								color: 'var(--bloom-primary)',
								background: 'rgba(212, 165, 116, 0.12)',
								border: '1.5px solid rgba(212, 165, 116, 0.3)',
								borderRadius: 'var(--radius-full)',
								cursor: 'pointer',
								transition: 'all 0.2s ease',
								letterSpacing: '0.01em',
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.background = 'rgba(212, 165, 116, 0.22)';
								e.currentTarget.style.borderColor = 'rgba(212, 165, 116, 0.5)';
								e.currentTarget.style.transform = 'translateY(-1px)';
								e.currentTarget.style.boxShadow = '0 4px 12px rgba(212, 165, 116, 0.2)';
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.background = 'rgba(212, 165, 116, 0.12)';
								e.currentTarget.style.borderColor = 'rgba(212, 165, 116, 0.3)';
								e.currentTarget.style.transform = 'translateY(0)';
								e.currentTarget.style.boxShadow = 'none';
							}}
						>
							<SparkleIcon />
							Daily Affirmation
						</button>
					</div>

					{/* Mood + Journal */}
					<MoodProvider>
						<div className="mood-section-card">
							<div className="section-header">
								<div>
									<p className="section-label">Check-in</p>
									<h2 className="section-title">How are you feeling right now?</h2>
								</div>
								<div className="section-divider" />
							</div>
							<Moods />
						</div>

						<div className="journal-section-card">
							<JournalEntry />
						</div>
					</MoodProvider>
				</motion.main>
			</div>

			{/* Affirmation Modal */}
			<AnimatePresence>
				{affirmationOpen && (
					<AffirmationModal
						open={affirmationOpen}
						onClose={() => setAffirmationOpen(false)}
						text={affirmationText}
						loading={affirmationLoading}
					/>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Home;
