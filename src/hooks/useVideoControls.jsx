import { useState, useEffect } from 'react';

import { createFFmpeg } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({
  log: true,
});

const useVideoControls = (videoFile) => {
  const [videoPlayerState, setVideoPlayerState] = useState();
  const [videoPlayer, setVideoPlayer] = useState();
  const [sliderValues, setSliderValues] = useState([0, 100]);
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
  const [timeValues, setTimeValues] = useState([0, 0]);

  const handleRanges = ({ min, max }) => {
    setSliderValues([min, max]);
  };
  const handleVideoPlayerState = (videoPlayerState) => setVideoPlayerState(videoPlayerState);
  const handleVideoPlayer = (videoPlayer) => setVideoPlayer(videoPlayer);
  
  function sliderValueToVideoTime(duration, sliderValue) {
    return Math.round((duration * sliderValue) / 100);
  }  

  useEffect(() => {
    const min = sliderValues[0];
    if (!min || !videoPlayerState || !videoPlayer) return;
    videoPlayer.seek(sliderValueToVideoTime(videoPlayerState.duration, min));
  }, [sliderValues]);

  useEffect(() => {
    setVideoPlayerState(undefined);
  }, [videoFile]);

  useEffect(() => {
    if (!videoPlayer || !videoPlayerState) return;

    const [min, max] = sliderValues;
    const minTime = sliderValueToVideoTime(videoPlayerState.duration, min);
    const maxTime = sliderValueToVideoTime(videoPlayerState.duration, max);

    if (videoPlayerState.currentTime < minTime) videoPlayer.seek(minTime);
    if (videoPlayerState.currentTime > maxTime) videoPlayer.seek(minTime);

    setTimeValues([minTime, maxTime]);
  }, [videoPlayerState, setTimeValues]);

  useEffect(() => {
    ffmpeg.load().then(() => {
      setFfmpegLoaded(true);
    });
  }, []);

  return {
    ffmpeg,
    ffmpegLoaded,
    videoPlayerState,
    videoPlayer,
    sliderValues,
    timeValues,
    handleVideoPlayerState,
    handleVideoPlayer,
    handleRanges,
  };
};

export default useVideoControls;
