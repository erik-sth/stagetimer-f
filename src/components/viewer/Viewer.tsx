import { useState, useEffect } from 'react';
import './Viewer.css'; // Make sure the path matches your project structure

const Viewer = () => {
	const [time, setTime] = useState(new Date());
	const [timer, setTimer] = useState(65); // 2 hours in seconds

	useEffect(() => {
		const timeId = setInterval(() => {
			setTime(new Date());
		}, 1000);

		const countdownId = setInterval(() => {
			setTimer((prevTimer) => prevTimer - 1);
		}, 1000);

		return () => {
			clearInterval(timeId);
			clearInterval(countdownId);
		};
	}, []);

	// Format countdown dynamically based on hours, minutes, seconds
	const formatCountdown = (seconds: number) => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const remainingSeconds = seconds % 60;

		const formattedHours = hours > 0 ? `${hours.toString()}` : '';
		const formattedMinutes =
			minutes > 0 || hours > 0
				? `${minutes.toString().padStart(2, '0')}`
				: '0';
		const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

		return (
			<>
				{formattedHours && <span>{formattedHours}</span>}
				{formattedHours && formattedMinutes && <span>:</span>}
				{formattedHours && <span>:</span>}
				<span>{formattedMinutes}:</span>
				<span>{formattedSeconds}</span>
			</>
		);
	};

	return (
		<div className='viewer'>
			{/* "Begins in..." text */}
			<div className='headerText'>Begins in...</div>
			{/* Countdown Timer */}
			<div className='countdown'>{formatCountdown(timer)}</div>
			{/* Current Time */}
			<div className='currentTime'>{time.toLocaleTimeString()}</div>
		</div>
	);
};

export default Viewer;
