import { useRef } from "react"
import { CiVideoOn } from "react-icons/ci";
import { Spinner } from '@chakra-ui/react'
import { useState } from "react";
import AlertModal from '../AlertModal'

const VideoSelect = ({setVideoFile, ffmpegLoaded}) => {
  const uploadFile = useRef('')
  const [hover, setHover] = useState(false)
  const [alertMsg, setAlertMsg] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const handleImage = (e) => {
    setVideoFile(e.target.files[0])
  }

  const openAlertModal = (msg) => {
    setAlertMsg(msg)
    setIsModalOpen(true)
  }
  const handleDrop = (e) => {
    e.preventDefault();

    if(e.dataTransfer.files.length > 1) openAlertModal('하나의 파일만 넣어주세요.')
    else if(e.dataTransfer.files[0]?.type.split('/')[0] !== 'video') openAlertModal('비디오 파일만 가능합니다.')
    else setVideoFile(e.dataTransfer.files[0]) 
    
    setHover(false)
  };
  
  const hoverVideoArea = (e, isHover) => {
    e.preventDefault();
    setHover(isHover)
  }

  return (
    <section className="flex flex-col pb-4 align-center items-center w-full max-w-3xl h-2/5 sm:h-3/5 m-auto">
      <input 
        type="file" 
        accept='video/*' 
        className="hidden" 
        ref={uploadFile} 
        onChange={handleImage}
      />
      
      <div 
        className={`flex flex-col items-center justify-center w-full max-w-3xl h-full video-area ${hover && 'drop'}`} 
        onClick={() => ffmpegLoaded ?  uploadFile.current.click() : false}
        onDrop={handleDrop}
        onDragEnter={e => hoverVideoArea(e, true)}
        onDragLeave={e => hoverVideoArea(e, false)}
        onDragOver={e => e.preventDefault()}  
      >
        
        {ffmpegLoaded ? (
          <>
            <div className="bg-orange-500 rounded-full w-12 h-12 flex items-center justify-center">
              <CiVideoOn size={`32px`} color="#fff"/>
            </div>
            <p className="pt-6 font-semibold text-base">비디오를 선택해주세요.</p>
            <span className="text-sm">비디오 파일을 여기에 드래그앤드랍해주세요.</span>
          </>
        ): (
          <>
            <Spinner color='#f97316' />
            <p className="pt-2">로딩중 입니다</p>
          </>
        )}
      </div>
      
      <AlertModal msg={alertMsg} isOpen={isModalOpen} setIsOpen={setIsModalOpen}/>
    </section>
  )
}

export default VideoSelect