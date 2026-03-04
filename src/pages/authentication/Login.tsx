import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authAPI } from '../../api';
import './auth.css';

/* ── Bloom Logo SVG ── */
const BloomLogo = () => (
	<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="auth-logo-icon">
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

/* ── Mail Icon ── */
const MailIcon = () => (
	<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="auth-input-icon">
		<rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
		<path d="M3 7L12 13L21 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
	</svg>
);

/* ── Lock Icon ── */
const LockIcon = () => (
	<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="auth-input-icon">
		<rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
		<path d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11"
			stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
		<circle cx="12" cy="16" r="1.5" fill="currentColor" />
	</svg>
);

/* ── Eye Icon ── */
const EyeIcon = ({ open }: { open: boolean }) =>
	open ? (
		<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 18, height: 18 }}>
			<path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
				stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			<circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
		</svg>
	) : (
		<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 18, height: 18 }}>
			<path d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65663 6.06 6.06M9.9 4.24C10.5883 4.07888 11.2931 3.99834 12 4C19 4 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19"
				stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.4811 9.80385 14.1962C9.51897 13.9113 9.29439 13.5719 9.14351 13.1984C8.99262 12.8248 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2218 9.18488 10.8538C9.34884 10.4859 9.58525 10.1546 9.88 9.88"
				stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M1 1L23 23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
		</svg>
	);

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			navigate('/home');
		}
	}, [navigate]);

	const validateForm = () => {
		if (!email.trim()) {
			toast.error('Email is required', { position: 'top-right', autoClose: 4000 });
			return false;
		}
		const emailRegex = /\S+@\S+\.\S+/;
		if (!emailRegex.test(email)) {
			toast.error('Please enter a valid email', { position: 'top-right', autoClose: 4000 });
			return false;
		}
		if (!password.trim()) {
			toast.error('Password is required', { position: 'top-right', autoClose: 4000 });
			return false;
		}
		return true;
	};

	const handleSubmit = async () => {
		if (!validateForm()) return;
		setLoading(true);
		try {
			await authAPI.login(email, password);
			toast.success('Welcome back! 🌸', { position: 'top-center', autoClose: 1500 });
			setTimeout(() => navigate('/home'), 1200);
		} catch (err) {
			toast.error(
				err instanceof Error ? err.message : 'Login failed. Please check your credentials.',
				{ position: 'top-right', autoClose: 4000 }
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="auth-root">
			<ToastContainer />
			<motion.div
				className="auth-card"
				initial={{ opacity: 0, y: 24, scale: 0.96 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
			>
				{/* Logo */}
				<div className="auth-logo">
					<BloomLogo />
					<span className="auth-brand-name">Mind-Bloom</span>
					<p className="auth-tagline">Nurture your thoughts, watch yourself bloom</p>
				</div>

				<h1 className="auth-title">Welcome back</h1>

				<div className="auth-fields">
					{/* Email */}
					<div className="auth-field">
						<label className="auth-label" htmlFor="email">Email address</label>
						<div className="auth-input-wrapper">
							<MailIcon />
							<input
								id="email"
								type="email"
								className="auth-input"
								placeholder="you@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								disabled={loading}
								autoComplete="email"
								onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
							/>
						</div>
					</div>

					{/* Password */}
					<div className="auth-field">
						<label className="auth-label" htmlFor="password">Password</label>
						<div className="auth-input-wrapper">
							<LockIcon />
							<input
								id="password"
								type={showPassword ? 'text' : 'password'}
								className="auth-input"
								placeholder="••••••••"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								disabled={loading}
								autoComplete="current-password"
								style={{ paddingRight: '3rem' }}
								onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
							/>
							<button
								type="button"
								className="auth-input-eye"
								onClick={() => setShowPassword(!showPassword)}
								tabIndex={-1}
							>
								<EyeIcon open={showPassword} />
							</button>
						</div>
					</div>
				</div>

				{/* Actions */}
				<div className="auth-actions">
					<motion.button
						className="btn-bloom-primary"
						onClick={handleSubmit}
						disabled={loading}
						whileHover={{ scale: loading ? 1 : 1.01 }}
						whileTap={{ scale: loading ? 1 : 0.98 }}
					>
						{loading ? 'Signing in…' : 'Sign In'}
					</motion.button>
				</div>

				{/* Switch to Register */}
				<p className="auth-switch">
					Don't have an account?{' '}
					<span className="auth-switch-link" onClick={() => navigate('/auth/register')}>
						Create one
					</span>
				</p>
			</motion.div>
		</div>
	);
};

export default Login;
