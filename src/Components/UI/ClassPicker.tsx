import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import FormGroup from '@material-ui/core/FormGroup';
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
      marginTop: '97px'
    },
    drawerContainer: {
      overflow: 'auto',
      marginTop: '20px'
    },
    fcLabel: {
      fontSize: '20px',
      textTransform: 'capitalize',
      marginLeft: '30px',
      margin: theme.spacing(1)
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
              <div
                key={iclass}
                style={{
                  color: investigatorClassColor[iclass] as string
                }}
                className={classes.fcLabel}
              >
                <CustomCheckbox
                  checked={checked(iclass)}
                  onChange={handleSelection}
                  name={iclass}
                  id={iclass}
                  disabled={!checked(iclass) && error}
                  style={{ marginRight: '5px' }}
                />
                {iclass}
              </div>
            ))}
          </FormGroup>
        </div>
      </Drawer>
      <main className={classes.content}>{children(classSelection)}</main>
    </div>
  );
};
