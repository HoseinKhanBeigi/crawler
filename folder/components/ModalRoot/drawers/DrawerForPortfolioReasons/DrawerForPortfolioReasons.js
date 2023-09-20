import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DRAWER_FOR_PORTFOLIO_REASONS } from '../../repository';
import CPRadio from '../../../CP/CPRadio';
import CPTextArea from '../../../CP/CPTextArea';
import KianDrawer from '../../../KianDrawer/KianDrawer';
import CPLoading from '../../../CP/CPLoading';
import {
  getPortfolioReasonsAction,
  postPortfolioReasonAction,
} from '../../../../store/portfolio/portfolio.actions';
import history from '../../../../history';

const DrawerForSendMessage = props => {
  const { levantId } = props;
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [submitFormLoading, setSubmitFormLoading] = useState(false);
  const [crmChannelList, setCrmChannelList] = useState([]);
  const [portfoDisplayReasonsList, setPortfoDisplayReasonsList] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [selectedReason, setSelectedReason] = useState(null);
  const [otherReason, setOtherReason] = useState(null);

  function closeDrawer() {
    setVisible(false);
  }

  const handleSubmit = async () => {
    setSubmitFormLoading(true);
    const body = {
      communicationChannel: selectedChannel,
      reasons: { description: otherReason, reasons: selectedReason },
    };
    const response = await props.postPortfolioReasonAction(levantId, body);
    setSubmitFormLoading(false);
    if (!response.err) {
      closeDrawer();
      history.push(`/portfolio/${levantId}`);
    }
  };

  useEffect(() => {
    async function getReasonsList() {
      setLoading(true);
      const response = await props.getPortfolioReasonsAction();
      if (!response.error) {
        const { communicationChannel, reasons } = response;
        const mapedChannelList = communicationChannel?.map(item => ({
          value: item?.code,
          name: item.title,
        }));
        const mapedReasonslList = reasons?.map(item => ({
          value: item?.reasons?.code,
          name: item?.reasons?.title,
        }));
        setLoading(false);
        setCrmChannelList(mapedChannelList);
        setPortfoDisplayReasonsList(mapedReasonslList);
      }
    }
    getReasonsList();
  }, []);

  return (
    <KianDrawer
      title="مشاهده پورتفوی مالی"
      drawerId={DRAWER_FOR_PORTFOLIO_REASONS}
      visible={visible}
      onClose={closeDrawer}
      okText="تایید و ادامه"
      cancelText="انصراف"
      okButtonProps={{
        disabled: !selectedReason || !selectedChannel,
        loading: submitFormLoading,
      }}
      onOk={handleSubmit}
      onCancel={closeDrawer}
    >
      <>
        <CPLoading tip="رد حال دریافت لیست دلایل..." spinning={loading}>
          <h4>کانال ارتباط با مشتری</h4>
          <CPRadio
            vertical
            value={selectedChannel}
            model={crmChannelList}
            onChange={e => setSelectedChannel(e.target.value)}
            className="margin-b-10 margin-t-10 margin-r-10"
            size="small"
          />
          <h4>علت مشاهده پرتفوی مالی</h4>
          <CPRadio
            vertical
            value={selectedReason}
            model={portfoDisplayReasonsList}
            onChange={e => setSelectedReason(e.target.value)}
            className="margin-b-10 margin-t-10 margin-r-10"
            size="small"
          />
          {selectedReason === '3' && (
            <CPTextArea
              value={otherReason}
              onChange={e => setOtherReason(e.target.value)}
              placeholder="توضیح علت مشاهده: "
              rows={3}
            />
          )}
        </CPLoading>
      </>
    </KianDrawer>
  );
};

DrawerForSendMessage.defaultProps = {
  levantId: '',
};
DrawerForSendMessage.propTypes = {
  levantId: PropTypes.string,
  getPortfolioReasonsAction: PropTypes.func.isRequired,
  postPortfolioReasonAction: PropTypes.func.isRequired,
};

const mapToDispatch = {
  getPortfolioReasonsAction,
  postPortfolioReasonAction,
};

const mapState = state => ({
  levantId: state.lead.data.levantId,
});

export default connect(mapState, mapToDispatch)(DrawerForSendMessage);
