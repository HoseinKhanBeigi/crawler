import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './StageGuid.scss';
import CPButton from '../../../../components/CP/CPButton/CPButton';

const StageGuid = props => {
  const { title, desc, visiblity, onChangeVisibilty } = props;
  const [visible, setVisible] = useState(true);

  const changeVisibile = () => {
    onChangeVisibilty();
    setVisible(!visible);
  };

  useEffect(() => {
    setVisible(visiblity);
  }, [visiblity]);

  return (
    <>
      {visiblity && visible && (
        <div className={s.mask}>
          <div className={s.guid}>
            <div className={s.guid__container}>
              <div className={s.guid__guid_pic} />
              <div className={s.guid__description}>
                <h3>{title}</h3>
                <p>{desc}</p>
                <CPButton className={s.btn} onClick={changeVisibile}>
                  متوجه شدم
                </CPButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
StageGuid.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  visiblity: PropTypes.bool,
  onChangeVisibilty: PropTypes.func,
};
StageGuid.defaultProps = {
  title: '',
  desc: '',
  visiblity: false,
  onChangeVisibilty: () => {},
};
export default withStyles(s)(StageGuid);
