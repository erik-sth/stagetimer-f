import { useState, useEffect } from 'react';
import './Viewer.css'; // Make sure the path matches your project structure
import FullscreenBtn from '../Buttons/Fullscreen/FullscreenBtn';
import MirrorBtn from '../Buttons/Mirror/MirrorBtn';

interface Props {
	showClock: boolean;
}

const Viewer = ({ showClock }: Props) => {
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

	const formatCountdown = (seconds: number) => {
		const isNegative = seconds < 0;

		const absoluteSeconds = Math.abs(seconds);
		const hours = Math.floor(absoluteSeconds / 3600);
		const minutes = Math.floor((absoluteSeconds % 3600) / 60);
		const remainingSeconds = absoluteSeconds % 60;

		const formattedHours = hours > 0 ? `${hours.toString()}` : '';
		const formattedMinutes =
			minutes > 0 || hours > 0
				? `${minutes.toString().padStart(2, '0')}`
				: '0';
		const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

		const negativePrefix = isNegative ? '-' : '';

		return (
			<span className={isNegative || seconds < 61 ? 'red' : ''}>
				<span>{negativePrefix}</span>
				{formattedHours && <span>{formattedHours}:</span>}
				<span>{formattedMinutes}:</span>
				<span>{formattedSeconds}</span>
			</span>
		);
	};

	return (
		<>
			<div className='viewer'>
				<div className='buttons'>
					<MirrorBtn />
					<FullscreenBtn />
				</div>
				{/* "Begins in..." text */}
				<div className='headerText'>Begins in...</div>
				{/* Countdown Timer */}
				<div className='countdown'>{formatCountdown(timer)}</div>
				{/* Current Time */}
				{showClock && (
					<div className='currentTime'>
						{time.toLocaleTimeString()}
					</div>
				)}
			</div>
		</>
	);
};

export default Viewer;
