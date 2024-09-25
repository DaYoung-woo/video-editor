import { CiLight } from "react-icons/ci";
import { PiMoonThin } from "react-icons/pi";
import { useColorMode } from '@chakra-ui/react'

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <header className={`flex justify-between items-center`}>
      <p className="font-thin text-xl">VIDEO EDITOR</p>
      {colorMode === 'dark' ? <CiLight size={`24px`} onClick={toggleColorMode}/> : <PiMoonThin size={`24px`} onClick={toggleColorMode}/>}
    </header>
    
  )
}

export default Header