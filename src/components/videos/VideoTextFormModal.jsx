import { ColorPicker, useColor } from 'react-color-palette';
import 'react-color-palette/css';
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
  Input,
} from '@chakra-ui/react';
import { useTextForm } from '../../context/TextFormContext';

const VideoTextFormModal = ({ handleConvertButton, openTextForm, setOpenTextForm }) => {
  const [color, setColor] = useColor('#904b4b');
  const { textForm, setTextForm } = useTextForm();

  return (
    <Modal isOpen={openTextForm} size="lg">
      <ModalOverlay />
      <ModalContent m={'auto'} p={'10px'}>
        <ModalHeader>MP4 생성</ModalHeader>
        <ModalBody textAlign={'center'}>
          <article className="flex text-left items-center">
            <span className="w-28 font-medium font-zinc-950">텍스트 사용</span>
            <RadioGroup
              name="form-name"
              onChange={(use) => setTextForm({ ...textForm, use })}
              value={textForm.use}
              colorScheme='orange' 
            >
              <Radio value="false">미사용</Radio>
              <Radio value="true" className="ml-2">
                사용
              </Radio>
            </RadioGroup>
          </article>

          <article className="flex text-left mt-6 items-start">
            <span className="w-28 font-medium font-zinc-950">텍스트 문구</span>
            <div>
              <Input
                placeholder="문구를 입력해주세요"
                size="sm"
                width="auto"
                value={textForm.text}
                onChange={(event) => setTextForm({ ...textForm, text: event.target.value })}
                isDisabled={!JSON.parse(textForm.use)}
              />
              <div className="pl-1 text-xs text-red-500 h-3">
                {JSON.parse(textForm.use) && !textForm.text && '텍스트 문구는 필수 입력 값입니다.'} 
              </div>
            </div>
          </article>

          <article className="flex text-left mt-4 items-start">
            <span className="w-28 font-medium font-zinc-950">font 크기</span>
            <>
              <NumberInput
                step={1}
                defaultValue={80}
                min={28}
                max={180}
                className="pr-2"
                size="sm"
                value={String(textForm.fontSize)}
                onChange={(valueString) => setTextForm({ ...textForm, fontSize: Number(valueString) })}
                isDisabled={!JSON.parse(textForm.use)}
              >
                <NumberInputField />
              </NumberInput>{' '}
              px
            </>
          </article>

          <article className="flex text-left mt-8 items-start">
            <span className="w-28 font-medium font-zinc-950">글자 색상</span>
              <ColorPicker
                hideInput={['rgb', 'hsv']}
                color={color}
                onChange={(color) => {
                  setColor(color);
                  setTextForm({ ...textForm, fontColor: color.hex });
                }}
                height={96}
                hideAlpha={true}
              />
              {!JSON.parse(textForm.use) && <div className='color-picker-area'/>}
              
          </article>
        </ModalBody>
        <ModalFooter className="text-center justify-center m-auto">
          <button
            className="modal-bottom-btn primary-btn mr-4 "
            onClick={() => {
              handleConvertButton('MP4');
              setOpenTextForm(false);
            }}
            disabled={JSON.parse(textForm.use) && !textForm.text}
          >
            다운로드
          </button>
          <button className="modal-bottom-btn close-btn" onClick={() => setOpenTextForm(false)}>닫기</button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default VideoTextFormModal;
