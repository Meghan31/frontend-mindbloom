// import { Button } from '@/components/ui/button';
// import { useState } from 'react';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { authAPI } from '../../api';
// import './auth.css';

// import { motion } from 'framer-motion';
// const Login = () => {
// 	const [email, setEmail] = useState('');
// 	const [password, setPassword] = useState('');
// 	// const [error, setError] = useState<string | null>(null);
// 	const [loading, setLoading] = useState(false);
// 	// const [success, setSuccess] = useState(false);

// 	const validateForm = () => {
// 		// Basic validation
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
// 			// Call the login API
// 			await authAPI.login(email, password);
// 			// setSuccess(true);

// 			// Redirect to home after successful login
// 			toast.success('Login successful!', {
// 				position: 'top-center',
// 				autoClose: 2000,
// 				hideProgressBar: false,
// 				closeOnClick: true,
// 				pauseOnHover: true,
// 				draggable: true,
// 				progress: undefined,
// 			});
// 			setTimeout(() => {
// 				window.location.href = '/home';
// 			}, 2000);
// 		} catch (err) {
// 			// setError(
// 			// 	err instanceof Error
// 			// 		? err.message
// 			// 		: 'Login failed. Please check your credentials and try again.'
// 			// );
// 			toast.error(
// 				err instanceof Error
// 					? err.message
// 					: 'Login failed. Please check your credentials and try again.',
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
// 		} finally {
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
// 				className="flex flex-col items-center justify-center min-h-screen py-2 h-1.5 "
// 				style={{ marginTop: '-6rem' }}
// 			>
// 				<ToastContainer />
// 				<h1 className="text-2xl font-bold">Login</h1>

// 				{/* {error && <div className="text-red-500 mt-4">{error}</div>} */}

// 				<div className="flex flex-col justify-between mb-4 m-10 gap-1">
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
// 									window.location.href = '/auth/register';
// 								}
// 							}}
// 						>
// 							<Button variant="outline" className="ml-2" disabled={loading}>
// 								Register
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
// 								{loading ? 'Logging in...' : 'Login'}
// 							</Button>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Login;
// // Note: The above code is a simplified version of the login page. In a real-world application, you would also want to handle token storage, user session management, and possibly use a state management library like Redux or Context API for better state handling across your application.

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authAPI } from '../../api';
import './auth.css';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	// Check if user is already logged in
	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			// Attempt to verify token validity
			const checkToken = async () => {
				try {
					// You could add a token verification endpoint in your API
					// For now, just redirect to home if token exists
					navigate('/home');
				} catch (error) {
					// If token verification fails, clear it
					localStorage.removeItem('token');
					console.error('Invalid token, please login again and :', error);
				}
			};

			checkToken();
		}
	}, [navigate]);

	const validateForm = () => {
		// Basic validation
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

		return true;
	};

	const handleSubmit = async () => {
		// Validate the form
		if (!validateForm()) {
			return;
		}

		setLoading(true);

		try {
			// Call the login API
			console.log('Attempting login with:', { email });
			const response = await authAPI.login(email, password);

			console.log('Login successful:', response);

			toast.success('Login successful!', {
				position: 'top-center',
				autoClose: 2000,
			});

			// Redirect to home after successful login
			setTimeout(() => {
				navigate('/home');
			}, 1000);
		} catch (err) {
			console.error('Login error:', err);

			toast.error(
				err instanceof Error
					? err.message
					: 'Login failed. Please check your credentials and try again.',
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
			<div className="nav-bar">
				<motion.h1
					className="text-4xl font-bold text-gradient"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: 'easeOut' }}
					style={{
						textShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
					}}
				>
					Welcome to Mind-Bloom
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
					<h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

					<div className="flex flex-col mb-4 gap-4">
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
								onClick={() => navigate('/auth/register')}
							>
								Register
							</Button>
							<Button
								className="w-28"
								disabled={loading}
								onClick={handleSubmit}
							>
								{loading ? 'Logging in...' : 'Login'}
							</Button>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default Login;
