import { useState, useEffect } from 'react';
import { PiGifThin, PiFileVideoThin } from 'react-icons/pi';
import { GiSoundWaves } from 'react-icons/gi';
import { useConvertFile } from '../hooks/useVideoConversion';
import ConverProcessModal from './videos/ConverProcessModal.jsx';
import VideoTextFormModal from './videos/VideoTextFormModal.jsx';
import AlertModal from './AlertModal.jsx'

const BtnArea = (props) => {
  const [convertFileType, setConvertFileType] = useState('');
  const [processing, setProcessing] = useState(false);
  const [convertPercent, setConvertPercent] = useState(0);
  const [convertFail, setConvertFail] = useState(false);
  const [openTextForm, setOpenTextForm] = useState(false);

  const convertFile = useConvertFile({ ...props, setProcessing, setConvertFail, convertFileType, setConvertFileType, setConvertPercent });

  const handleConvertButton = (convertType) => {
    setConvertFileType(convertType);
  };

  useEffect(() => {
    if(convertFileType) convertFile()
  }, [convertFileType])

  return (
    <section className={`pt-10 btn-area max-w-3xl m-auto`}>
      <button type="button" className="orange" onClick={() => handleConvertButton('GIF')}>
        <div className={`bg-orange-500 `}>
          <PiGifThin size={`28px`} color="#fff" />
        </div>
        <span>GIF 다운받기</span>
      </button>
      <button className="violet" onClick={() => handleConvertButton('MP3')}>
        <div className={`bg-violet-500`}>
          <GiSoundWaves size={`28px`} color="#fff" />
        </div>
        <span>MP3로 내보내기</span>
      </button>
      <button className="sky" onClick={() => setOpenTextForm(true)}>
        <div className={`bg-sky-500 `}>
          <PiFileVideoThin size={`28px`} color="#fff" />
        </div>
        <span>MP4 다운받기</span> 
      </button>

      <ConverProcessModal processing={processing} convertFileType={convertFileType} convertPercent={convertPercent} />
      <AlertModal isOpen={convertFail} setIsOpen={setConvertFail} msg="파일 변환에 실패했습니다."  />

      <VideoTextFormModal
        handleConvertButton={() => handleConvertButton('MP4')}
        openTextForm={openTextForm}
        setOpenTextForm={setOpenTextForm}
      />
    </section>
  );
};

export default BtnArea;
