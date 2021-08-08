import { useEffect } from 'react';
import useStorage from '../../../../../Hooks/useStorage';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export default function LinearDeterminate(props) {
  const classes = useStyles();

  const { file, setFile, setAddMeal, setImageUrl } = props;
  const { url, progress } = useStorage(file);

  useEffect(() => {
    if (url) {
      setFile(null);
      setImageUrl(url);
      setAddMeal(prevState => ({
        ...prevState,
        image_url: url,
      }));
    }
  }, [url, setFile]);

  return (
    <div className={classes.root}>
      <LinearProgress variant="determinate" value={progress} />
    </div>
  );
}
