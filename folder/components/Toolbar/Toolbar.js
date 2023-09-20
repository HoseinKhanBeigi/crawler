import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Icon } from 'antd';
import s from './Toolbar.scss';
import Link from '../Link';
import CPDivider from '../CP/CPDivider';
import CPDropdown from '../CP/CPDropdown';
import { isAclSkipped } from '../../utils/aclActions';

const Toolbar = props => {
  const {
    allDropDownTitle,
    hasSearch,
    hasFilter,
    allDropDownOverlay,
    addNewDropDownOverlay,
    contactOverlay,
    settingOverlay,
    allDropDownFunc,
    addNewDropDownFunc,
    settingFunc,
    contactFunc,
    title,
    authorities,
  } = props;

  const [finalMenuList, setFinalMenuList] = useState([]);

  useEffect(() => {
    const initFinalMenuList = () => {
      const finalList = [];
      const handleAuth = code => {
        const couldShow = authorities?.filter(item => item.code === code);
        return !!couldShow.length;
      };
      addNewDropDownOverlay.map(menu => {
        if (handleAuth(menu?.authority)) finalList.push(menu);
        return menu;
      });
      if (!isAclSkipped(authorities)) setFinalMenuList(finalList);
    };
    initFinalMenuList();
  }, []);
  return (
    <div className={s.toolbar}>
      {title && <span className={s.title}>{title}</span>}
      <ul className={s.rightTools}>
        {allDropDownOverlay && (
          <React.Fragment>
            <li>
              <CPDropdown
                menuList={allDropDownOverlay}
                title={allDropDownTitle}
                iconType="caret-down"
                onClick={allDropDownFunc}
              />
            </li>
            {addNewDropDownOverlay && (
              <li>
                <CPDivider type="vertical" />
              </li>
            )}
          </React.Fragment>
        )}
        {finalMenuList?.length ? (
          <li className={s.addNew}>
            <CPDropdown
              menuList={finalMenuList}
              title="فعالیت ها"
              iconType="caret-down"
              onClick={e => {
                addNewDropDownFunc(e);
              }}
            />
          </li>
        ) : null}
      </ul>
      <ul className={s.leftTools}>
        {hasFilter && (
          <li>
            <Link to="/#" onClick={this.showDrawer}>
              <Icon type="filter" />
            </Link>
          </li>
        )}
        {settingOverlay && (
          <li>
            <CPDropdown
              menuList={settingOverlay}
              iconType="setting"
              onClick={settingFunc}
            />
          </li>
        )}
        {contactOverlay && (
          <li>
            <CPDropdown
              menuList={contactOverlay}
              iconType="user"
              onClick={contactFunc}
            />
          </li>
        )}
        {hasSearch && (
          <li>
            <form className={s.searchForm}>
              <label htmlFor="search">
                <Icon type="search" />
                <input type="search" className={s.searchField} id="search" />
              </label>
              <input type="submit" className={s.searchSubmit} />
            </form>
          </li>
        )}
      </ul>
    </div>
  );
};

Toolbar.propTypes = {
  allDropDownTitle: PropTypes.string,
  hasSearch: PropTypes.bool,
  hasFilter: PropTypes.bool,
  allDropDownOverlay: PropTypes.arrayOf(PropTypes.object),
  addNewDropDownOverlay: PropTypes.arrayOf(PropTypes.object),
  contactOverlay: PropTypes.arrayOf(PropTypes.object),
  settingOverlay: PropTypes.arrayOf(PropTypes.object),
  allDropDownFunc: PropTypes.func,
  authorities: PropTypes.array.isRequired,
  addNewDropDownFunc: PropTypes.func,
  settingFunc: PropTypes.func,
  contactFunc: PropTypes.func,
  title: PropTypes.string,
};

Toolbar.defaultProps = {
  allDropDownTitle: '',
  hasSearch: false,
  hasFilter: false,
  allDropDownOverlay: null,
  addNewDropDownOverlay: null,
  contactOverlay: null,
  settingOverlay: null,
  title: null,
  allDropDownFunc: () => {},
  addNewDropDownFunc: () => {},
  settingFunc: () => {},
  contactFunc: () => {},
};

Toolbar.propTypes = {
  authorities: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  authorities: state?.acl?.authorities,
});

export default connect(mapStateToProps)(withStyles(s)(memo(Toolbar)));
