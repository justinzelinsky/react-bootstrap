import { Grid, Paper } from '@material-ui/core';
import React from 'react';

import './App.scss';

const App = () => {
  return (
    <div styleName="root">
      <Grid container={true} spacing={8}>
        <Grid item={true} xs={12} sm={4} md={2}>
          <Paper styleName="paper">
            Hello World
          </Paper>
        </Grid>
        <Grid item={true} xs={12} sm={8} md={10}>
          <Paper styleName="paper">
            Foo Bar Baz
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
