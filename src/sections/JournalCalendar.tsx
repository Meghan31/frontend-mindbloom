import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'react-toastify';
import { journalAPI } from '../api';
import './journal-calendar.css';

interface JournalEntry {
	id: number;
	content: string;
	mood: string;
	entry_date: string;
	affirmation_content: string | null;
}

const formatDateForAPI = (date: Date): string => format(date, 'yyyy-MM-dd');

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
const getMoodColor = (mood: string) => moodColorMap[mood] || '#A89683';

/* ── Icons ── */
const ChevronLeft = () => (
	<svg viewBox="0 0 24 24" fill="none" width={16} height={16}>
		<path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

const ChevronRight = () => (
	<svg viewBox="0 0 24 24" fill="none" width={16} height={16}>
		<path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

const CloseIcon = () => (
	<svg viewBox="0 0 24 24" fill="none" width={16} height={16}>
		<path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
	</svg>
);

const LeafIcon = () => (
	<svg viewBox="0 0 24 24" fill="none" className="bloom-dialog-empty-icon">
		<path d="M6 21C6 21 7 14 12 9C17 4 21 3 21 3C21 3 20 10 15 15C10 20 6 21 6 21Z"
			stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M6 21C6 21 6 16 9 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
	</svg>
);

/* ─── Custom Calendar Grid ─────────────────────────────────── */
const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

interface CalendarGridProps {
	currentMonth: Date;
	selectedDate: Date | undefined;
	highlightedDates: Date[];
	onDateClick: (date: Date) => void;
	onPrev: () => void;
	onNext: () => void;
	isLoading: boolean;
}

function CalendarGrid({ currentMonth, selectedDate, highlightedDates, onDateClick, onPrev, onNext, isLoading }: CalendarGridProps) {
	const monthStart = startOfMonth(currentMonth);
	const monthEnd = endOfMonth(currentMonth);
	const calStart = startOfWeek(monthStart);
	const calEnd = endOfWeek(monthEnd);
	const days = eachDayOfInterval({ start: calStart, end: calEnd });

	const highlightedSet = new Set(highlightedDates.map(d => formatDateForAPI(d)));

	return (
		<div className="cal-wrapper">
			{/* Header: Month nav */}
			<div className="cal-header">
				<button className="cal-nav-btn" onClick={onPrev} aria-label="Previous month" disabled={isLoading}>
					<ChevronLeft />
				</button>
				<span className="cal-month-label">
					{format(currentMonth, 'MMMM yyyy')}
				</span>
				<button className="cal-nav-btn" onClick={onNext} aria-label="Next month" disabled={isLoading}>
					<ChevronRight />
				</button>
			</div>

			{/* Day-of-week headers */}
			<div className="cal-grid">
				{DAY_LABELS.map(d => (
					<div key={d} className="cal-dow">{d}</div>
				))}

				{/* Date cells */}
				{days.map(day => {
					const key = formatDateForAPI(day);
					const inMonth = isSameMonth(day, currentMonth);
					const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
					const isTodayDate = isToday(day);
					const hasEntry = highlightedSet.has(key);

					let cls = 'cal-day';
					if (!inMonth) cls += ' cal-day--outside';
					if (isTodayDate && !isSelected) cls += ' cal-day--today';
					if (isSelected) cls += ' cal-day--selected';
					if (hasEntry && !isSelected) cls += ' cal-day--has-entry';

					return (
						<button
							key={key}
							className={cls}
							onClick={() => inMonth && !isLoading && onDateClick(day)}
							disabled={!inMonth || isLoading}
							aria-label={format(day, 'MMMM d, yyyy')}
							aria-pressed={isSelected}
						>
							<span className="cal-day-num">{format(day, 'd')}</span>
							{hasEntry && <span className="cal-entry-dot" />}
						</button>
					);
				})}
			</div>
		</div>
	);
}

/* ─── Entry Dialog Portal ──────────────────────────────────── */
interface DialogProps {
	open: boolean;
	onClose: () => void;
	selectedDate: Date | undefined;
	entries: JournalEntry[];
	error: string | null;
}

function EntryDialog({ open, onClose, selectedDate, entries, error }: DialogProps) {
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

	const dateLabel = selectedDate ? format(selectedDate, 'MMMM d, yyyy') : '';
	const dayOfWeek = selectedDate ? format(selectedDate, 'EEEE') : '';

	return createPortal(
		<div className="bloom-dialog-overlay" ref={overlayRef} onClick={handleOverlayClick}>
			<div className="bloom-dialog-box" role="dialog" aria-modal="true">
				{/* Header */}
				<div className="bloom-dialog-header">
					<div className="bloom-dialog-header-left">
						<span className="bloom-dialog-date-label">{dayOfWeek}</span>
						<h2 className="bloom-dialog-title">{dateLabel}</h2>
						{entries.length > 0 && (
							<p className="bloom-dialog-subtitle">
								{entries.length} {entries.length === 1 ? 'entry' : 'entries'} this day
							</p>
						)}
					</div>
					<button className="bloom-dialog-close" onClick={onClose} aria-label="Close">
						<CloseIcon />
					</button>
				</div>

				{/* Body */}
				<div className="bloom-dialog-body">
					{error && (
						<div style={{
							padding: '12px 16px',
							background: '#FBF0EE',
							border: '1px solid rgba(192,139,126,0.3)',
							borderRadius: '10px',
							fontFamily: 'var(--font-body)',
							fontSize: '0.85rem',
							color: '#9B5F53',
						}}>
							{error}
						</div>
					)}

					{entries.length > 0 ? (
						entries.map((entry) => {
							const color = getMoodColor(entry.mood);
							return (
								<div
									key={entry.id}
									className="bloom-entry-card"
									style={{ background: `${color}08`, borderLeft: `4px solid ${color}` }}
								>
									<div className="bloom-entry-card-header" style={{ background: `${color}12` }}>
										<div className="bloom-mood-dot" style={{ background: color }} />
										<span className="bloom-mood-label" style={{ color }}>{entry.mood}</span>
									</div>
									<p className="bloom-entry-content">{entry.content}</p>
									{entry.affirmation_content && (
										<div
											className="bloom-affirmation-block"
											style={{ background: `${color}10`, border: `1px solid ${color}20` }}
										>
											<p className="bloom-affirmation-label" style={{ color }}>Affirmation</p>
											<p className="bloom-affirmation-text">{entry.affirmation_content}</p>
										</div>
									)}
								</div>
							);
						})
					) : (
						<div className="bloom-dialog-empty">
							<LeafIcon />
							<p className="bloom-dialog-empty-text">No entries for this day</p>
							<p className="bloom-dialog-empty-hint">
								Select a day with a dot below the date to view your entries
							</p>
							<button className="bloom-dialog-empty-btn" onClick={onClose}>Got it</button>
						</div>
					)}
				</div>
			</div>
		</div>,
		document.body
	);
}

/* ─── JournalCalendar ─────────────────────────────────────── */
export default function JournalCalendar() {
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
	const [entriesByDate, setEntriesByDate] = useState<Record<string, JournalEntry[]>>({});
	const [isLoading, setIsLoading] = useState(true);
	const [selectedEntries, setSelectedEntries] = useState<JournalEntry[]>([]);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [highlightedDates, setHighlightedDates] = useState<Date[]>([]);
	const [lastSelectedDate, setLastSelectedDate] = useState('');
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) { setIsAuthenticated(true); fetchAllEntries(); }
		else { setIsAuthenticated(false); setIsLoading(false); }
	}, []);

	const fetchAllEntries = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const entries = await journalAPI.getAllEntries();
			if (!entries || !Array.isArray(entries)) {
				setEntriesByDate({}); setHighlightedDates([]); return;
			}
			const grouped: Record<string, JournalEntry[]> = {};
			const toHighlight: Date[] = [];
			entries.forEach((entry: any) => {
				const dateStr = entry.entry_date
					? entry.entry_date.split('T')[0]
					: entry.created_at
						? entry.created_at.split('T')[0]
						: new Date().toISOString().split('T')[0];
				const std: JournalEntry = {
					id: entry.id,
					content: entry.content || '',
					mood: entry.mood || '',
					entry_date: dateStr,
					affirmation_content: entry.affirmation_content || null,
				};
				if (!grouped[dateStr]) {
					grouped[dateStr] = [];
					toHighlight.push(new Date(`${dateStr}T12:00:00`));
				}
				grouped[dateStr].push(std);
			});
			setEntriesByDate(grouped);
			setHighlightedDates(toHighlight);
		} catch (err) {
			if (err instanceof Error && (err.message.includes('401') || err.message.includes('403'))) {
				setIsAuthenticated(false);
				localStorage.removeItem('token');
				toast.error('Session expired. Please log in again.', { position: 'top-right' });
			}
		} finally {
			setIsLoading(false);
		}
	};

	const handleDateClick = async (date: Date) => {
		if (!isAuthenticated) {
			toast.error('Please log in to view your entries', { position: 'top-right' });
			return;
		}
		const fd = formatDateForAPI(date);
		setSelectedDate(date);

		if (fd === lastSelectedDate && !isDialogOpen) {
			setIsDialogOpen(true);
			return;
		}
		setLastSelectedDate(fd);

		if (entriesByDate[fd]) {
			setSelectedEntries(entriesByDate[fd]);
			setIsDialogOpen(true);
			return;
		}

		setIsLoading(true);
		setError(null);
		try {
			const entries = await journalAPI.getEntriesByDate(fd);
			const std: JournalEntry[] = Array.isArray(entries)
				? entries.map((e: any) => ({
					id: e.id,
					content: e.content || '',
					mood: e.mood || '',
					entry_date: e.entry_date ? e.entry_date.split('T')[0] : fd,
					affirmation_content: e.affirmation_content || null,
				}))
				: [];
			if (std.length > 0) {
				setHighlightedDates(prev =>
					prev.some(d => formatDateForAPI(d) === fd) ? prev : [...prev, new Date(`${fd}T12:00:00`)]
				);
				setEntriesByDate(prev => ({ ...prev, [fd]: std }));
			}
			setSelectedEntries(std);
			setIsDialogOpen(true);
		} catch (err) {
			if (err instanceof Error && (err.message.includes('401') || err.message.includes('403'))) {
				setIsAuthenticated(false);
				toast.error('Session expired. Please log in again.', { position: 'top-right' });
			}
			setSelectedEntries([]);
			setIsDialogOpen(true);
		} finally {
			setIsLoading(false);
		}
	};

	const closeDialog = () => {
		setIsDialogOpen(false);
		setLastSelectedDate('');
		setSelectedDate(undefined);
	};

	/* Loading spinner */
	if (isLoading && Object.keys(entriesByDate).length === 0) {
		return (
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px', gap: '12px' }}>
				<div style={{
					width: 24, height: 24, borderRadius: '50%',
					border: '2px solid var(--bloom-accent)',
					borderTopColor: 'transparent',
					animation: 'spin 0.8s linear infinite',
				}} />
				<style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
				<span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
					Loading entries…
				</span>
			</div>
		);
	}

	return (
		<>
			<CalendarGrid
				currentMonth={currentMonth}
				selectedDate={selectedDate}
				highlightedDates={highlightedDates}
				onDateClick={handleDateClick}
				onPrev={() => setCurrentMonth(m => subMonths(m, 1))}
				onNext={() => setCurrentMonth(m => addMonths(m, 1))}
				isLoading={isLoading}
			/>

			<EntryDialog
				open={isDialogOpen}
				onClose={closeDialog}
				selectedDate={selectedDate}
				entries={selectedEntries}
				error={error}
			/>
		</>
	);
}
