import React from 'react';
import Typography from '@material-ui/core/Typography';

export const Title = ({
  content,
  color
}: {
  content: string;
  color: string;
}): React.ReactElement => (
  <Typography
    style={{
      width: '400px',
      height: '100px',
      textAlign: 'center',
      padding: '10px',
      lineHeight: '100px',
      border: '1px solid grey',
      backgroundColor: 'white',
      color: `${color}`
    }}
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
