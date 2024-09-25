import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.scss';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './utils/theme.js';
import { TextFormProvider } from './context/TextFormContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    <TextFormProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </TextFormProvider>
  </ChakraProvider>
);

