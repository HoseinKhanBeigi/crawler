/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,no-restricted-syntax,guard-for-in */
import React from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import momentJalaali from 'moment-jalaali';
import cs from 'classnames';
import s from './SearchBar.scss';
import CPInput from '../CP/CPInput';
import CPButton from '../CP/CPButton';
import CPSwitch from '../CP/CPSwitch';
import CPSelect from '../CP/CPSelect';
import CPDateTimePicker from '../CP/CPDateTimePicker';
import SaveSearchResultModal from '../SaveSearchResultModal';
import { getSearchListAction } from '../../store/search/search.actions';
import { anyModalOpen } from '../../store/opportunities/opportunities.actions';

/**
 * Advance-SearchBar
 */
class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    const initialState = {};
    props.data.forEach(v => {
      initialState[v.name] =
        typeof v.mode !== 'undefined' && v.mode === 'multiple' ? [] : '';
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
    await this.props.getSearchListAction();
  }

  // update state
  onChange = (name, value) => {
    const { data } = this.state;
    this.setState({
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
        actionValue: propsData[key]?.data
          ?.find(stage => stateData.pipelineId === stage.id)
          ?.stages?.find(item => item.value === stateData[propsData[key].name])
          ?.text,
      });
    }

    return array.map(item => {
      if (item.value === '' || item.value.length === 0) {
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
          <span>{`${item.title}: ${item.actionValue ||
            item.faValue ||
            value}`}</span>
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
        <CPInput
          placeholder={item.title}
          className={s.input}
          onChange={v => this.onChange(item.name, v)}
          value={this.state.data[item.name]}
          name={item.name}
          faToEn
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

  // return CPSwitch
  createSwitch = item => {
    const { gridNumber } = this.props;
    return (
      <div className={`col-md-${gridNumber} flex-end`} key={item.name}>
        <small>{item.title}</small>
        <CPSwitch
          size="small"
          checked={this.state.data[item.name]}
          onChange={value => {
            this.onChange(item.name, value);
          }}
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
          showSearch
          mode={item.mode}
        />
      </div>
    );
  };

  // return custom dropDown
  createOpportunityStages = item => {
    const { gridNumber } = this.props;
    const { data } = this.state;
    const id = data?.pipelineId;
    const findObj = item?.data?.find(items => items?.id === id);
    let valueTemp = null;
    const list = findObj?.stages?.map(stage => {
      if (this.state.data[item.name] === stage.id) {
        valueTemp = stage.id;
      }
      return stage;
    });

    return (
      <div className={`col-md-${gridNumber}`} key={item.name}>
        <small>{item.title}</small>
        <CPSelect
          key={valueTemp}
          value={valueTemp}
          dataSource={list}
          onChange={value => {
            this.onChange(item.name, value);
          }}
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
        case 'switch':
          return this.createSwitch(item);
        case 'dropDown':
          return this.createDropDown(item);
        case 'actionIds':
          return this.createOpportunityStages(item);
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
    if (e) {
      e.preventDefault();
    }
    await this.setState({
      final: { ...this.state.data },
    });
    const { final } = this.state;
    let queryString = '';
    // eslint-disable-next-line no-unused-vars
    for (const key in final) {
      if (String(final[key]).length) {
        queryString += `${key}=${final[key]}&`;
      }
    }
    queryString = queryString.slice(0, -1);

    await this.props.onSearch(queryString);

    if (queryString === '') {
      this.setState({
        badge: false,
        open: false,
      });
    } else {
      this.setState({
        badge: true,
        open: false,
      });
    }
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

  // Render saved search list
  renderSearchListData = () => {
    const { searchListData } = this.props;
    const searchList = searchListData?.map(item => ({
      key: item.id,
      text: item.title,
      value: item.id,
    }));

    return searchList;
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

SearchBar.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSearch: PropTypes.func.isRequired,
  saveSearch: PropTypes.bool, // if search bar has save feature or not
  filterType: PropTypes.string, // pass source of entity to save search form
  searchListData: PropTypes.arrayOf(PropTypes.object), // pass source of entity to save search form
  getSearchListAction: PropTypes.func.isRequired,
  gridNumber: PropTypes.number, // change grid number
  showSaveSearch: PropTypes.bool,
};

SearchBar.defaultProps = {
  className: null,
  saveSearch: true,
  filterType: 'PERSON',
  searchListData: null,
  gridNumber: 3,
  showSaveSearch: true,
};

const mapState = state => ({
  searchListData: state.search.getSearchListData,
});

const mapDispatch = {
  getSearchListAction,
  anyModalOpen,
};

export default connect(mapState, mapDispatch)(withStyles(s)(SearchBar));
export const SearchBarTest = SearchBar;
