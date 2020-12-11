import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import {ArkLineChart}  from './Components/Charts/LineChart';
import {getInvestigatorByDate, getInvestigatorComparisonByDate} from './utils/requests';
import {HeatHistogram, APIResponse, LineHistogram} from './types';
import {heatmapParser } from './utils/parser';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {investigatorList} from './utils/investigatorList';
import {Header} from './Components/UI/Header';
import {Tabbar} from './Components/UI/Tabbar';
import { SingleInvestigator } from './Components/SingleInvestigator';
import { InvestigatorComparison } from './Components/InvestigatorComparison';

//{"datapoints":{"2016":[{"date":"2016-01","value":0},{"date":"2020-12","value":0}]},"meta":{"investigator":"1004","total":896}}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const App = () =>  {
  const classes = useStyles();

  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/SingleInvestigator">SingleInvestigator</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/SingleInvestigator">
            <SingleInvestigator />
          </Route>
          <Route path="/topics">
            <InvestigatorComparison />
          </Route>
          <Route path="/">
            <div />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
