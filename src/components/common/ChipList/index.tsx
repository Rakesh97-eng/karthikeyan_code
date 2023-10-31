import { FC } from 'react';
import ChipCard from './chipCard';
import { ChipWrapperList } from './styles';

interface ChipListProps {
  chip: string[];
}
const ChipList: FC<ChipListProps> = ({ chip }) => {
  return (
    <ChipWrapperList>
      {chip.map((chipLabel, i) => {
        return <ChipCard chipLabel={chipLabel} key={`chip-${i}`} />;
      })}
    </ChipWrapperList>
  );
};

export default ChipList;
