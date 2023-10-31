import { FC } from 'react';
import { StyledSwitch } from './styles';

interface ICustomSwitch {
  checked?: boolean;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomSwitch: FC<ICustomSwitch> = (props) => {
  return <StyledSwitch {...props} />;
};

export default CustomSwitch;
