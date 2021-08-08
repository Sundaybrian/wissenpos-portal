import { useEffect } from 'react';
import useStorage from '../../Hooks/useStorage';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export default function LinearDeterminate(props) {
  const classes = useStyles();

  const { file, setFile, setImageUrl } = props;
  const { url, progress, setProgress } = useStorage(file);
  /* eslint-disable react-hooks/exhaustive-deps*/
  useEffect(() => {
    if (url) {
      setFile(null);
      setProgress(false);
      setImageUrl(url);
    }
  }, [url, setFile]);

  return <div className={classes.root}>{progress && <LinearProgress color="primary" />}</div>;
}
