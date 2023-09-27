import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Icon, Steps } from 'antd';
import s from './EntityOpportunityList.scss';
import CPPanel from '../CP/CPPanel';
import Link from '../Link';
import CPModal from '../CP/CPModal';
import CPButton from '../CP/CPButton';
import { getOpportunityAction } from '../../store/opportunity/opportunity.actions';

const { Step } = Steps;

class EntityOpportunityList extends React.Component {
  constructor(props) {
    super(props);
    this.statusType = {
      WON: {
        title: 'فرصت موفق',
      },
      ABANDONED: {
        title: 'فرصت رها شده',
      },
      LOST: {
        title: 'فرصت از دست رفته',
      },
      OPEN: {
        title: 'در حال انجام',
      },
      SUBMITTED: {
        title: 'در حال انجام',
      },
    };
    this.state = {
      showModal: false,
      itemId: null,
    };
  }

  onClick = (id, name, e) => {
    if (e && e.stopPropagation()) {
      e.stopPropagation();
    }
    this.setState({
      [name]: true,
      itemId: id,
    });
  };

  handleCancel = (e, name) => {
    this.setState({
      [name]: false,
    });
  };

  // render application names and status
  renderList = data => {
    if (data) {
      return data.content.map(item => (
        <li key={item.productId}>
          <p>
            <b className={s.label}>نام اپلیکیشن: </b>
            <Link to="/#">{item.productTitle}</Link>
          </p>
          <p>
            <b className={s.label}>وضعیت: </b>
            <small>
              {this.statusType[item.opportunityStatus]
                ? this.statusType[item.opportunityStatus].title
                : item.opportunityStatus}
            </small>
          </p>
          <CPButton
            className={s.btn}
            onClick={() => this.onClick(item.productId, 'showModal')}
          >
            <Icon type="dollar" />
          </CPButton>
        </li>
      ));
    }
    return null;
  };

  // render modal children
  renderModalData = (data, id) => {
    if (data && id) {
      return data.content.map(item => {
        if (item.productId === id) {
          const status = item.opportunityStatus;
          const lastItem = item.pipelines[item.pipelines.length - 1];
          const current = item.pipelines.lastIndexOf(lastItem);
          let currentElement = null;
          if (status !== 'WON') {
            const currentStatus = item.currentPipelineCode;
            const codes = item.pipelines.map(i => i.code);
            codes.forEach(element => {
              if (element === currentStatus) {
                currentElement = codes.lastIndexOf(element);
                return currentElement;
              }
              return 0;
            });
          }
          return (
            <Steps
              key={item.productId}
              size="small"
              labelPlacement="vertical"
              status={status === 'WON' ? 'finish' : 'process'}
              current={status === 'WON' ? current : currentElement}
            >
              {item.pipelines.map(pipelines => (
                <Step key={pipelines.code} title={pipelines.title} />
              ))}
            </Steps>
          );
        }
        return null;
      });
    }
    return null;
  };

  render() {
    const { showModal, itemId } = this.state;
    const { opportunityListData } = this.props;
    const count =
      opportunityListData && opportunityListData.count > 0
        ? opportunityListData.count
        : null;

    return count != null ? (
      <div className={s.entityGroupList}>
        <CPPanel
          header={
            <span className={s.headerList}>
              فرصت ها
              <span className={s.count}>({count})</span>
            </span>
          }
        >
          <ul className={s.dataList}>{this.renderList(opportunityListData)}</ul>
        </CPPanel>

        <CPModal
          className="entityGroupListModal"
          title="مراحل احراز هویت"
          visible={showModal}
          footer={null}
          onCancel={e => {
            this.handleCancel(e, 'showModal');
          }}
        >
          {this.renderModalData(opportunityListData, itemId)}
        </CPModal>
      </div>
    ) : (
      <b className={s.noData}>
        <Icon type="dollar" />
        <span>فرصتی موجود نیست</span>
      </b>
    );
  }
}

EntityOpportunityList.propTypes = {
  opportunityListData: PropTypes.object,
};

EntityOpportunityList.defaultProps = {
  opportunityListData: null,
};

const mapStateToProps = state => ({
  opportunityListData: state.opportunity.data,
});

const mapDispatch = {
  getOpportunityAction,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(EntityOpportunityList));

export const EntityDocumentListTest = EntityOpportunityList;
