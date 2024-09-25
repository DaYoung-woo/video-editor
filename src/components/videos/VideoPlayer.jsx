import { useEffect, useState } from "react";
import { BigPlayButton, ControlBar, LoadingSpinner, Player } from "video-react";
import 'video-react/dist/video-react.css'

const VideoPlayer = ({src, onPlayerChange = () => {}, onChange = () => {}, startTime = undefined}) => {
  const [player, setPlayer] = useState()
  const [source, setSource] = useState()
  const [playerState, setPlayerState] = useState(undefined);

  useEffect(() => {
    setSource(URL.createObjectURL(src))
  }, [src])

  useEffect(() => {
    if(playerState) onChange(playerState)
  }, [playerState])

  useEffect(() => {
    onPlayerChange(player)
    if(player) player.subscribeToStateChange(setPlayerState)
  }, [player])
  
  return (  
    <section className="flex flex-col pb-4 align-center items-center w-full max-w-3xl h-2/5 sm:h-3/5 m-auto">
      <div className="h-full w-full max-w-3xl"> 

        <Player
          ref={(player) => { setPlayer(player) }}
          src={source}
          startTime={startTime}
          fluid={false}
          width={`100%`}
          height={`100%`}
        >
          <source src={source} />
          <BigPlayButton position="center"/>
          <LoadingSpinner/>
          <ControlBar disableCompletely/>
        </Player>
      </div>
    </section>
  );
}

export default VideoPlayer;