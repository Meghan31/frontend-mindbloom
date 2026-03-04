import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/authentication/Login';
import Registration from './pages/authentication/Registration';
import CalendarPage from './pages/calendar/CalendarPage';
import Home from './pages/home/Home';

function App() {
	return (
		<ThemeProvider>
			<Router>
				<Routes>
					<Route path="/home" element={<Home />} />
					<Route path="/calendar" element={<CalendarPage />} />
					<Route path="/auth/login" element={<Login />} />
					<Route path="/auth/register" element={<Registration />} />
					<Route path="*" element={<Home />} />
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;
