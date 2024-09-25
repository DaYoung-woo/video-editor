import { useRef } from "react"

const VideoReselect = ({ videoFile, setVideoFile }) => {
  const uploadFile = useRef('')
  
  return (
    <section className="h-14 text-right">
      <input 
        type="file" 
        accept='video/*' 
        className="hidden" 
        ref={uploadFile} 
        onChange={(e) => setVideoFile(e.target.files[0])}
      />
      <button 
        onClick={() => uploadFile.current.click()} 
        className={`img-reupload-btn ${!videoFile && 'hidden'}`}
      >
        비디오 재선택
      </button>
    </section>
  )
}

export default VideoReselect