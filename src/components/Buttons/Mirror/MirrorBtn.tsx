import Mirror from './assets/mirror.svg';

const MirrorBtn = () => {
	const toggleMirrorX = () => {
		// Check if the 'mirror-x' class is already present
		if (document.body.classList.contains('mirror-x')) {
			// Remove the 'mirror-x' class
			document.body.classList.remove('mirror-x');
		} else {
			// Add the 'mirror-x' class
			document.body.classList.add('mirror-x');
		}
	};
	const toggleMirrorY = () => {
		// Check if the 'mirror-y' class is already present
		if (document.body.classList.contains('mirror-y')) {
			// Remove the 'mirror-y' class
			document.body.classList.remove('mirror-y');
		} else {
			// Add the 'mirror-y' class
			document.body.classList.add('mirror-y');
		}
	};

	return (
		<div>
			<img
				className='icon'
				src={Mirror}
				alt='MirrorX'
				onClick={toggleMirrorX}
			/>
			<img
				onClick={toggleMirrorY}
				src={Mirror}
				className='icon rotate90'
				alt='Rotated Mirror'
			/>
		</div>
	);
};

export default MirrorBtn;
