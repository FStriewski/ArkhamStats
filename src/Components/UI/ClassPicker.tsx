import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { CustomCheckbox } from './Checkbox';
import { investigatorClassColor } from '../../lookups/lists';

const drawerWidth = 250;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth,
      marginTop: '140px'
    },
    drawerContainer: {
      overflow: 'auto'
    },
    fcLabel: {
      color: '#6C6A6A',
      fontSize: '10px'
    },
    formControl: {
      margin: theme.spacing(2)
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(1)
    }
  })
);
type Props = {
  children: React.FC<string[]>;
};

export const ClassPicker = ({ children }: Props): React.ReactElement => {
  const classes = useStyles();

  const [classSelection, setSelection] = React.useState<string[]>(['guardian']);

  const handleSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const iclass = event.target.id;
    if (!classSelection.includes(iclass)) {
      setSelection([...classSelection, iclass]);
    } else {
      const newstate = classSelection.filter((item) => item !== iclass);
      setSelection(newstate);
    }
  };

  const checked = (iclass: string) => classSelection.includes(iclass);
  const error = classSelection.length >= 3;
  const iclasses = Object.keys(investigatorClassColor).filter(
    (k) => k !== 'all'
  );

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant='permanent'
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerContainer}>
          <FormGroup>
            {iclasses.map((iclass: string) => (
              <FormControlLabel
                control={
                  <CustomCheckbox
                    checked={checked(iclass)}
                    onChange={handleSelection}
                    name={iclass}
                    id={iclass}
                    disabled={!checked(iclass) && error}
                  />
                }
                label={iclass}
                key={iclass}
                style={{ color: investigatorClassColor[iclass] }}
                className={classes.fcLabel}
              />
            ))}
          </FormGroup>
        </div>
      </Drawer>
      <main className={classes.content}>{children(classSelection)}</main>
    </div>
  );
};
