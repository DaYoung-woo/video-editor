import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react'

const AlertModal = ({isOpen, setIsOpen, msg}) => {
  return (
    <Modal isOpen={isOpen} >
      <ModalOverlay />
      <ModalContent m={'auto'} p={'30px'}>
        <ModalBody textAlign={'center'}>
          <p className="font-semibold text-base">{msg}</p>
        </ModalBody> 
        <ModalFooter className='text-center justify-center m-auto'>
          <button className='bg-zinc-100 rounded-md px-4 py-2' onClick={() => setIsOpen(false)}>
            닫기
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AlertModal