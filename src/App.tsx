import React from 'react';
import { ClassPicker } from './Components/UI/ClassPicker';
import { InvestigatorPicker } from './Components/UI/InvestigatorPicker';
import { Header } from './Components/UI/Header';
import { InvestigatorComparison } from './Components/Views/InvestigatorComparison';
import { InvestigatorPortrait } from './Components/Views/InvestigatorPortrait';
import { ClassComparison } from './Components/Views/ClassComparison';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Divider, Tabs, Box, Paper, CssBaseline, Tab } from '@material-ui/core';
import { CHARTTYPE, NUMMODE, PICKERSELECTION } from './types';
import { Controls } from './Components/UI/Controls';
import { YearSlider } from './Components/UI/YearSlider';

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
  const [tab1, setTab1] = React.useState(3); // Current Tab
  const [year, setYear] = React.useState(2020);
  const [dataMode, setRelMode] = React.useState<boolean>(true);
  const [chartType, setChartType] = React.useState<CHARTTYPE>(CHARTTYPE.LINE);

  const handleChange1 = (event: React.ChangeEvent, newTab: number) => {
    setTab1(newTab);
  };

  const handleSetYear = (event: React.ChangeEvent, year: number) => {
    setYear(year);
  };

  const setMode = () => setRelMode(!dataMode);

  return (
    <div className={classes.root}>
      <Header />

      <CssBaseline />
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
            <Divider orientation='vertical' flexItem />
            <Tab label='Class Comparison' />
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
        <TabPanel value={tab1} index={3}>
          <ClassPicker>
            {(iclassSelection: string[], deleteFromSelection: () => void) => (
              <ClassComparison
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
      <>
        <YearSlider handleSetYear={handleSetYear} year={year} />
        <Controls
          dataMode={dataMode}
          setRelMode={setMode}
          chartType={chartType}
          setChartType={setChartType}
        />
      </>
    </div>
  );
};
