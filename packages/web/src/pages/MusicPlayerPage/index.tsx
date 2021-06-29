import React, { ReactElement, useEffect, useState } from 'react';
import { rgb } from 'color';
import { State } from 'xstate';
import ColorThief from 'colorthief';
import { motion } from 'framer-motion';
import { useParams, useHistory } from 'react-router-dom';
import { ExpandMoreOutlined as ExpandLessIcon } from '@material-ui/icons';
import {
  Container,
  Fade,
  Grid,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';

import {
  useMusicPlayerMachine,
  MusicPlayerMachineEvents,
  MusicPlayerMachineStates,
  MusicPlayerMachineContext,
  DefaultPalette,
  Palette,
} from '@open-music-player/core';
import {
  MusicSlider,
  MusicControls,
  AlbumCover,
  MusicName,
} from '../../components';
import { useStyles } from './styles';
import { injectPaletteIntoCSSVariables } from 'inject-palette';

const colorthief = new ColorThief();

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
    return () => {
      injectPaletteIntoCSSVariables(DefaultPalette);
    };
  }, []);

  useEffect(() => {
    if (currentPlayingMusic?.imgURL) {
      const img = document.createElement('img');
      img.src = currentPlayingMusic.imgURL;
      img.onload = async () => {
        let color = rgb(colorthief.getColor(img));

        if (color.isDark()) {
          color = color.lighten(1);
        }

        const newPalette: Palette = {
          ...DefaultPalette,
          PRIMARY: rgb(DefaultPalette.PRIMARY).mix(color).rgb().array() as [
            number,
            number,
            number,
          ],
          PRIMARY_DARK: rgb(DefaultPalette.PRIMARY_DARK)
            .mix(color)
            .rgb()
            .array() as [number, number, number],
          PRIMARY_BRIGHT: rgb(DefaultPalette.PRIMARY_BRIGHT)
            .mix(color)
            .rgb()
            .array() as [number, number, number],
          BG_COLOR: rgb(DefaultPalette.BG_COLOR).mix(color).rgb().array() as [
            number,
            number,
            number,
          ],
        };

        injectPaletteIntoCSSVariables(newPalette);
      };
    } else {
      injectPaletteIntoCSSVariables(DefaultPalette);
    }
  }, [currentPlayingMusic]);

  useEffect(() => {
    if (
      id &&
      (current.value === MusicPlayerMachineStates.NOT_LOADED ||
        currentPlayingMusic?.id !== id)
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
      if (state.context.currentPlayingMusic?.id) {
        window.history.replaceState(
          null,
          document.title,
          `/play/${state.context.currentPlayingMusic.id}`,
        );
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
      }}>
      {animationComplete && currentPlayingMusic?.imgURL && (
        <Fade in timeout={3000}>
          <>
            <div className={styles.blurBg} />
            <div className={styles.blurBg2} />
          </>
        </Fade>
      )}
      <Container
        maxWidth="lg"
        style={{
          ...(xs ? { margin: 0, padding: 0 } : {}),
          position: 'relative',
        }}>
        <Grid
          id="music-player-container"
          container
          className={styles.container}>
          <Grid
            id="music-player"
            justify="center"
            alignItems="center"
            item
            container
            xs={8}>
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
              }}>
              <ExpandLessIcon fontSize="large" />
            </IconButton>
            <Grid
              item
              container
              justify="center"
              alignItems="center"
              xs={12}
              style={{ marginBottom: smallScreenHeight ? '20px' : '40px' }}>
              <Grid
                container
                justify="center"
                alignItems="center"
                style={{ marginBottom: smallScreenHeight ? '20px' : '60px' }}
                item
                xs={12}>
                <AlbumCover
                  musicTitle={currentPlayingMusic?.title ?? ''}
                  artistName={(currentPlayingMusic?.artists ?? [])[0]}
                  imgURL={currentPlayingMusic?.imgURL}
                />
              </Grid>
              <Grid
                container
                justify="center"
                alignItems="center"
                style={{ maxWidth: '90%' }}
                item
                xs={12}>
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
