import { createContext, FC, useState } from 'react';
import { layoutTypes } from '../../types/commonTypes';
import { match, matchPath, useLocation } from 'react-router-dom';
import { CLIENT_INTAKE_PATH } from '../../constants/intakeConstants';

interface ILayoutContext {
  layoutData: layoutTypes;
  updateLayout?: (data: layoutTypes) => void;
}
const initialData: layoutTypes = {
  header: true,
  isClientIntake: false,
  token:''
};
export const LayoutContext = createContext<ILayoutContext>({
  layoutData: initialData,
});

const LayoutProvider: FC = ({ children }) => {
  const { pathname } = useLocation();
  const isClientIntake: match | null | boolean = CLIENT_INTAKE_PATH.some(
    (path) => !!matchPath(pathname, { path })
  );
  const [layoutData, setLayoutData] = useState<Partial<layoutTypes>>({
    ...initialData,
    isClientIntake,
  });

  const updateLayout = (data: Partial<layoutTypes>) => {
    setLayoutData({ ...layoutData, ...data });
  };

  return (
    <LayoutContext.Provider
      value={{
        layoutData,
        updateLayout,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
