import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu, Row } from 'antd';
import Icon from '@mdi/react';
import { mdiAccount, mdiBank, mdiCurrencyUsd, mdiUmbrella } from '@mdi/js';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getAllFundsAction } from '../../../store/portfolio/portfolio.actions';
import { getLeadAction } from '../../../store/lead/lead.actions';
// eslint-disable-next-line css-modules/no-unused-class
import s from './SidebarMenu.scss';
import Detail from './Detail';
import Link from '../../../components/Link';

const { SubMenu } = Menu;
const { Item } = Menu;

const SidebarMenu = props => {
  const { levantId, leadInfo } = props;
  const [funds, setFunds] = useState([]);
  const [currentFund, setCurrentFund] = useState(null);

  async function getAllFundsList() {
    const response = await props.getAllFundsAction(levantId);
    setFunds(response);
    setCurrentFund(response[0]);
  }

  useEffect(() => {
    getAllFundsList();
    props.getLeadAction(levantId);
  }, []);
  const onSelectFund = fund => setCurrentFund(fund);
  return (
    <div className={s.container}>
      <div>
        <div className={s.more_info}>
          <div className={s.avatar_container}>
            <Icon path={mdiAccount} className={s.avatar_icon} size="36px" />
          </div>
          <div className={s.user_info}>
            <h4 className={s.title} level={4}>
              {`${leadInfo?.partyPerson?.firstName} ${leadInfo?.partyPerson?.lastName}`}
            </h4>
            {leadInfo?.levantId && (
              <Link className={s.button} to={`/lead/${leadInfo.levantId}`}>
                {leadInfo.levantId}
              </Link>
            )}
          </div>
        </div>
        <Menu
          style={{ width: 256 }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
        >
          <SubMenu
            key="sub1"
            title={
              <Row type="flex" align="middle" justify="start">
                <Icon path={mdiUmbrella} className={s.icon} size="34px" />
                <span>مدیریت سرمایه</span>
              </Row>
            }
          >
            <SubMenu key="sub1" title="صندوق‌ها">
              {funds?.map((item, index) => (
                <Item key={index + 1} onClick={() => onSelectFund(item)}>
                  {item?.fundName}
                </Item>
              ))}
            </SubMenu>
          </SubMenu>
          <SubMenu
            disabled
            key="sub2"
            title={
              <Row type="flex" align="middle" justify="start">
                <Icon path={mdiBank} className={s.icon} size="34px" />
                <span>بانکداری اختصاصی</span>
              </Row>
            }
          />
          <SubMenu
            disabled
            key="sub4"
            title={
              <Row type="flex" align="middle" justify="start">
                <Icon path={mdiCurrencyUsd} className={s.icon} size="34px" />
                <span>خدمات بیمه</span>
              </Row>
            }
          />
        </Menu>
      </div>
      <div className={s.sidebar_container}>
        <Detail current={currentFund} levantId={levantId} />
      </div>
    </div>
  );
};
SidebarMenu.propTypes = {
  leadInfo: PropTypes.object,
  levantId: PropTypes.string,
  getAllFundsAction: PropTypes.func.isRequired,
  getLeadAction: PropTypes.func.isRequired,
};
SidebarMenu.defaultProps = {
  leadInfo: null,
  levantId: '',
};
const mapDispatch = {
  getAllFundsAction,
  getLeadAction,
};
const mapStateToProps = state => ({
  leadInfo: state?.lead?.data,
});

export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(SidebarMenu));
