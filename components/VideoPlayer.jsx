/* eslint-disable eol-last */
/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import images from '../assets';
import styles from './VideoPlayer.module.css';

const VideoPlayer = () => (
  <div className={styles.container}>
    <video controls className={styles.video}>
      <source src="video/intro.mp4" type="video/mp4" />
      <track label="English" kind="subtitles" srcLang="en" src={images.intro} default />
      Your browser does not support the video tag.
    </video>
  </div>
);

export default VideoPlayer;