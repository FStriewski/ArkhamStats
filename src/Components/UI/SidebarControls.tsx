import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import { PICKERSELECTION } from '../../types';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    buttonwrapper: {
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: '1px solid #e0e0e0',
      alignItems: 'center',
      width: '100%',
      margin: '5px'
    },
    margin: {
      marginRight: '-10px'
    }
  })
);
type Props = {
  selectCount: number;
  pickerType: PICKERSELECTION;
  setSelection: (selection: string[]) => void;
};

export const SidebarControls = ({
  selectCount,
  setSelection,
  pickerType
}: Props): React.ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.buttonwrapper}>
      <div style={{ marginRight: 20 }}>
        <IconButton
          aria-label='delete'
          className={classes.margin}
          style={{ color: 'black' }}
        >
          <PersonIcon />
        </IconButton>
        {selectCount}
      </div>
      {pickerType === PICKERSELECTION.MULTI && (
        <Button
          variant='outlined'
          startIcon={<PersonAddDisabledIcon />}
          onClick={() => setSelection([])}
          style={{ marginRight: '10px' }}
        >
          Clear
        </Button>
      )}
    </div>
  );
};
