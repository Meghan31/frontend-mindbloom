// import { Button } from '@/components/ui/button';
// import { motion } from 'framer-motion';
// import { useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import { authAPI } from '../../api';
// import './auth.css';

// const Registration = () => {
// 	const [username, setUsername] = useState('');
// 	const [email, setEmail] = useState('');
// 	const [password, setPassword] = useState('');
// 	// const [error, setError] = useState<string | null>(null);
// 	const [loading, setLoading] = useState(false);
// 	// const [success, setSuccess] = useState(false);

// 	const validateForm = () => {
// 		// Basic validation
// 		if (!username.trim()) {
// 			// setError('Username is required');
// 			toast.error('Username is required', {
// 				position: 'top-right',
// 				autoClose: 5000,
// 				hideProgressBar: false,
// 				closeOnClick: true,
// 				pauseOnHover: true,
// 				draggable: true,
// 				progress: undefined,
// 			});
// 			return false;
// 		}

// 		if (!email.trim()) {
// 			// setError('Email is required');
// 			toast.error('Email is required', {
// 				position: 'top-right',
// 				autoClose: 5000,
// 				hideProgressBar: false,
// 				closeOnClick: true,
// 				pauseOnHover: true,
// 				draggable: true,
// 				progress: undefined,
// 			});
// 			return false;
// 		}

// 		// Simple email validation
// 		const emailRegex = /\S+@\S+\.\S+/;
// 		if (!emailRegex.test(email)) {
// 			// setError('Please enter a valid email');
// 			toast.error('Please enter a valid email', {
// 				position: 'top-right',
// 				autoClose: 5000,
// 				hideProgressBar: false,
// 				closeOnClick: true,
// 				pauseOnHover: true,
// 				draggable: true,
// 				progress: undefined,
// 			});
// 			return false;
// 		}

// 		if (!password.trim()) {
// 			// setError('Password is required');
// 			toast.error('Password is required', {
// 				position: 'top-right',
// 				autoClose: 5000,
// 				hideProgressBar: false,
// 				closeOnClick: true,
// 				pauseOnHover: true,
// 				draggable: true,
// 				progress: undefined,
// 			});
// 			return false;
// 		}

// 		if (password.length < 6) {
// 			// setError('Password must be at least 6 characters');
// 			toast.error('Password must be at least 6 characters', {
// 				position: 'top-right',
// 				autoClose: 5000,
// 				hideProgressBar: false,
// 				closeOnClick: true,
// 				pauseOnHover: true,
// 				draggable: true,
// 				progress: undefined,
// 			});
// 			return false;
// 		}

// 		return true;
// 	};

// 	const handleSubmit = async () => {
// 		// Reset states
// 		// setError(null);
// 		// setSuccess(false);

// 		// Validate the form
// 		if (!validateForm()) {
// 			return;
// 		}

// 		setLoading(true);

// 		try {
// 			// Call the register API
// 			await authAPI.register(username, email, password);
// 			// setSuccess(true);
// 			setLoading(false);

// 			// Reset the form
// 			setUsername('');
// 			setEmail('');
// 			setPassword('');
// 			toast.success('Registration successful! Redirecting to login...', {
// 				position: 'top-center',
// 				autoClose: 2000,
// 				hideProgressBar: false,
// 				closeOnClick: true,
// 				pauseOnHover: true,
// 				draggable: true,
// 				progress: undefined,
// 			});
// 			// Redirect to login after 2 seconds
// 			setTimeout(() => {
// 				window.location.href = '/auth/login';
// 			}, 2000);
// 		} catch (err) {
// 			// setError(
// 			// 	err instanceof Error
// 			// 		? err.message
// 			// 		: 'Registration failed. Please try again.'
// 			// );
// 			toast.error(
// 				err instanceof Error
// 					? err.message
// 					: 'Registration failed. Please try again.',
// 				{
// 					position: 'top-right',
// 					autoClose: 5000,
// 					hideProgressBar: false,
// 					closeOnClick: true,
// 					pauseOnHover: true,
// 					draggable: true,
// 					progress: undefined,
// 				}
// 			);
// 			setLoading(false);
// 		}
// 	};

// 	return (
// 		<div>
// 			<div className="nav-bar">
// 				<motion.h1
// 					className="text-4xl font-bold text-gradient  "
// 					initial={{ opacity: 0, y: -20 }}
// 					animate={{ opacity: 1, y: 0 }}
// 					transition={{ duration: 0.8, ease: 'easeOut' }}
// 					style={{
// 						textShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
// 					}}
// 				>
// 					Welcome to Mind-Bloom
// 				</motion.h1>
// 			</div>
// 			<div
// 				className="flex flex-col items-center justify-center min-h-screen py-2 h-1.5"
// 				style={{ marginTop: '-6rem' }}
// 			>
// 				<ToastContainer />
// 				<h1 className="text-2xl font-bold">Registration</h1>

// 				{/* {error && <div className="text-red-500 mt-4">{error}</div>} */}

// 				<div className="flex flex-col justify-between mb-4 m-10 gap-1">
// 					<div className="flex items-center gap-7 justify-between mt-2">
// 						<label
// 							htmlFor="username"
// 							className="block text-sm font-medium text-gray-700"
// 						>
// 							Username
// 						</label>
// 						<input
// 							type="text"
// 							id="username"
// 							name="username"
// 							className="form-input"
// 							value={username}
// 							onChange={(e) => setUsername(e.target.value)}
// 							disabled={loading}
// 						/>
// 					</div>

