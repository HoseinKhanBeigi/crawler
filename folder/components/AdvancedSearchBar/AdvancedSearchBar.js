/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,no-restricted-syntax,guard-for-in,react/prop-types */
import React from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import momentJalaali from 'moment-jalaali';
import cs from 'classnames';
import s from './AdvancedSearchBar.scss';
import CPButton from '../CP/CPButton';
import CPSelect from '../CP/CPSelect';
import SaveSearchResultModal from '../SaveSearchResultModal';
import {
  deleteFilterPresetAction,
  getSearchListAction,
} from '../../store/search/search.actions';
import CPDateTimePicker from '../CP/CPDateTimePicker';
// import { getLeadsAction } from '../../store/leads/leads.actions';
import { anyModalOpen } from '../../store/opportunities/opportunities.actions';

/**
 * Advance-SearchBar
 */
class AdvancedSearchBar extends React.Component {
  constructor(props) {
    super(props);

    const initialState = {};
    props.data.forEach(v => {
      if (v.type === 'input' || v.mode === 'multiple') {
        initialState[v.name] = [];
      } else {
        initialState[v.name] = '';
      }
    });

    this.state = {
      open: false,
      loading: false,
      badge: false,
      data: { ...initialState },
      initialState: { ...initialState }, // To get and set the values for saved search
      final: { ...initialState },
      showSaveSearchModal: false,
    };
  }

  async componentDidMount() {
    await this.props.getSearchListAction(this.props.filterType);
  }

  // update state
  onChange = async (name, value) => {
    const { data } = this.state;
    await this.setState({
      data: {
        ...data,
        [name]: value,
      },
    });
  };

  // toggle close/open
  toggle = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  /**
   * handle badge
   * for dropDown field, there is a faValue
   * fro timestamp field, there is readable time with moment.
   * @returns {any[]}
   */
  handleBadge = () => {
    const stateData = this.state.final;
    const propsData = this.props.data;

    const array = [];
    // eslint-disable-next-line no-unused-vars
    for (const key in propsData) {
      array.push({
        value: stateData[propsData[key].name],
        title: propsData[key].title,
        name: propsData[key].name,
        type: propsData[key],
        faValue: propsData[key]?.data?.find(
          item => item.value === stateData[propsData[key].name],
        )?.text,
      });
    }

    return array.map(item => {
      if (item.value === '') {
        return null;
      }

      // if the field is timestamp
      const value =
        item.name === 'from' || item.name === 'to'
          ? momentJalaali(item.value).format('HH:mm jYYYY/jM/jD')
          : item.value;

      return (
        <div
          key={item.name}
          className={s.badge}
          onClick={() => {
            this.removeItem(item.name);
          }}
        >
          <Icon type="close-circle" />
          <span>{`${item.title}: ${item.faValue || value}`}</span>
        </div>
      );
    });
  };

  // remove item
  removeItem = async name => {
    await this.setState({
      data: {
        ...this.state.data, // used this trick that's why data is not updated when get data as object destructuring
        [name]: '',
      },
    });
    this.handleSubmit();
  };

  // return CPInput
  createInputs = item => {
    const { gridNumber } = this.props;
    return (
      <div className={`col-md-${gridNumber}`} key={item.name}>
        <small>{item.title}</small>
        <CPSelect
          onChange={v => this.onChange(item.name, v)}
          name={item.name}
          mode="tags"
        />
      </div>
    );
  };

  // return Date picker and time picker
  createDateTimePicker = item => {
    const { gridNumber } = this.props;
    const { data } = this.state;
    const value = this.state.data[item.name];
    const type = item.name; // to/from

    return (
      <div className={`col-md-${gridNumber}`} key={item.name}>
        <small>{item.title}</small>
        <CPDateTimePicker
          value={value}
          onChange={v => this.onChange(item.name, v)}
          minDate={
            type === 'to' && data.from !== ''
              ? new Date(data.from).getTime() + 24 * 60 * 60 * 1000
              : null
          }
          maxDate={type === 'from' && data.to !== '' ? data.to : null}
        />
      </div>
    );
  };

  // return DropDown
  createDropDown = item => {
    const { gridNumber } = this.props;
    return (
      <div className={`col-md-${gridNumber}`} key={item.name}>
        <small>{item.title}</small>
        <CPSelect
          value={this.state.data[item.name]}
          dataSource={item.data}
          onChange={value => {
            this.onChange(item.name, value);
          }}
          mode={item.mode}
          showSearch
        />
      </div>
    );
  };

  // render Fields
  handleFields = () => {
    const { data } = this.props;
    return data.map(item => {
      switch (item.type) {
        case 'input':
          return this.createInputs(item);
        case 'dropDown':
          return this.createDropDown(item);
        case 'fromDateTime':
          return this.createDateTimePicker(item);
        case 'toDateTime':
          return this.createDateTimePicker(item);
        default:
          return null;
      }
    });
  };

