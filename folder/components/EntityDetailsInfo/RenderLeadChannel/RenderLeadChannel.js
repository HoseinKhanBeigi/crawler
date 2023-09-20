import React, { Component } from 'react';
import withStyle from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './RenderLeadChannel.scss';

class RenderLeadChannel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leadChannel: null,
    };
  }

  componentDidMount() {
    const { leadChannelGeneration } = this.props;
    const leadChannelName = this.props.leadChannelTranslator(
      leadChannelGeneration,
    );
    this.setChannelLeadName(leadChannelName);
  }

  setChannelLeadName = channelLeadItem => {
    this.setState({ leadChannel: channelLeadItem[0] });
  };

  render() {
    return (
      <>
        <span className={s.leadChannel}>
          <b>نام کانال ورودی : </b>
          <p>
            {this.state.leadChannel
              ? this.state.leadChannel.text
              : 'کانال ورودی ندارد'}
          </p>
        </span>
      </>
    );
  }
}

RenderLeadChannel.defaultProps = {
  leadChannelGeneration: null,
};
RenderLeadChannel.propTypes = {
  leadChannelGeneration: PropTypes.string,
  leadChannelTranslator: PropTypes.func.isRequired,
};
export default withStyle(s)(RenderLeadChannel);
