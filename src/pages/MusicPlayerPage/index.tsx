import React, {
  ReactElement, useEffect,
} from 'react';
import { Container, Grid, IconButton } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import { ExpandMoreOutlined } from '@material-ui/icons';

import {
  MusicSlider,
  MusicControls,
  AlbumCover,
  MusicName,
} from '../../components';
import { useStyles } from './styles';

import { useMusicPlayerMachine } from '../../hooks';
import { MusicPlayerMachineEvents, MusicPlayerMachineStates } from '../../machines';

/**
 * @TODO handle the edge case when the id is invalid.
 * */
export function MusicPlayerPage(): ReactElement {
  const styles = useStyles();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [current, send] = useMusicPlayerMachine();
  const {
    currentPlayingMusic,
  } = current.context;

  useEffect(() => {
    console.log(current.value);
    if (id && current.value === MusicPlayerMachineStates.NOT_LOADED) {
      send({
        type: MusicPlayerMachineEvents.LOAD,
        id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Container maxWidth="lg">
      <Grid
        id="music-player-container"
        container
        style={{ position: 'relative' }}
        className={styles.container}
      >
        <Grid
          id="music-player"
          justify="center"
          alignItems="center"
          item
          container
          xs={8}
        >
          <IconButton
            size="medium"
            style={{
              color: 'rgb(var(--primary-dark))',
              position: 'absolute',
              top: '50px',
              left: 0,
            }}
            onClick={() => {
              history.push('/');
            }}
          >
            <ExpandMoreOutlined fontSize="large" />
          </IconButton>
          <Grid
            item
            container
            justify="center"
            alignItems="center"
            xs={12}
            style={{ marginBottom: '40px' }}
          >
            <Grid
              container
              justify="center"
              alignItems="center"
              style={{ marginBottom: '60px' }}
              item
              xs={12}
            >
              <AlbumCover
                musicTitle={currentPlayingMusic?.title ?? ''}
                artistName={(currentPlayingMusic?.artists ?? [])[0]}
                imgURL={currentPlayingMusic?.imgURL}
              />
            </Grid>
            <Grid container justify="center" alignItems="center" item xs={12}>
              <MusicName
                title={currentPlayingMusic?.title ?? ''}
                artists={currentPlayingMusic?.artists ?? []}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <MusicSlider size="large" />
          </Grid>
          <Grid item xs={12}>
            <MusicControls size="large" />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default MusicPlayerPage;
