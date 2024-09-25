import { fetchFile } from '@ffmpeg/ffmpeg';
import { useTextForm } from '../context/TextFormContext';
import { useToast } from '@chakra-ui/react'

export const useConvertFile = ({
  ffmpeg,
  videoFile,
  setProcessing,
  setConvertFail,
  timeValues,
  convertFileType,
  setConvertPercent,
  setConvertFileType
}) => {
  const toast = useToast()
  const { textForm } = useTextForm();

  const inputFileName = 'input.mp4';
  const outputFileName = `output.${convertFileType === 'GIF' ? 'gif' : convertFileType === 'MP3' ? 'mp3' : 'mp4'}`;
  
  const runFfmpeg = async () => {
    const [minTime, maxTime] = timeValues;

    // GIF인 경우
    if (convertFileType === 'GIF')  {
      return await ffmpeg.run('-i', inputFileName, '-ss', `${minTime}`, '-to', `${maxTime}`, '-f', 'gif', outputFileName);
    }
    // MP3인경우 
    if (convertFileType === 'MP3') {
      return await ffmpeg.run('-i', inputFileName, '-ss', `${minTime}`, '-to', `${maxTime}`, '-q:a', '0', '-f', 'mp3', outputFileName);
    }
    // 텍스트 없는 MP4인 경우
    if(!JSON.parse(textForm.use)) {
      return await ffmpeg.run('-ss', `${minTime}`, '-i', 'input.mp4', '-t', `${maxTime}`, '-c', 'copy', 'output.mp4');
    }

    // 텍스트 있는 MP4인 경우
    const textUrl = `https://raw.githubusercontent.com/ffmpegwasm/testdata/master/arial.ttf`
    ffmpeg.FS('writeFile', 'arial.ttf',await fetchFile(textUrl));

    const drwaText = `drawtext=fontfile=/arial.ttf:text='${textForm.text}':x=10:y=20:fontsize=${textForm.fontSize}:fontcolor=${textForm.fontColor}`
    await ffmpeg.run('-i', inputFileName,'-ss', `${minTime}`, '-t', `${maxTime}`, '-vf', drwaText, '-f','mp4', outputFileName);
  }

  const readFileAsBase64 = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
  };
  
  const download = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', '');
    link.click();
  };

  const convertFile = async () => {
    setProcessing(true);
    
    ffmpeg.FS('writeFile', inputFileName, await fetchFile(videoFile));
    ffmpeg.setProgress(({ ratio }) => {
      if (Math.round((ratio) * 100) < 0) setConvertPercent(0);
      else setConvertPercent(Math.round((ratio || 0) * 100));
    });
    await runFfmpeg()

    try {
      const data = ffmpeg.FS('readFile', outputFileName);
      const type = convertFileType === 'GIF' ? 'image/gif' : convertFileType === 'MP3' ? 'audio/mp3' : 'video/mp4';
      const fileUrl = await readFileAsBase64(new Blob([data.buffer], { type }));  
      download(fileUrl)
      toast({
        title: `${convertFileType}파일 다운로드가 완료되었습니다`,
        duration: 2000,
        isClosable: false,
        status: 'warning'
      })
    } catch (e) {
      setConvertFail(true);
    }
    setConvertFileType('')
    setProcessing(false);
  };

  return convertFile;
};
