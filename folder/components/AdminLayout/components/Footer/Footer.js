import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Layout } from 'antd';
import s from './Footer.scss';
import config from '../../../../webConfig';
import { version } from '../../../../../package.json';

const { Footer: AntFooter } = Layout;

class Footer extends React.Component {
  render() {
    return (
      <AntFooter className={s.footer}>
        {config.name} ({version}) © {new Date().getFullYear()}. Made with
        <span className={s.heart}> ❤ </span>
        in
        <a href="https://levants.io/" target="_blank" rel="noopener noreferrer">
          Levant
        </a>
      </AntFooter>
    );
  }
}

export default withStyles(s)(Footer);
