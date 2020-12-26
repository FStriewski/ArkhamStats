import React from 'react';
import {Sidebar} from './Components/UI/Sidebar';
import { YearSlider } from "./Components/UI/YearSlider";
import { SingleInvestigator } from './Components/SingleInvestigator';
import { InvestigatorComparison } from './Components/InvestigatorComparison';
import { TotalCount } from './Components/TotalCount';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import CssBaseline from "@material-ui/core/CssBaseline";
import { ModeSwitch } from './Components/UI/ModeSwitch';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  wrapper: {
    justifyContent: 'center'
  },
  appBar: {
    top: "auto",
    bottom: 0,
  },
}));

export const App = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0); // Current Tab
  const [year, setYear] = React.useState(2020);
  const [mode, setRelMode] = React.useState<boolean>(true);

  const setMode = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setRelMode(!mode);
  };
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

   const handleSetYear = (event: any, newValue: number | number[]) => {
     setYear(newValue as number);
   };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Scope" />
          <Tab label="Comparison" />
          <Tab label="Totals" />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        <div className={classes.wrapper}>
          <ModeSwitch mode={mode} setRelMode={setMode}/>
          <SingleInvestigator year={year} mode={mode} />
          <YearSlider handleSetYear={handleSetYear} year={year} />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className={classes.wrapper}>
          <Sidebar>
            {(investigatorSelection: string[]) =>
            <>
            <ModeSwitch mode={mode} setRelMode={setMode}/>
            <InvestigatorComparison
            year={year}
            investigatorCodes={investigatorSelection}
            mode={mode}
            />
          <YearSlider year={year} handleSetYear={handleSetYear} />
          </>}
          </Sidebar>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className={classes.wrapper}>
          <ModeSwitch mode={mode} setRelMode={setMode}/>
          <TotalCount year={year} mode={mode}/>
          <YearSlider handleSetYear={handleSetYear} year={year} />
        </div>
      </TabPanel>
    </div>
  );
}