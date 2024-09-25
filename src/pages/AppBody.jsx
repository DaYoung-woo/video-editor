import { useState } from 'react';

import useVideoControls from '../hooks/useVideoControls';

import VideoReselect from '../components/videos/VideoReselect';
import VideoSelect from '../components/videos/VideoSelect';
import VideoPlayer from '../components/videos/VideoPlayer';
import MultiRangeSlider from '../components/videos/MultiRangeSlider';
import BtnArea from '../components/BtnArea';

const AppBody = () => {
  const [videoFile, setVideoFile] = useState();
  const {
    ffmpeg,
    ffmpegLoaded,
    videoPlayerState,
    sliderValues,
    timeValues,
    handleVideoPlayerState,
    handleVideoPlayer,
    handleRanges,
  } = useVideoControls(videoFile);

  return (
    <div className={`AppBody`}>
      <div className="w-full max-w-3xl h-full m-auto">
        <VideoReselect setVideoFile={setVideoFile} videoFile={videoFile} />
        {!videoFile ? (
          <VideoSelect setVideoFile={setVideoFile} ffmpegLoaded={ffmpegLoaded} />
        ) : (
          <VideoPlayer src={videoFile} onPlayerChange={handleVideoPlayer} onChange={handleVideoPlayerState} />
        )}
        {!!videoFile && <MultiRangeSlider min={0} max={100} handleRanges={handleRanges} />}
        {!!videoFile && (
          <>
            <div className="mt-4 text-center">
              재생시간 <b>{(timeValues[1] - timeValues[0])}초</b>
            </div>
            <BtnArea
              ffmpeg={ffmpeg}
              videoPlayerState={videoPlayerState}
              sliderValues={sliderValues}
              videoFile={videoFile}
              timeValues={timeValues}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AppBody;
