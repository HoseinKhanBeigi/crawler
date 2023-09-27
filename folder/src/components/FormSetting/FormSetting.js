import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Icon, Tooltip } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import s from './FormSetting.scss';
import CPButton from '../CP/CPButton';
import ModalForAddColumn from '../ModalRoot/modals/ModalForAddColumn';
import { putFieldAction } from '../../store/formSetting/formSetting.actions';
import CPMessage from '../CP/CPMessage';
import { removeTableDataFromLocalStorage } from '../KianTable/helpers/persist';
import { LEADS_TABLE } from '../../store/settings/settings.constants';

class FormSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: props.data.filter(item => item.active === true),
      available: props.data.filter(item => item.active === false),
      visible: false,
    };
  }

  onCancel = () => {
    this.setState({
      visible: false,
    });
  };

  setAvailable = item => {
    const availableItems = this.state.available;
    const { current } = this.state;

    const currentItems = current.filter(element => element.id !== item.id);

    const finalItem = item;
    finalItem.active = false;

    availableItems.push(item);
    this.setState({
      available: availableItems,
      current: currentItems,
    });
  };

  setCurrent = item => {
    const currentItems = this.state.current;
    const { available } = this.state;

    const availableItems = available.filter(element => element.id !== item.id);

    const finalItem = item;
    finalItem.active = true;
    currentItems.push(item);
    this.setState({
      available: availableItems,
      current: currentItems,
    });
  };

  handleSubmit = async () => {
    const { current, available } = this.state;
    const body = current.concat(available);
    const result = await this.props.putFieldAction(body);
    const { error } = this.props;
    if (error) {
      CPMessage(result.message, 'error');
    } else {
      removeTableDataFromLocalStorage(LEADS_TABLE);
      CPMessage('عملیات با موفقیت انجام شد', 'success');
    }
  };

  openModal = () => {
    this.setState({
      visible: true,
    });
  };

  renderCurrent = () => {
    const { current } = this.state;
    return current.map(item => (
      <div className={s.item} key={item.id}>
        {item.columnCategory === 'OPTIONAL' && (
          <Icon
            onClick={() => {
              this.setAvailable(item);
            }}
            type="minus"
            className={s.removeCurrent}
          />
        )}
        {item.columnCategory === 'MAIN' ? (
          <Tooltip
            placement="left"
            title=".فیلد الزامیست و امکان حذف آن وجود ندارد"
          >
            <p className={s.main}>{item.name}</p>
          </Tooltip>
        ) : (
          <p>{item.name}</p>
        )}
      </div>
    ));
  };

  renderAvailable = () => {
    const { available } = this.state;
    return available.map(item => (
      <div className={s.item} key={item.id}>
        <Icon
          onClick={() => {
            this.setCurrent(item);
          }}
          type="plus"
          className={s.addAvailable}
        />
        <p>{item.name}</p>
      </div>
    ));
  };

  renderContent = () => (
    <React.Fragment>
      <p className={s.title}>ستون (فیلد) های منتخب</p>
      <div className={s.current}>{this.renderCurrent()}</div>
      <p className={s.title}>ستون (فیلد) های قابل افزودن</p>
      <div className={s.available}>{this.renderAvailable()}</div>
    </React.Fragment>
  );

  render() {
    const { visible } = this.state;
    const { loading, type } = this.props;
    return (
      <div className={s.root}>
        <CPButton
          type="submit"
          onClick={this.openModal}
          className={s.addColumn}
        >
          <Icon type="plus" />
        </CPButton>
        <p className={s.formName}>ایجاد سرنخ</p>
        <p className={s.title}>ستون (فیلد) های منتخب</p>
        <div className={s.current}>{this.renderCurrent()}</div>
        <p className={s.title}>ستون (فیلد) های قابل افزودن</p>
        <div className={s.available}>{this.renderAvailable()}</div>
        <CPButton
          className={s.submit}
          type="submit"
          onClick={this.handleSubmit}
          disabled={loading}
        >
          ثبت
        </CPButton>
        {visible && (
          <ModalForAddColumn
            type={type}
            visible={visible}
            onCancel={this.onCancel}
            onChange={column => {
              const { current, available } = this.state;
              if (column.active) {
                current.push(column);
                this.setState({ current });
              } else {
                available.push(column);
                this.setState({ available });
              }
            }}
          />
        )}
      </div>
    );
  }
}

// eslint-disable-next-line no-unused-vars
const mapStateToProps = state => ({
  error: state.formSetting.putFieldError,
  loading: state.formSetting.putFieldLoading,
});

const mapDispatch = {
  putFieldAction,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(FormSetting));

FormSetting.propTypes = {
  data: PropTypes.array,
  putFieldAction: PropTypes.func,
  error: PropTypes.bool,
  loading: PropTypes.bool,
  type: PropTypes.string.isRequired,
};

FormSetting.defaultProps = {
  data: [],
  error: false,
  loading: false,
  putFieldAction: () => {},
};
