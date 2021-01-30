import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import FormGroup from '@material-ui/core/FormGroup';
import { investigatorList, investigatorByFaction } from '../../lookups/lists';
import { lookupInvestigator } from '../../lookups/helpers';
import { PICKERSELECTION } from '../../types';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { CustomCheckbox } from '../UI/Checkbox';
import { SidebarControls } from '../UI/SidebarControls';

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
  pickerType: PICKERSELECTION;
  children: React.FC<string[]>;
};

export const InvestigatorPicker = ({
  pickerType,
  children
}: Props): React.ReactElement => {
  const classes = useStyles();

  const [investigatorSelection, setSelection] = React.useState<string[]>([
    '01004'
  ]);
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (
    event: React.ChangeEvent,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };
  const drawers = Object.keys(investigatorByFaction);

  const handleSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const investigator = event.target.id;

    if (pickerType === PICKERSELECTION.MULTI) {
      if (!investigatorSelection.includes(investigator)) {
        setSelection([...investigatorSelection, investigator]);
      } else {
        const newstate = investigatorSelection.filter(
          (item) => item !== investigator
        );
        setSelection(newstate);
      }
    }
    if (pickerType === PICKERSELECTION.SINGLE) {
      if (!investigatorSelection.includes(investigator)) {
        setSelection([investigator]);
      }
    }
  };

  const deleteFromSelection = (event) => {
    console.log(event.currentTarget.id);
    console.log(investigatorSelection);
    const newstate = investigatorSelection.filter(
      (item) => item !== event.currentTarget.id
    );
    setSelection(newstate);
  };

  const checked = (code: string) => investigatorSelection.includes(code);
  const error = investigatorSelection.length >= 3;

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant='permanent'
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <SidebarControls
          selectCount={investigatorSelection.length}
          setSelection={setSelection}
          pickerType={pickerType}
        />
        <div className={classes.drawerContainer}>
          <FormGroup>
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
                  style={{
                    fontSize: '18px',
                    textTransform: 'capitalize',
                    marginLeft: '10px'
                  }}
                >
                  {invClass}
                </AccordionSummary>
                <AccordionDetails>
                  <List
                    component='nav'
                    aria-label='secondary mailbox folders'
                    style={{ marginTop: '-20px', marginBottom: '-10px' }}
                  >
                    {investigatorList.length &&
                      investigatorList
                        .filter((investigator) =>
                          (investigatorByFaction[
                            invClass
                          ] as string[]).includes(investigator.code)
                        )
                        .sort((a, b) =>
                          a.name < b.name ? -1 : a.name > b.name ? 1 : 0
                        )
                        .map((inv) => (
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
                            style={{
                              color: lookupInvestigator(inv.code).color
                            }}
                            className={classes.fcLabel}
                          />
                        ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
          </FormGroup>
        </div>
      </Drawer>
      <main className={classes.content}>
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,  @typescript-eslint/no-unsafe-call */}
        {children(investigatorSelection, deleteFromSelection)}
      </main>
    </div>
  );
};
