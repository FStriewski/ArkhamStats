import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { CustomCheckbox } from '../UI/Checkbox';
import {
  investigatorList,
  lookupInvestigator
} from '../../lookups/investigatorList';
import { InvestigatorListItem } from '../../types';
import Slide from '@material-ui/core/Slide';

const drawerWidth = 220;

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

export const Sidebar = (props) => {
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
              {/* <FormLabel component="legend">Pick two</FormLabel> */}
              <FormGroup>
                {investigatorList
                  .sort((a, b) =>
                    a.name < b.name ? -1 : a.name > b.name ? 1 : 0
                  )
                  .map((inv: InvestigatorListItem) => (
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
      <main className={classes.content}>
        {props.children(investigatorSelection)}
      </main>
    </div>
  );
};
