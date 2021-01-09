import React from 'react';
import { Sidebar } from './Components/UI/Sidebar';
import { YearSlider } from './Components/UI/YearSlider';
import { SingleInvestigator } from './Components/SingleInvestigator';
import { InvestigatorComparison } from './Components/InvestigatorComparison';
import { TotalCount } from './Components/TotalCount';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Controls } from './Components/UI/Controls';
import { CHARTTYPE, NUMMODE } from './types';
import { CustomizedAccordions } from './Components/UI/Accordion';

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
  wrapper: {
    justifyContent: 'center'
  },
  appBar: {
    top: 'auto',
    bottom: 0
  }
}));

export const App = () => {
  const classes = useStyles();
  const [tab1, setTab1] = React.useState(0); // Current Tab
  const [tab2, setTab2] = React.useState(0); // Current Tab
  const [tab3, setTab3] = React.useState(0); // Current Tab
  const [year, setYear] = React.useState(2020);
  const [dataMode, setRelMode] = React.useState<boolean>(true);
  const [headerOpen, setHeaderOpen] = React.useState({ open: true, id: '0' });
  const [chartType, setChartType] = React.useState<CHARTTYPE>(CHARTTYPE.LINE);

  const setMode = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setRelMode(!dataMode);
  };
  const handleChange1 = (event: React.ChangeEvent, newTab: number) => {
    console.log(newTab);
    setTab1(newTab);
  };
  const handleChange2 = (event: React.ChangeEvent, newTab: number) => {
    console.log(newTab);
    setTab2(newTab);
  };
  const handleChange3 = (event: React.ChangeEvent, newTab: number) => {
    console.log(newTab);
    setTab3(newTab);
  };

  const handleSetYear = (event: any, year: number) => {
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
              <Tab label='Single Investigator' />
              <Tab label='Comparison' />
            </Tabs>
          </Paper>

          <TabPanel value={tab1} index={0}>
            <div className={classes.wrapper}>
              <Controls
                dataMode={dataMode}
                setRelMode={setMode}
                chartType={chartType}
                setChartType={setChartType}
              />
              <SingleInvestigator
                year={year}
                dataMode={dataMode}
                chartType={chartType}
                numMode={NUMMODE.DIST}
              />
              <YearSlider handleSetYear={handleSetYear} year={year} />
            </div>
          </TabPanel>
          <TabPanel value={tab1} index={1}>
            <div className={classes.wrapper}>
              <Sidebar>
                {(investigatorSelection: string[]) => (
                  <div>
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
                      numMode={NUMMODE.DIST}
                    />
                    <YearSlider year={year} handleSetYear={handleSetYear} />
                  </div>
                )}
              </Sidebar>
            </div>
          </TabPanel>
        </>
      )}

      {headerOpen.open && headerOpen.id === '1' && (
        <div>
          <Paper className={classes.root}>
            <Tabs
              value={tab2}
              onChange={handleChange2}
              indicatorColor='primary'
              textColor='primary'
              centered
            >
              <Tab label='Class Totals' />
              <Tab label='Class Sum' />
            </Tabs>
          </Paper>
          <TabPanel value={tab2} index={0}>
            <div className={classes.wrapper}>
              <Controls
                dataMode={dataMode}
                setRelMode={setMode}
                chartType={chartType}
                setChartType={setChartType}
              />
              <TotalCount
                year={year}
                dataMode={dataMode}
                chartType={chartType}
                numMode={NUMMODE.DIST}
              />
              <YearSlider handleSetYear={handleSetYear} year={year} />
            </div>
          </TabPanel>
          <TabPanel value={tab2} index={1}>
            <div className={classes.wrapper}>
              <Controls
                dataMode={dataMode}
                setRelMode={setMode}
                chartType={chartType}
                setChartType={setChartType}
              />
              <TotalCount
                year={year}
                dataMode={dataMode}
                chartType={chartType}
                numMode={NUMMODE.SUM}
              />
              <YearSlider handleSetYear={handleSetYear} year={year} />
            </div>
          </TabPanel>
        </div>
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
            <div className={classes.wrapper}>
              <Controls
                dataMode={dataMode}
                setRelMode={setMode}
                chartType={chartType}
                setChartType={setChartType}
              />
              <SingleInvestigator
                year={year}
                dataMode={dataMode}
                chartType={chartType}
                numMode={NUMMODE.SUM}
              />
              <YearSlider handleSetYear={handleSetYear} year={year} />
            </div>
          </TabPanel>
          <TabPanel value={tab3} index={1}>
            <div className={classes.wrapper}>
              <Sidebar>
                {(investigatorSelection: string[]) => (
                  <div>
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
                    />
                    <YearSlider handleSetYear={handleSetYear} year={year} />
                  </div>
                )}
              </Sidebar>
            </div>
          </TabPanel>
        </div>
      )}
    </div>
  );
};
