import React from 'react';
import Chip from '@material-ui/core/Chip';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import {
  investigatorList,
  lookupInvestigator,
  investigatorByFaction
} from '../../lookups/investigatorList';
import { PICKERSELECTION } from '../../types';
import Slide from '@material-ui/core/Slide';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const drawerWidth = 220;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    root2: {
      // width: '100%'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary
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

export const InvestigatorPicker = (props: any): React.ReactElement => {
  const classes = useStyles();

  const [investigatorSelection, setSelection] = React.useState<string[]>([
    '01004'
  ]);
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };
  const drawers = Object.keys(investigatorByFaction);

  const handleSelection = (
    event: React.MouseEvent<HTMLElement>
    // investigator: string
  ) => {
    const investigator = (event.target as HTMLElement).id;
    if (props.pickerType === PICKERSELECTION.MULTI) {
      if (!investigatorSelection.includes(investigator)) {
        setSelection([...investigatorSelection, investigator]);
      } else {
        const newstate = investigatorSelection.filter(
          (item) => item !== investigator
        );
        setSelection(newstate);
      }
    }
    if (props.pickerType === PICKERSELECTION.SINGLE) {
      if (!investigatorSelection.includes(investigator)) {
        setSelection([investigator]);
      }
    }
  };

  const selected = (code: string) => investigatorSelection.includes(code);
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
            <FormGroup>
              <div className={classes.root2}>
                {drawers.map((invClass, index) => (
                  <Accordion
                    key={index}
                    expanded={expanded === invClass}
                    onChange={handleChange(invClass)}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls='panel1bh-content'
                      id={`${invClass}-header`}
                    >
                      <Typography className={classes.heading}>
                        {invClass}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List
                        component='nav'
                        aria-label='secondary mailbox folders'
                      >
                        {investigatorList
                          .filter((investigator) =>
                            (investigatorByFaction[
                              invClass
                            ] as string[]).includes(investigator.code)
                          )
                          .map((inv) => (
                            <ListItem
                              button
                              key={inv.code}
                              id={inv.code}
                              onClick={handleSelection}
                            >
                              <ListItemText primary={inv.name} />
                            </ListItem>
                          ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
            </FormGroup>
          </div>
        </Drawer>
      </Slide>
      <main className={classes.content}>
        {props.children(investigatorSelection)}
      </main>
    </div>
  );
};
