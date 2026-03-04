import { useMood } from '@/context/MoodContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { journalAPI } from '../api';

/* ── Icons ── */
const JournalIcon = () => (
	<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
		style={{ width: 20, height: 20, color: 'var(--bloom-accent)' }}>
		<path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20"
			stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z"
			stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M8 7H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
		<path d="M8 11H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
	</svg>
);

const QuoteIcon = () => (
	<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
		style={{ width: 32, height: 32, opacity: 0.2 }}>
		<path d="M10 8C10 10.2091 8.20914 12 6 12C6 12 6 15 9 18C7 18 3 14 3 10V6C3 4.89543 3.89543 4 5 4H8C9.10457 4 10 4.89543 10 6V8Z"
			fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M21 8C21 10.2091 19.2091 12 17 12C17 12 17 15 20 18C18 18 14 14 14 10V6C14 4.89543 14.8954 4 16 4H19C20.1046 4 21 4.89543 21 6V8Z"
			fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

const CheckIcon = () => (
	<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 20, height: 20 }}>
		<path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

interface Affirmation {
	content: string;
	mood_type: string;
}

/* ── Mood color map ── */
const moodColorMap: Record<string, string> = {
	Happy: '#E8B86D',
	Relaxed: '#7EB5A6',
	Confident: '#D49A6A',
	Calm: '#7EB5A6',
	Content: '#B5936B',
	Reflective: '#9B8AA6',
	Sad: '#7A8B9A',
	Anxious: '#C4A77D',
	Frustrated: '#C08B7E',
	Bittersweet: '#C48FAA',
	Nostalgic: '#8B8FAC',
	Conflicted: '#8B9FAC',
};

interface JournalEntryProps {
	onEntrySaved?: () => void;
}

