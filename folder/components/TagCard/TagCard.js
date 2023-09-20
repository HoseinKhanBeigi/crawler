import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Icon } from 'antd';
import cs from 'classnames';
import s from './TagCard.scss';
import CPButton from '../CP/CPButton';
import { getUsageAction } from '../../store/tag/tag.actions';
import CPPopover from '../CP/CPPopover';
import withModal from '../HOC/withModal';
import Link from '../Link';
import CPLoading from '../CP/CPLoading';
import {
  MODAL_FOR_ADD_TAG,
  MODAL_FOR_DELETE_TAG,
} from '../ModalRoot/repository';
import HandleAclPermission from '../HandleAclPermission';
import { Actions } from '../../utils/aclActions';

const TagCard = props => {
  const { className, backgroundColor, title, tagDetail, data, loading } = props;
  // Generate URL based on usage items type
  const renderHref = (type, tagId) => {
    switch (type) {
      case 'LEAD':
        return `/leads?tagId=${tagId}`;
      case 'PEOPLE':
        return `/people?tagId=${tagId}`;
      default:
        return '/settings/tags';
    }
  };

  const renderTagUsage = () => {
    if (data?.usages?.length > 0) {
      return (
        <CPLoading spinning={loading} delay={200}>
          <ul className={s.usageList}>
            {data?.usages?.map(usage => (
              <li key={tagDetail.id + usage.name}>
                <Icon type="tag" />
                <Link to={renderHref(usage.name, tagDetail.id)}>
                  {usage.title} <small>({usage.count})</small>{' '}
                </Link>
              </li>
            ))}
          </ul>
        </CPLoading>
      );
    }
    return <small>این برچسب تاکنون استفاده نشده است.</small>;
  };

  const showDeleteTagModal = () => {
    props.showModalAction({
      type: MODAL_FOR_DELETE_TAG,
      props: {
        tagDetail,
        usage: data?.usages,
      },
    });
  };

  const showEditTagModal = () => {
    props.showModalAction({
      type: MODAL_FOR_ADD_TAG,
      props: {
        editMode: true,
        initialValues: {
          id: tagDetail.id,
          name: tagDetail.name,
          color: tagDetail.color,
          description: tagDetail.description,
        },
      },
    });
  };

  const getUsageData = async () => {
    await props.getUsageAction(tagDetail.id);
  };

  return (
    <CPPopover
      overlayClassName={s.tagUsageList}
      content={renderTagUsage()}
      title="موارد استفاده"
    >
      <div onMouseEnter={getUsageData} className={cs(s.tagCard, className)}>
        <span className={s.border} style={{ backgroundColor }} />
        <span className={s.triangle} />
        <p>{title}</p>
        <span className={s.btnWrapper}>
          <HandleAclPermission wich={Actions.tagDelete}>
            <CPButton
              shape="circle"
              icon="delete"
              className="default-btn margin-l-5"
              onClick={showDeleteTagModal}
            />
          </HandleAclPermission>
          <HandleAclPermission wich={Actions.tagUpdate}>
            <CPButton
              shape="circle"
              icon="edit"
              className="default-btn"
              onClick={showEditTagModal}
            />
          </HandleAclPermission>
        </span>
      </div>
    </CPPopover>
  );
};

TagCard.propTypes = {
  className: PropTypes.string,
  getUsageAction: PropTypes.func.isRequired,
  data: PropTypes.object,
  backgroundColor: PropTypes.string,
  title: PropTypes.string,
  tagDetail: PropTypes.object,
  showModalAction: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

TagCard.defaultProps = {
  className: '',
  data: null,
  backgroundColor: '',
  title: '',
  tagDetail: null,
  loading: false,
};

const mapStateToProps = state => ({
  data: state.tag.getUsageData,
  loading: state.tag.getUsageLoading,
});

const mapDispatch = {
  getUsageAction,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(withModal(TagCard)));
export const TagCardTest = TagCard;
