import { Modal, ModalOverlay, ModalContent, ModalBody, Spinner } from '@chakra-ui/react';

const ConverProcessModal = ({ processing, convertFileType, convertPercent }) => {
  return (
    <Modal isOpen={processing}>
      <ModalOverlay />
      <ModalContent m={'auto'} p={'20px'}>
        <ModalBody textAlign={'center'}>
          <Spinner color="#f97316" />
          <div className="font-semibold">{convertPercent}%</div>
          <p className="pt-4">{convertFileType} 파일로 변환중입니다</p>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConverProcessModal;
