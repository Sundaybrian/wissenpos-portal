import { CircularProgress, Grid } from '@material-ui/core';
import Content from '../Layout/Content/Content';

function Loader() {
  return (
    <Content>
      <Grid container justify="center">
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    </Content>
  );
}

export default Loader;
