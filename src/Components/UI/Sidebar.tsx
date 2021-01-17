import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { CustomCheckbox } from '../UI/Checkbox';
import { investigatorList } from '../../lookups/lists';
import { lookupInvestigator } from '../../lookups/helpers';
import { InvestigatorListEntry } from '../../types';
import Slide from '@material-ui/core/Slide';

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

export const Sidebar = ({ children }: Props): React.ReactElement => {
  const classes = useStyles();

  const [investigatorSelection, setSelection] = React.useState<string[]>([
    '01004'
  ]);

  const handleSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const investigator = event.target.id;
    if (!investigatorSelection.includes(investigator)) {
      setSelection([...investigatorSelection, investigator]);
    } else {
      const newstate = investigatorSelection.filter(
        (item) => item !== investigator
      );
      setSelection(newstate);
    }
  };

  const checked = (code: string) => investigatorSelection.includes(code);
  const error = investigatorSelection.length >= 3;

  return (
    <div className={classes.root}>
      <Slide direction='right' in mountOnEnter unmountOnExit>
        <Drawer
          className={classes.drawer}
          variant='permanent'
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerContainer}>
            <FormControl
              required
              error={error}
              component='fieldset'
              className={classes.formControl}
            >
              <FormGroup>
                {investigatorList
                  .sort((a, b) =>
                    a.name < b.name ? -1 : a.name > b.name ? 1 : 0
                  )
                  .map((inv: InvestigatorListEntry) => (
                    <FormControlLabel
                      control={
                        <CustomCheckbox
                          checked={checked(inv.code)}
                          onChange={handleSelection}
                          name={inv.name}
                          id={inv.code}
                          disabled={!checked(inv.code) && error}
                        />
                      }
                      label={inv.name}
                      key={inv.code}
                      style={{ color: lookupInvestigator(inv.code).color }}
                      className={classes.fcLabel}
                    />
                  ))}
              </FormGroup>
              <FormHelperText>You can display an error</FormHelperText>
            </FormControl>
          </div>
        </Drawer>
      </Slide>
      <main className={classes.content}>{children(investigatorSelection)}</main>
    </div>
  );
};
