import { createContext, FC, useState } from 'react';
import { Divider, Link, Snackbar, Typography } from '@mui/material';
import { ReactComponent as WhiteClose } from '../../assets/icons/X-icon-white.svg';
import { ReactComponent as Close } from '../../assets/icons/X-icon.svg';
import { ReactComponent as CheckMark } from '../../assets/icons/white-check-mark.svg';
import { ReactComponent as AlertIcon } from '../../assets/icons/intake-icons/alert-icon.svg';
import { ReactComponent as StoreFront } from '../../assets/icons/store-front.svg';
import { ToastWrapper } from './styles';
import CustomDialog from '../../components/common/ErrorDialog';
export interface ToastObj {
  variant?: string;
  vertical?: 'top' | 'bottom';
  horizontal?: 'right' | 'center';
  text: string;
  secondaryText?: string;
  isIcon?: boolean;
  close?: boolean;
}

interface ToastContextTypes {
  showToast: (a: ToastObj) => void;
  showSecondaryToast: (a: ToastObj) => void;
  showErrorDialog: (a: string) => void;
}

export const ToastContext = createContext<ToastContextTypes>({
  showToast: () => {
    /* This is intentional*/
  },
  showSecondaryToast: () => {
    /* This is intentional*/
  },
  showErrorDialog: () => {
    /* This is intentional*/
  },
});

const ToastContextProvider: FC = ({ children }) => {
  const autoHideDuration = 4000;
  const defaultVariant = 'success';
  const defaultSecondaryVariant = 'secondary-success';
  const [open, setOpen] = useState<boolean>(false);
  const [openSecondary, setOpenSecondary] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [secondaryText, setSecondaryText] = useState<string>('');
  const [variant, setVariant] = useState<string>(defaultVariant);
  const [vertical, setVertical] = useState<'top' | 'bottom'>('top');
  const [horizontal, setHorizontal] = useState<'right' | 'center'>('right');
  const [isIcon, setIsIcon] = useState<boolean>(true);
  const [close, setClose] = useState<boolean>(true);
  const [openErrorDialog, setOpenErrorDialog] = useState<boolean>(false);
  const [errorTextValue, setErrorTextValue] = useState<string>('');

  const showToast = ({
    text,
    isIcon = true,
    variant = 'success',
    vertical = 'top',
    close = true,
    horizontal = 'right',
  }: ToastObj) => {
    setOpen(true);
    setText(text);
    setIsIcon(isIcon);
    setVariant(variant);
    setVertical(vertical);
    setHorizontal(horizontal);
    setClose(close);
    setTimeout(() => {
      handleClose();
    }, 4000);
  };

  const showSecondaryToast = (data: ToastObj) => {
    setText(data.text);
    setOpenSecondary(true);
    setVariant(data.variant ? data.variant : defaultSecondaryVariant);
    setSecondaryText(data.secondaryText ? data.secondaryText : '');
  };
  const showErrorDialog = (errorText: string) => {
    setOpenErrorDialog(true);
    setErrorTextValue(errorText);
  };

  const handleClose = () => {
    setOpen(false);
    setText('');
  };

  const handleSecondaryClose = () => {
    setOpenSecondary(false);
    setText('');
  };

  const handleErrorDialogClose = () => {
    setOpenErrorDialog(false);
  };

  const action = (
    <div className='icon-container'>
      <Divider orientation={'vertical'} className='divider' />
      <WhiteClose onClick={handleClose} />
    </div>
  );

  const secondaryAction = (
    <div className='icon-container'>
      <Close onClick={handleSecondaryClose} />
    </div>
  );

  return (
    <ToastContext.Provider
      value={{
        showToast,
        showSecondaryToast,
        showErrorDialog,
      }}
    >
      <ToastWrapper>
        <Snackbar
          className={variant}
          open={open}
          autoHideDuration={autoHideDuration}
          onClose={handleClose}
          message={
            <span className='left-icon'>
              {isIcon ? (
                <CheckMark className='success-icon' />
              ) : (
                <AlertIcon className='success-icon' />
              )}
              <Typography
                variant='body1'
                component='span'
                className='notification-message'
              >
                {text}
              </Typography>
            </span>
          }
          action={close && action}
          anchorOrigin={{ vertical, horizontal }}
        />

        <Snackbar
          className={variant}
          open={openSecondary}
          autoHideDuration={autoHideDuration}
          onClose={handleSecondaryClose}
          message={
            <span className='left-icon'>
              <StoreFront className='success-icon' />
              <Typography
                variant='body1'
                className='secondary-notification-message'
              >
                <Link className='secondary-notification-message'>{text}</Link>
                {secondaryText}
              </Typography>
            </span>
          }
          action={secondaryAction}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />
        <CustomDialog
          isModalOpen={openErrorDialog}
          handleClose={handleErrorDialogClose}
          errorText={errorTextValue}
        />
      </ToastWrapper>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContextProvider;
