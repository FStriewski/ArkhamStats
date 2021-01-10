import React from 'react';
import {
  withStyles,
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';

const useStyles = makeStyles((theme: Theme) =>
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
  setSelection: (selection: string[]) => void;
};

export const SidebarControls = ({
  selectCount,
  setSelection
}: Props): React.ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.buttonwrapper}>
      <div>
        <IconButton aria-label='delete' className={classes.margin}>
          <PersonIcon />
        </IconButton>
        {selectCount}
      </div>
      <IconButton
        aria-label='delete'
        onClick={() => setSelection([])}
        style={{ color: '#CC3038', marginRight: '10px' }}
      >
        <PersonAddDisabledIcon />
      </IconButton>
    </div>
  );
};
