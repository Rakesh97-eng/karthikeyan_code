import { Link, Typography } from '@mui/material';
import React, { FC } from 'react';
import { MessageList } from '../../../types/treatmentRecord/question';
import { MessageCardContainer, MessageCardWrapper } from './styles';

interface MessageCardProps {
  cardList: MessageList[];
}
const MessageCard: FC<MessageCardProps> = ({ cardList }) => {
  return (
    <>
      {cardList.map((list: MessageList, index: number) => {
        return (
          <Link href={list?.path} key={`list-${index}`} target={'_blank'}>
            <MessageCardContainer>
              <MessageCardWrapper>
                <div className='card-content'>
                  <Typography variant='h4' className='header'>
                    {list.header}
                  </Typography>
                  <Typography variant='body2' className='title'>
                    {list.title}
                  </Typography>
                </div>
                  <img src={list.image} alt='card-image' className='svg-icon' />
              </MessageCardWrapper>
            </MessageCardContainer>
          </Link>
        );
      })}
    </>
  );
};
export default MessageCard;