  // action call
  handleSubmit = async e => {
    const { data } = this.state;
    if (e) {
      e.preventDefault();
    }

    const result = Object.keys(data)
      .filter(item => data[item].length !== 0)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      .join('&');
    this.props.onSearch(result);
  };

  // hide visibility of save search form
  handleCancel = () => {
    this.setState({
      showSaveSearchModal: false,
    });
  };

  // show visibility of save search form
  saveSearchModalVisibility = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      showSaveSearchModal: true,
    });
  };

  selectSearch = async e => {
    const { searchListData } = this.props;
    const findObj = searchListData?.find(item => item.id === e);
    const parseSearchObj = JSON.parse(findObj?.searchObject);
    await this.setState({
      selectedSearch: e,
      data: { ...this.state.initialState, ...parseSearchObj },
    });
  };

  deleteFilterPreset = id => async e => {
    e.stopPropagation();
    await this.props.deleteFilterPresetAction(id);
    this.props.getSearchListAction(this.props.filterType);
  };

  // Render saved search list
  renderSearchListData = () => {
    const { searchListData, isDeleting } = this.props;
    return searchListData?.map(item => ({
      key: item.id,
      value: item.id,
      text: (
        <span className="select-option-with-delete-icon">
          <Icon
            type={isDeleting ? 'loading' : 'close'}
            onClick={this.deleteFilterPreset(item.id)}
          />
          {item.title}
        </span>
      ),
    }));
  };

  render() {
    const { className, saveSearch, filterType, gridNumber } = this.props;
    const {
      open,
      loading,
      badge,
      showSaveSearchModal,
      data,
      selectedSearch,
    } = this.state;
    return (
      <form
        onSubmit={this.handleSubmit}
        className={cs(s.searchBar, className, open && s.open)}
      >
        <span className={s.header}>
          <div className={s.text} onClick={this.toggle}>
            <Icon type="search" />
            <span>جستجوی پیشرفته</span>
          </div>
          <div className={s.details}>{badge && this.handleBadge()}</div>
        </span>
        <div className={cs('row', s.searchBox)}>
          {this.handleFields()}
          <div className={`col-md-${gridNumber} flex-end`}>
            {saveSearch && (
              <React.Fragment>
                <div className={s.searchList}>
                  <small>جستجوهای ذخیره شده</small>
                  <CPSelect
                    dataSource={this.renderSearchListData()}
                    onChange={e => {
                      this.selectSearch(e);
                    }}
                    defaultValue={selectedSearch}
                  />
                </div>
                <CPButton
                  disabled
                  type="primary"
                  shape="circle"
                  icon="edit"
                  className={cs(
                    'btn primary-btn margin-l-10 margin-r-10',
                    s.submit,
                  )}
                  // onClick={this.saveSearchModalVisibility}
                />
                {this.props.showSaveSearch && (
                  <CPButton
                    type="primary"
                    shape="circle"
                    icon="save"
                    className={cs('btn primary-btn margin-l-10', s.submit)}
                    onClick={this.saveSearchModalVisibility}
                  />
                )}
              </React.Fragment>
            )}
            <CPButton
              type="primary"
              shape="circle"
              icon="search"
              className={cs('btn primary-btn', s.submit)}
              onClick={this.handleSubmit}
              loading={loading}
              htmlType="submit"
            />
          </div>
          {this.state.showSaveSearchModal && (
            <SaveSearchResultModal
              visible={showSaveSearchModal}
              handleCancel={this.handleCancel}
              searchQuery={data}
              filterType={filterType}
            />
          )}
        </div>
      </form>
    );
  }
}

AdvancedSearchBar.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  saveSearch: PropTypes.bool, // if search bar has save feature or not
  filterType: PropTypes.string, // pass source of entity to save search form
  searchListData: PropTypes.arrayOf(PropTypes.object), // pass source of entity to save search form
  getSearchListAction: PropTypes.func.isRequired,
  deleteFilterPresetAction: PropTypes.func.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  gridNumber: PropTypes.number, // change grid number
  showSaveSearch: PropTypes.bool,
  onSearch: PropTypes.func,
  // getLeadsAction: PropTypes.func.isRequired,
};

AdvancedSearchBar.defaultProps = {
  className: null,
  saveSearch: true,
  filterType: 'PERSON',
  searchListData: null,
  gridNumber: 3,
  showSaveSearch: true,
  onSearch: () => {},
};

const mapState = state => ({
  searchListData: state.search.getSearchListData,
  isDeleting: state.search.isDeleting,
});

const mapDispatch = {
  getSearchListAction,
  // getLeadsAction,
  anyModalOpen,
  deleteFilterPresetAction,
};

export default connect(mapState, mapDispatch)(withStyles(s)(AdvancedSearchBar));
export const SearchBarTest = AdvancedSearchBar;
