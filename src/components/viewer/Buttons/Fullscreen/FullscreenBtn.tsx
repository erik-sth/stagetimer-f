import FullscreenIcon from './assets/fullscreen.svg';
import FullscreenExitIcon from './assets/fullscreen-exit.svg';
import { useState } from 'react';

const FullscreenBtn = () => {
	const [fullscreen, setFullscreen] = useState<boolean>(
		!window.screenTop && !window.screenY
	);
	function activateFullscreen() {
		document.body.requestFullscreen();
		setFullscreen(true);
	}
	function deactivateFullscreen() {
		document.exitFullscreen();
		setFullscreen(false);
	}
	return (
		<>
			{fullscreen ? (
				<img
					onClick={deactivateFullscreen}
					src={FullscreenExitIcon}
					alt=''
				/>
			) : (
				<img onClick={activateFullscreen} src={FullscreenIcon} alt='' />
			)}
		</>
	);
};

export default FullscreenBtn;
