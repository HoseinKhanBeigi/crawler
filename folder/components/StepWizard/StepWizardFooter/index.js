import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './index.scss';
import history from '../../../history';

const StepWizard = props => {
  const { nextTitle, backTitle, onClickNext, onClickBack, ...other } = props;
  return (
    <div className={s.btnConatiner}>
      {backTitle && (
        <Button
          size="small"
          onClick={onClickBack || history.goBack}
          className={s.btn}
        >
          {backTitle}
        </Button>
      )}
      <Button
        size="small"
        onClick={onClickNext}
        className={s.btn}
        type="primary"
        {...other}
      >
        {nextTitle}
      </Button>
    </div>
  );
};
StepWizard.propTypes = {
  nextTitle: PropTypes.string,
  backTitle: PropTypes.string,
  onClickNext: PropTypes.func.isRequired,
  onClickBack: PropTypes.func.isRequired,
};
StepWizard.defaultProps = {
  nextTitle: 'ثبت و گام بعدی',
  backTitle: '',
};
export default withStyles(s)(StepWizard);
