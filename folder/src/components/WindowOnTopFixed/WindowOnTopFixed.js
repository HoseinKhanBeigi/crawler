import React, { useState } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import { Collapse, Icon, Descriptions } from 'antd';
import schema from './FormSchema';
import s from './WindowOnTopFixed.scss';
import FormBuilder from '../FormBuilder';
import CPTooltip from '../CP/CPTooltip';
import { setCallDetailWindowDataAction } from '../../store/onComingCall/onComingCall.actions';

const WindowOnTopFixed = props => {
  // eslint-disable-next-line no-unused-vars
  const { callDetailWindow } = props;
  // eslint-disable-next-line no-unused-vars
  const [submitFormLoading, setSubmitFormLoading] = useState(false);
  const [minimize, setMinimize] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [close, setClose] = useState(true);
  const { Item } = Descriptions;
  const { Panel } = Collapse;

  const handleTypeOfCall = () => {
    // handling
  };

  const handleMinimize = event => {
    // If you don't want click extra trigger collapse, you can prevent this:
    event.stopPropagation();
    setMinimize(false);
  };

  const handleClose = event => {
    event.stopPropagation();
    setClose(true);
    props.setCallDetailWindowDataAction(null, false);
  };

  const genExtra = () => (
    <div className={s.extraIcons}>
      <CPTooltip title="بستن">
        <Icon
          className={s.extraIconsItem}
          type="close"
          onClick={event => {
            handleClose(event);
          }}
        />
      </CPTooltip>
      <CPTooltip title="کوچکنمایی">
        <Icon
          type="minus"
          onClick={event => {
            handleMinimize(event);
          }}
        />
      </CPTooltip>
    </div>
  );

  return (
    <>
      <div className={s.container}>
        <Collapse defaultActiveKey={['1']} accordion={minimize}>
          <Panel
            header="اضافه کردن تماس"
            showArrow={false}
            key="1"
            extra={genExtra()}
          >
            <Descriptions column={1}>
              <Item label="شماره تلفن">09122903900</Item>
              <Item label="کد ملی">4660085619</Item>
              <Item label="نام">بهرود روزدار</Item>
            </Descriptions>
            <FormBuilder
              schema={schema(handleTypeOfCall)}
              layout="vertical"
              submitLabel="ثبت اطلاعات"
              loading={submitFormLoading}
            />
          </Panel>
        </Collapse>
      </div>
    </>
  );
};

WindowOnTopFixed.defaultProps = {
  callDetailWindow: null,
};
WindowOnTopFixed.propTypes = {
  callDetailWindow: PropTypes.object,
  setCallDetailWindowDataAction: PropTypes.func.isRequired,
};

/* const mapState = state => ({
  callDetailWindow: state.onComingCall.callDetailWindow,
}); */
const mapDispatch = {
  setCallDetailWindowDataAction,
};

export default connect(null, mapDispatch)(withStyles(s)(WindowOnTopFixed));
