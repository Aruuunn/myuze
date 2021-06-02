import React, {
  ReactElement, useEffect, useState,
} from 'react';
import { State } from 'xstate';
import { motion } from 'framer-motion';
import { useParams, useHistory } from 'react-router-dom';
import { ExpandMoreOutlined as ExpandLessIcon } from '@material-ui/icons';
import {
  Container, Fade, Grid, IconButton, useMediaQuery, useTheme,
} from '@material-ui/core';

import {
  useMusicPlayerMachine,
  MusicPlayerMachineEvents,
  MusicPlayerMachineStates, MusicPlayerMachineContext,
} from '@open-music-player/core';
import {
  MusicSlider,
  MusicControls,
  AlbumCover,
  MusicName,
} from '../../components';
import { useStyles } from './styles';

export function MusicPlayerPage(): ReactElement {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [current, send, service] = useMusicPlayerMachine();
  const { currentPlayingMusic } = current.context;
  const styles = useStyles({ imgURL: currentPlayingMusic?.imgURL });
  const [animationComplete, setAnimationComplete] = useState(false);

  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const smallScreenHeight = useMediaQuery('(max-height: 625px)');

  useEffect(() => {
    if (id
        && (current.value === MusicPlayerMachineStates.NOT_LOADED
        || currentPlayingMusic?.id !== id)
    ) {
      send({
        type: MusicPlayerMachineEvents.LOAD,
        id,
      });
    }

    const onUnload = (state: State<MusicPlayerMachineContext>) => {
      if (state.value === MusicPlayerMachineStates.NOT_LOADED) {
        history.push('/');
      }
    };

    service.onTransition(onUnload);

    return () => {
      service.off(onUnload);
    };

    // eslint-disable-next-line
  }, [id]);

  return (
    <motion.div
      initial={{
        y: '100vh',
        opacity: 0,
      }}
      transition={{
        duration: 0.3,
      }}
      style={{ overflow: 'hidden' }}
      animate={{ y: 0, opacity: 1 }}
      onAnimationComplete={() => {
        setTimeout(() => {
          setAnimationComplete(true);
        }, 100);
      }}
    >
      {animationComplete && <Fade in timeout={3000}><div className={styles.blurBg} /></Fade>}
      <Container maxWidth="lg" style={{ ...(xs ? { margin: 0, padding: 0 } : {}), position: 'relative' }}>
        <Grid
          id="music-player-container"
          container
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
                top: xs ? '10px' : '50px',
                left: xs ? '10px' : 0,
              }}
              onClick={() => {
                history.push('/');
              }}
            >
              <ExpandLessIcon fontSize="large" />
            </IconButton>
            <Grid
              item
              container
              justify="center"
              alignItems="center"
              xs={12}
              style={{ marginBottom: smallScreenHeight ? '20px' : '40px' }}
            >

              <Grid
                container
                justify="center"
                alignItems="center"
                style={{ marginBottom: smallScreenHeight ? '20px' : '60px' }}
                item
                xs={12}
              >

                <AlbumCover
                  musicTitle={currentPlayingMusic?.title ?? ''}
                  artistName={(currentPlayingMusic?.artists ?? [])[0]}
                  imgURL={currentPlayingMusic?.imgURL}
                />
              </Grid>
              <Grid container justify="center" alignItems="center" style={{ maxWidth: '90%' }} item xs={12}>
                <MusicName
                  title={currentPlayingMusic?.title}
                  artists={currentPlayingMusic?.artists}
                  size="large"
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
    </motion.div>
  );
}
