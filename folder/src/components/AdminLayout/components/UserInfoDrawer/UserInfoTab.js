import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { List, Row, Icon, Upload, Typography, Button } from 'antd';
import CPButton from '../../../CP/CPButton';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../../../../serviceConfig';
import s from './UserInfoDrawer.scss';
import { getUserEmployeeProfileAction } from '../../../..//store/user/user.actions';
import branchManagementService from '../../../../service/branchManagementService';
import CPMessage from '../../../CP/CPMessage';

const { Text } = Typography;
const { Item } = List;

const UserInfoDrawer = props => {
  const { employeeProfileInfo } = props;
  const data = [
    {
      title: 'لوانت',
      value: employeeProfileInfo?.levantId || '---',
    },
    {
      title: 'سمت',
      value: employeeProfileInfo?.role?.name || '---',
    },
    {
      title: 'کد ملی',
      value: <Text copyable>{employeeProfileInfo?.nationalCode || '---'}</Text>,
    },
    {
      title: 'موبایل',
      value: employeeProfileInfo?.username || '---',
    },
    {
      title: 'شعبه',
      value: employeeProfileInfo?.branch?.name || '---',
    },
  ];

  function checkImageSize(size) {
    const sizeInMB = (size / (1024 * 1024)).toFixed(2);
    return sizeInMB <= 2;
  }

  const handleSubmit = async ({ file }) => {
    const { size } = file;
    if (checkImageSize(size)) {
      branchManagementService
        .postUploadProfileImage(file, employeeProfileInfo?.levantId)
        .then(() => {
          props.getUserEmployeeProfileAction();
        });
    } else CPMessage('فایل انتخاب شده بیشتر از ۲ مگابایت می باشد!', 'warning');
  };

  const uploadProps = {
    name: 'file',
    customRequest: handleSubmit,
    accept: '.jpg,.png, .jpeg',
    showUploadList: false,
  };

  return (
    <>
      <div className={s.userInfoTab_container}>
        <Row
          gutter={24}
          type="flex"
          style={{ alignItems: 'center', marginRight: '0!important' }}
        >
          {employeeProfileInfo?.profileImageBase64 && (
            <img
              className={s.userAvatar}
              src={employeeProfileInfo?.profileImageBase64}
              alt={employeeProfileInfo?.userId}
            />
          )}
          {!employeeProfileInfo?.profileImageBase64 && (
            <Icon type="user" className={s.user_avatar_icon} />
          )}
          <Row type="flex" style={{ flexDirection: 'column' }}>
            <Upload {...uploadProps}>
              <CPButton type="default">تغییر تصویر پروفایل</CPButton>
            </Upload>
            <Button type="link" className={s.link}>
              <a
                href={`${resolveVariable(
                  BASE_VARIABLE_KEYS.AUTH_RESET_PASSWORD_URL,
                )}/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                تغییر رمز عبور
              </a>
            </Button>
          </Row>
        </Row>
        <List
          style={{ marginTop: '20px' }}
          grid={{ gutter: 16, column: 2 }}
          dataSource={data}
          renderItem={item => (
            <Item>
              <h4 style={{ fontSize: '11px', color: '#777777' }}>
                {item?.title}
              </h4>
              <small style={{ fontSize: '13px', color: '#434343' }}>
                {item?.value}
              </small>
            </Item>
          )}
        />
      </div>
    </>
  );
};

UserInfoDrawer.propTypes = {
  employeeProfileInfo: PropTypes.object,
  getUserEmployeeProfileAction: PropTypes.func.isRequired,
};
UserInfoDrawer.defaultProps = {
  employeeProfileInfo: null,
};

const mapState = state => ({
  employeeProfileInfo: state?.user?.currentUserInfoEmployee,
});
const mapDispatch = {
  getUserEmployeeProfileAction,
};
export default connect(mapState, mapDispatch)(withStyles(s)(UserInfoDrawer));
