import React, {
  ReactElement, useEffect, useContext, useState,
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
import {
  AudioServiceContext,
  CurrentMusicDetailsContext,
  MusicStorageContext,
} from '../../providers';
import { MusicDataInterface } from '../../interfaces';

export function MusicPlayerPage(): ReactElement {
  const styles = useStyles();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const audioService = useContext(AudioServiceContext);
  const db = useContext(MusicStorageContext);
  const currentMusicDetails = useContext(CurrentMusicDetailsContext)?.[0];
  const [musicData, setMusicData] = useState<MusicDataInterface | null>(null);

  useEffect(() => {
    if (currentMusicDetails && currentMusicDetails.id === id) {
      setMusicData(currentMusicDetails);
      return;
    }

    if (id) {
      db.getMusicUsingId(id)
        .then((music) => {
          if (music) {
            setMusicData(music);
            audioService.load(music.musicDataURL).then(() => {
              audioService.play();
            });
          } else {
            history.goBack();
          }
        })
        .catch(() => {
          history.goBack();
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
                musicTitle={musicData?.title ?? ''}
                artistName={(musicData?.artists ?? [])[0]}
                imgURL={musicData?.imgURL}
              />
            </Grid>
            <Grid container justify="center" alignItems="center" item xs={12}>
              <MusicName
                title={musicData?.title ?? ''}
                artists={musicData?.artists ?? []}
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
