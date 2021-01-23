import React from 'react';
import { ClassPicker } from './Components/UI/ClassPicker';
import { InvestigatorPicker } from './Components/UI/InvestigatorPicker';
import { YearSlider } from './Components/UI/YearSlider';
import { InvestigatorComparison } from './Components/Views/InvestigatorComparison';
import { InvestigatorPortrait } from './Components/Views/InvestigatorPortrait';
import { InvestigatorClasses } from './Components/Views/InvestigatorClasses';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Controls } from './Components/UI/Controls';
import { CHARTTYPE, NUMMODE, PICKERSELECTION } from './types';
import { CustomizedAccordions } from './Components/UI/Accordion';
import { Typography } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { investigatorList } from './lookups/lists';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1
  },
  chartBundle: {
    width: '800px',
    justify: 'right'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  control: {
    marginLeft: 'auto'
  }
}));

export const App = (): React.ReactElement => {
  const classes = useStyles();
  const [tab1, setTab1] = React.useState(0); // Current Tab
  const [tab2, setTab2] = React.useState(1); // Current Tab
  const [tab3, setTab3] = React.useState(0); // Current Tab
  const [year, setYear] = React.useState(2020);
  const [dataMode, setRelMode] = React.useState<boolean>(true);
  const [headerOpen, setHeaderOpen] = React.useState({ open: true, id: '0' });
  const [chartType, setChartType] = React.useState<CHARTTYPE>(CHARTTYPE.LINE);

  const setMode = () => setRelMode(!dataMode);

  const handleChange1 = (event: React.ChangeEvent, newTab: number) => {
    setTab1(newTab);
  };
  const handleChange2 = (event: React.ChangeEvent, newTab: number) => {
    setTab2(newTab);
  };
  const handleChange3 = (event: React.ChangeEvent, newTab: number) => {
    setTab3(newTab);
  };

  const [investigatorCode, setInvestigatorCode] = React.useState('01004');

  const handleDropdown = (event: React.ChangeEvent<{ value: unknown }>) => {
    setInvestigatorCode(event.target.value as string);
  };

  const handleSetYear = (event: React.ChangeEvent, year: number) => {
    setYear(year);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <CustomizedAccordions
        setHeaderOpen={setHeaderOpen}
        headerOpen={headerOpen}
      />
      {headerOpen.open && headerOpen.id === '0' && (
        <>
          <Paper className={classes.root}>
            <Tabs
              value={tab1}
              onChange={handleChange1}
              indicatorColor='primary'
              textColor='primary'
              centered
            >
              <Tab label='Investigator Portrait' />
              <Tab label='Investigator Comparison' />
            </Tabs>
          </Paper>

          <TabPanel value={tab1} index={0}>
            <InvestigatorPicker pickerType={PICKERSELECTION.SINGLE}>
              {(investigatorSelection: string[]) => (
                <InvestigatorPortrait
                  dataMode={dataMode}
                  chartType={chartType}
                  year={year}
                  investigatorCode={investigatorSelection[0]}
                />
              )}
            </InvestigatorPicker>
          </TabPanel>
          <TabPanel value={tab1} index={1}>
            <InvestigatorPicker pickerType={PICKERSELECTION.MULTI}>
              {(
                investigatorSelection: string[],
                deleteFromSelection: () => void
              ) => (
                <InvestigatorComparison
                  year={year}
                  investigatorCodes={investigatorSelection}
                  dataMode={dataMode}
                  chartType={chartType}
                  numMode={NUMMODE.DIST}
                  deleteFromSelection={deleteFromSelection}
                />
              )}
            </InvestigatorPicker>
          </TabPanel>
        </>
      )}

      {headerOpen.open && headerOpen.id === '1' && (
        <>
          <Paper className={classes.root}>
            <Tabs
              value={tab2}
              onChange={handleChange2}
              indicatorColor='primary'
              textColor='primary'
              centered
            >
              <Tab label='Investigator Portrait' />
              <Tab label='Investigator Comparison' />
            </Tabs>
          </Paper>

          <TabPanel value={tab2} index={0}>
            <ClassPicker>
              {(iclassSelection: string[], deleteFromSelection: () => void) => (
                <InvestigatorClasses
                  dataMode={dataMode}
                  chartType={chartType}
                  year={year}
                  iclassSelection={iclassSelection}
                  numMode={NUMMODE.DIST}
                  deleteFromSelection={deleteFromSelection}
                />
              )}
            </ClassPicker>
          </TabPanel>
        </>
      )}

      {headerOpen.open && headerOpen.id === '2' && (
        <div>
          <Paper className={classes.root}>
            <Tabs
              value={tab3}
              onChange={handleChange3}
              indicatorColor='primary'
              textColor='primary'
              centered
            >
              <Tab label='Sums' />
              <Tab label='Sums Multiple' />
            </Tabs>
          </Paper>
          <TabPanel value={tab3} index={0}>
            <div>
              <Typography>BLABLA</Typography>
              <FormControl className={classes.formControl}>
                <InputLabel id='demo-simple-select-label'>
                  Investigator
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={investigatorCode}
                  onChange={handleDropdown}
                >
                  {investigatorList.map((inv) => (
                    <MenuItem key={inv.code} value={inv.code}>
                      {inv.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div className={classes.chartBundle}>
                <Controls
                  dataMode={dataMode}
                  setRelMode={setMode}
                  chartType={chartType}
                  setChartType={setChartType}
                />
              </div>
              <YearSlider handleSetYear={handleSetYear} year={year} />
            </div>
          </TabPanel>
          <TabPanel value={tab3} index={1}>
            {(investigatorSelection: string[], deleteFromSelection) => (
              <div className={classes.chartBundle}>
                <Controls
                  dataMode={dataMode}
                  setRelMode={setMode}
                  chartType={chartType}
                  setChartType={setChartType}
                />
                <InvestigatorComparison
                  year={year}
                  investigatorCodes={investigatorSelection}
                  dataMode={dataMode}
                  chartType={chartType}
                  numMode={NUMMODE.SUM}
                  deleteFromSelection={deleteFromSelection}
                />
                <YearSlider handleSetYear={handleSetYear} year={year} />
              </div>
            )}
          </TabPanel>
        </div>
      )}
      <YearSlider handleSetYear={handleSetYear} year={year} />
      <Controls
        dataMode={dataMode}
        setRelMode={setMode}
        chartType={chartType}
        setChartType={setChartType}
      />
    </div>
  );
};