export default function JournalEntry({ onEntrySaved }: JournalEntryProps) {
	const { selectedMood } = useMood();
	const [journalEntry, setJournalEntry] = useState('');
	const [loading, setLoading] = useState(false);
	const [affirmation, setAffirmation] = useState<Affirmation | null>(null);
	const [showAffirmation, setShowAffirmation] = useState(false);
	const [tokenStatus, setTokenStatus] = useState<'checking' | 'valid' | 'invalid'>('checking');
	const wordCount = journalEntry.trim() ? journalEntry.trim().split(/\s+/).length : 0;

	useEffect(() => {
		const token = localStorage.getItem('token');
		setTokenStatus(token ? 'valid' : 'invalid');
	}, []);

	// Clear affirmation panel when mood changes (stale state bug)
	useEffect(() => {
		setShowAffirmation(false);
	}, [selectedMood]);

	const saveEntry = async () => {
		if (!journalEntry.trim()) {
			toast.error('Please write something before saving.', { position: 'top-right' });
			return;
		}
		if (!selectedMood) {
			toast.error('Please select your mood above first.', { position: 'top-right' });
			return;
		}
		if (tokenStatus !== 'valid') {
			toast.error('Please log in again to save entries.', { position: 'top-right' });
			setTimeout(() => { window.location.href = '/auth/login'; }, 2000);
			return;
		}
		setLoading(true);
		try {
			const response = await journalAPI.createEntry(journalEntry, selectedMood);
			setJournalEntry('');

			if (response.affirmation) {
				setAffirmation({ content: response.affirmation, mood_type: selectedMood });
				setShowAffirmation(true);
			}

			toast.success('Entry saved!', { position: 'top-right' });
			// Signal parent to refresh the calendar
			onEntrySaved?.();
		} catch (error) {
			const msg = error instanceof Error ? error.message : 'Failed to save entry';
			if (msg.includes('401') || msg.includes('403') || msg.includes('token')) {
				setTokenStatus('invalid');
				toast.error('Session expired. Redirecting to login…', { position: 'top-right' });
				setTimeout(() => { window.location.href = '/auth/login'; }, 2000);
			} else {
				toast.error(msg, { position: 'top-right' });
			}
		} finally {
			setLoading(false);
		}
	};

	const moodColor = selectedMood ? (moodColorMap[selectedMood] || 'var(--bloom-primary)') : 'var(--bloom-primary)';

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
			<ToastContainer />

			{/* Affirmation reveal */}
			<AnimatePresence>
				{showAffirmation && affirmation && (
					<motion.div
						initial={{ opacity: 0, y: -12, scale: 0.97 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -8, scale: 0.97 }}
						transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
						style={{
							background: 'linear-gradient(145deg, var(--bloom-accent-glow) 0%, var(--surface-elevated) 100%)',
							border: '1px solid rgba(212, 165, 116, 0.3)',
							borderRadius: 'var(--radius-xl)',
							padding: 'var(--space-6)',
							textAlign: 'center',
							position: 'relative',
						}}
					>
						{/* Decorative quote marks */}
						<div style={{ position: 'absolute', top: 'var(--space-4)', left: 'var(--space-4)', color: 'var(--bloom-accent)' }}>
							<QuoteIcon />
						</div>

						<p style={{ fontFamily: 'var(--font-accent)', fontSize: 'var(--text-xl)', fontStyle: 'italic', color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
							{affirmation.content}
						</p>

						<button
							onClick={() => setShowAffirmation(false)}
							style={{
								fontFamily: 'var(--font-body)',
								fontSize: 'var(--text-sm)',
								fontWeight: 500,
								color: 'var(--bloom-primary)',
								background: 'transparent',
								border: '1.5px solid rgba(124, 106, 86, 0.25)',
								borderRadius: 'var(--radius-lg)',
								padding: 'var(--space-2) var(--space-5)',
								cursor: 'pointer',
								transition: 'all 0.2s ease',
							}}
						>
							Close
						</button>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Mood indicator */}
			<AnimatePresence>
				{selectedMood && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 'var(--space-3)',
							padding: 'var(--space-3) var(--space-4)',
							background: `${moodColor}12`,
							border: `1px solid ${moodColor}30`,
							borderRadius: 'var(--radius-lg)',
							overflow: 'hidden',
						}}
					>
						<div style={{ width: 10, height: 10, borderRadius: '50%', background: moodColor, flexShrink: 0 }} />
						<span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
							Writing as feeling{' '}
							<strong style={{ color: moodColor, fontWeight: 600 }}>{selectedMood}</strong>
						</span>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Section header */}
			<div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
				<JournalIcon />
				<span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 500, color: 'var(--text-primary)' }}>
					Today's Entry
				</span>
				<div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(124,106,86,0.12), transparent)' }} />
			</div>

			{/* Textarea */}
			<div style={{ position: 'relative' }}>
				<textarea
					placeholder="What's on your mind today? Let your thoughts flow freely…"
					value={journalEntry}
					onChange={(e) => setJournalEntry(e.target.value)}
					disabled={loading || tokenStatus === 'invalid'}
					style={{
						width: '100%',
						minHeight: 220,
						padding: 'var(--space-6)',
						paddingBottom: 'var(--space-10)',
						fontFamily: 'var(--font-accent)',
						fontSize: 'var(--text-lg)',
						lineHeight: 1.8,
						color: 'var(--text-primary)',
						background: 'linear-gradient(180deg, var(--surface-elevated) 0%, var(--surface-base) 100%)',
						border: `1.5px solid ${journalEntry ? 'rgba(212,165,116,0.35)' : 'rgba(124,106,86,0.12)'}`,
						borderRadius: 'var(--radius-xl)',
						boxShadow: 'var(--shadow-inner)',
						outline: 'none',
						resize: 'vertical',
						transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
					}}
					onFocus={(e) => {
						e.currentTarget.style.borderColor = 'var(--bloom-accent)';
						e.currentTarget.style.boxShadow = 'var(--shadow-glow-accent), var(--shadow-inner)';
					}}
					onBlur={(e) => {
						e.currentTarget.style.borderColor = journalEntry ? 'rgba(212,165,116,0.35)' : 'rgba(124,106,86,0.12)';
						e.currentTarget.style.boxShadow = 'var(--shadow-inner)';
					}}
				/>
				{/* Word count */}
				<div style={{
					position: 'absolute',
					bottom: 'var(--space-4)',
					right: 'var(--space-4)',
					fontFamily: 'var(--font-body)',
					fontSize: 'var(--text-xs)',
					color: 'var(--text-tertiary)',
				}}>
					{wordCount} {wordCount === 1 ? 'word' : 'words'}
				</div>
			</div>

			{/* Auth warning */}
			{tokenStatus === 'invalid' && (
				<p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--mood-frustrated)', textAlign: 'center' }}>
					Please log in to save your entries.
				</p>
			)}

			{/* Save button */}
			<motion.button
				onClick={saveEntry}
				disabled={loading || tokenStatus === 'invalid'}
				whileHover={{ scale: (loading || tokenStatus === 'invalid') ? 1 : 1.01 }}
				whileTap={{ scale: (loading || tokenStatus === 'invalid') ? 1 : 0.98 }}
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					gap: 'var(--space-2)',
					width: '100%',
					padding: 'var(--space-4)',
					fontFamily: 'var(--font-body)',
					fontSize: 'var(--text-base)',
					fontWeight: 600,
					color: 'var(--text-inverse)',
					background: (loading || tokenStatus === 'invalid')
						? 'var(--bloom-primary-light)'
						: 'linear-gradient(135deg, var(--bloom-primary) 0%, var(--bloom-primary-dark) 100%)',
					border: 'none',
					borderRadius: 'var(--radius-lg)',
					cursor: (loading || tokenStatus === 'invalid') ? 'not-allowed' : 'pointer',
					boxShadow: (loading || tokenStatus === 'invalid') ? 'none' : 'var(--shadow-md)',
					transition: 'all 0.2s ease',
					letterSpacing: '0.01em',
				}}
			>
				{!loading && <CheckIcon />}
				{loading ? 'Saving…' : 'Save Entry'}
			</motion.button>
		</div>
	);
}
