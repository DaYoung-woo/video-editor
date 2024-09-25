import { createContext, useState, useContext } from 'react';

// 컨텍스트 생성 및 디폴트 값 설정
const TextFormContext = createContext({
  textForm: {
    use: 'false',
    text: '',
    fontSize: 80,
    fontColor: '#000000',
  },
  setTextForm: () => {},
});

// 컨텍스트 프로바이더 컴포넌트
export function TextFormProvider({ children }) {
  const [textForm, setTextForm] = useState({
    use: "false",
    text: '',
    fontSize: 80,
    fontColor: '#000000',
  });

  return <TextFormContext.Provider value={{ textForm, setTextForm }}>{children}</TextFormContext.Provider>;
}

// 커스텀 훅
export const useTextForm = () => useContext(TextFormContext);
