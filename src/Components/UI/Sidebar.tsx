import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import {investigatorList} from '../../utils/investigatorList';
import { InvestigatorListItem } from '../../types';
import { InvestigatorComparison } from '../InvestigatorComparison';

const drawerWidth = 240;


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        marginTop: '50px'
    },
    drawerContainer: {
      overflow: 'auto',
    },
    fcLabel: {
      color: '#6C6A6A',
      fontSize: '10px'
    },
        formControl: {
      margin: theme.spacing(3),
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);


export const Sidebar = () => {
  const classes = useStyles();

    const [state, setState] = React.useState([]);

    const handleSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        const investigator = event.target.name
        if(!state.includes(investigator)){
            setState([...state, investigator])
        }
        else{
            const newstate = state.filter(item => item != investigator)
            setState(newstate)
        }
  };

  const checked = (name: string) => state.includes(name)

  const error = state.length > 3;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerContainer}>
          {/* <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List> */}
            
            <FormControl required error={error} component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Pick two</FormLabel>
                <FormGroup>
                    {
                        investigatorList.map( (inv: InvestigatorListItem) => 
                        
                        <FormControlLabel
                        control={
                        <Checkbox checked={checked(inv.name)} onChange={handleSelection} name={inv.code} />
                        }
                        label={inv.name}
                        className={classes.fcLabel}
                        />

                        )}
                </FormGroup>
                <FormHelperText>You can display an error</FormHelperText>
            </FormControl>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <InvestigatorComparison investigatorCodes={state}/>
      </main>
    </div>
  );
}