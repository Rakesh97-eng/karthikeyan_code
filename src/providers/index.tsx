import { FC } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { appTheme } from '../theme/appTheme';
import ToastContextProvider from './context/toastContext';
import LayoutProvider from './context/LayoutContext';
import { BrowserRouter } from 'react-router-dom';

const RootProvider: FC = ({ children }) => {
  return (
    <BrowserRouter>
     <LayoutProvider>
      <ThemeProvider theme={appTheme}>
        <CssBaseline>
          <ToastContextProvider>
          {children}
          </ToastContextProvider>
        </CssBaseline>
      </ThemeProvider>
    </LayoutProvider>
    </BrowserRouter>
  );
};

export default RootProvider;