// 					<div className="flex items-center gap-7 justify-between mt-2">
// 						<label
// 							htmlFor="email"
// 							className="block text-sm font-medium text-gray-700"
// 						>
// 							Email
// 						</label>
// 						<input
// 							type="email"
// 							id="email"
// 							name="email"
// 							className="form-input"
// 							value={email}
// 							onChange={(e) => setEmail(e.target.value)}
// 							disabled={loading}
// 						/>
// 					</div>
// 					<div className="flex items-center gap-7 justify-between mt-2">
// 						<label
// 							htmlFor="password"
// 							className="block text-sm font-medium text-gray-700"
// 						>
// 							Password
// 						</label>
// 						<input
// 							type="password"
// 							id="password"
// 							name="password"
// 							className="form-input"
// 							value={password}
// 							onChange={(e) => setPassword(e.target.value)}
// 							disabled={loading}
// 						/>
// 					</div>

// 					<br />
// 					<div className="flex items-center gap-7 justify-center mt-2">
// 						<div
// 							onClick={() => {
// 								if (!loading) {
// 									window.location.href = '/auth/login';
// 								}
// 							}}
// 						>
// 							<Button variant="outline" className="ml-2" disabled={loading}>
// 								Login
// 							</Button>
// 						</div>
// 						<div
// 							onClick={() => {
// 								if (!loading) {
// 									handleSubmit();
// 								}
// 							}}
// 						>
// 							<Button disabled={loading}>
// 								{loading ? 'Submitting...' : 'Submit'}
// 							</Button>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Registration;

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { authAPI } from '../../api';
import './auth.css';

const Registration = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	// Check if user is already logged in
	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			// Already logged in, redirect to home
			navigate('/home');
		}
	}, [navigate]);

	const validateForm = () => {
		// Basic validation
		if (!username.trim()) {
			toast.error('Username is required', {
				position: 'top-right',
				autoClose: 5000,
			});
			return false;
		}

		if (!email.trim()) {
			toast.error('Email is required', {
				position: 'top-right',
				autoClose: 5000,
			});
			return false;
		}

		// Simple email validation
		const emailRegex = /\S+@\S+\.\S+/;
		if (!emailRegex.test(email)) {
			toast.error('Please enter a valid email', {
				position: 'top-right',
				autoClose: 5000,
			});
			return false;
		}

		if (!password.trim()) {
			toast.error('Password is required', {
				position: 'top-right',
				autoClose: 5000,
			});
			return false;
		}

		if (password.length < 6) {
			toast.error('Password must be at least 6 characters', {
				position: 'top-right',
				autoClose: 5000,
			});
			return false;
		}

		return true;
	};

	const handleSubmit = async () => {
		// Validate the form
		if (!validateForm()) {
			return;
		}

		setLoading(true);

		try {
			// Call the register API
			console.log('Attempting registration with:', { username, email });
			await authAPI.register(username, email, password);

			// Reset the form
			setUsername('');
			setEmail('');
			setPassword('');

			toast.success('Registration successful! Redirecting to login...', {
				position: 'top-center',
				autoClose: 2000,
			});

			// Redirect to login after 2 seconds
			setTimeout(() => {
				navigate('/auth/login');
			}, 2000);
		} catch (err) {
			console.error('Registration error:', err);

			toast.error(
				err instanceof Error
					? err.message
					: 'Registration failed. Please try again.',
				{
					position: 'top-right',
					autoClose: 5000,
				}
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<div
				className="nav-bar"
				style={{
					display: 'flex',
					alignItems: 'start',
					gap: '20px',
					justifyContent: 'start',
				}}
			>
				<div className="logo">
					<img
						src="/reg-icon.png"
						alt="Mind-Bloom Logo"
						style={{
							height: '40px',
						}}
					/>
				</div>
				<motion.h1
					className="text-4xl font-bold text-gradient"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: 'easeOut' }}
					style={{
						textShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
					}}
				>
					Mind-Bloom
				</motion.h1>
			</div>
			<div
				className="flex flex-col items-center justify-center min-h-screen py-2"
				style={{ marginTop: '-6rem' }}
			>
				<ToastContainer />
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5 }}
					className="bg-white p-8 rounded-lg shadow-lg"
				>
					<h1 className="text-2xl font-bold mb-6 text-center">Registration</h1>

					<div className="flex flex-col mb-4 gap-4">
						<div className="flex items-center gap-4 justify-between">
							<label
								htmlFor="username"
								className="block text-sm font-medium text-gray-700 w-24"
							>
								Username
							</label>
							<input
								type="text"
								id="username"
								name="username"
								className="form-input w-64"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								disabled={loading}
							/>
						</div>

						<div className="flex items-center gap-4 justify-between">
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 w-24"
							>
								Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								className="form-input w-64"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								disabled={loading}
							/>
						</div>

						<div className="flex items-center gap-4 justify-between">
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700 w-24"
							>
								Password
							</label>
							<input
								type="password"
								id="password"
								name="password"
								className="form-input w-64"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								disabled={loading}
								onKeyPress={(e) => {
									// Submit on Enter key
									if (e.key === 'Enter') {
										handleSubmit();
									}
								}}
							/>
						</div>

						<div className="flex items-center justify-center gap-4 mt-4">
							<Button
								variant="outline"
								className="w-28"
								disabled={loading}
								onClick={() => navigate('/auth/login')}
							>
								Login
							</Button>
							<Button
								className="w-28"
								disabled={loading}
								onClick={handleSubmit}
							>
								{loading ? 'Registering...' : 'Register'}
							</Button>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default Registration;
