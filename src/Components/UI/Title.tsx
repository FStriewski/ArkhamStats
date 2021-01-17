import React from 'react';
import Typography from '@material-ui/core/Typography';

export const Title = ({ content }: { content: string }): React.ReactElement => (
  <Typography
    style={{ width: '100%', textAlign: 'center', padding: '10px' }}
    variant='h4'
  >
    {content}
  </Typography>
);
export const SubTitle = ({
  content
}: {
  content: string;
}): React.ReactElement => (
  <Typography style={{ width: '100%', textAlign: 'center' }} variant='h6'>
    {content}
  </Typography>
);
