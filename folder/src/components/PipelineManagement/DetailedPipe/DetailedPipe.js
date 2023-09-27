/* eslint-disable css-modules/no-unused-class */
import React, { useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Tooltip } from 'antd';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import classes from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Tabs, { Tab, TabList } from '@atlaskit/tabs';
import InlineEdit from '@atlaskit/inline-edit';
import { ButtonWrapper, InputWrapper } from '../widgets';
import styles from './DetailedPipe.scss';
import PhaseMoreAction from '../PhaseMoreAction/PhaseMoreAction';
import PlusIcon from '../icons/plusIcon';
import CardDetailModalWrapper from '../modalWrappers/cardDetail/CardDetailModalWrapper';
import CreateCardModalWrapper from '../modalWrappers/createCard/createCardModalWrapper';
import CreatePhaseModalWrapper from '../modalWrappers/createPhase/createPhaseModalWrapper';
import PipeSettingModalWrapper from '../modalWrappers/pipeSetting/PipeSettingModalWrapper';
import { MODAL_KEY_MAP, ModalWrapperContext } from '../modalWrappers/store';
import { openModal } from '../modalWrappers/store/actions';
import { StringUtils } from '../../../utils/stringUtils';
import { ObjectUtils } from '../../../utils/objectUtils';
import { getPipe as getPipeAction } from '../../../store/pipelineManagement/pipelineManagement.actions';
import { getPipelineForm } from '../../../store/pipelineForm/pipelineForm.actions';
import { movePipelineCard } from '../../../store/pipelineCard/pipelineCard.actions';
import CustomTabPanel from './CustomTabPanel';
import CardsList from './CardList';
import { updatePipelinePhaseService } from '../../../service/pipelineManagementService';
import { getPipeParameter } from '../../../store/pipelineParameters/pipelineParameters.action';
import TabsName from '../TabsName';

const tabs = [
  {
    id: 0,
    title: 'نمای کانبان',
    disabled: false,
  },
  {
    id: 1,
    title: 'گزارش‌ها',
    disabled: true,
  },
  {
    id: 2,
    title: 'فرم‌ها',
    disabled: true,
  },
  {
    id: 3,
    title: 'ایمیل‌ها',
    disabled: true,
  },
  {
    id: 4,
    title: 'داشبورد',
    disabled: true,
  },
];

function phaseCompare() {
  return (a, b) => {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    return 0;
  };
}

function DetailedPipe({
  id,
  getPipe,
  getForm,
  getSettings,
  moveCard,
  pipelineData,
  pipePhases,
  startFormFields,
  defaultPipeParameter,
}) {
  const [activeTab, setActiveTab] = useState(0);
  const [activeButton, setActiveButton] = useState('');
  const { dispatch } = useContext(ModalWrapperContext);

  // TODO: handle pipe not found and null id
  // TODO: handle loading on getting pipePhase and start form

  useEffect(() => {
    if (StringUtils.isItFilled(id)) {
      getForm('start', id);
    }
  }, [id]);
  useEffect(() => {
    getSettings(id);
    setActiveButton('cardView');
  }, []);

  function generateRandomColor() {
    const colors = [styles.color0, styles.color1, styles.color2, styles.color3];
    return colors[Math.ceil(Math.random() * 4) - 1];
  }

  const phases = useMemo(
    () =>
      pipePhases
        ?.sort(phaseCompare)
        .map(item => ({ ...item, color: generateRandomColor() })),
    [pipePhases],
  );

  useEffect(() => {
    if (!ObjectUtils.checkIfItsFilled(pipelineData)) {
      getPipe(id);
    }
  }, [pipelineData, id, phases]);

  function canMoveTo(source, destination) {
    if (!StringUtils.isItFilled(source, destination)) {
      return false;
    }
    if (source === destination) {
      return false;
    }
    // TODO: implement canMoveTo check here
    return true;
  }

  async function moveCardToPhase(cardId, source, destination) {
    try {
      await moveCard(cardId, source, destination);
      getPipe(id);
    } catch (e) {
      // TODO: handle error
    }
  }

  function onDragEnd(result) {
    const source = result.source?.droppableId;
    const destination = result.destination?.droppableId;
    if (result.reason === 'DROP' && canMoveTo(source, destination)) {
      moveCardToPhase(result.draggableId, source, destination);
    }
  }

  function openCreateCardModal() {
    dispatch(
      openModal(MODAL_KEY_MAP.CREATE_CARD, {
        pipeId: pipelineData?.id,
      }),
    );
  }

  function openCardSettingModal() {
    dispatch(
      openModal(MODAL_KEY_MAP.PIPE_SETTING, {
        actionId: TabsName.PIPE_SETTING,
        pipeId: pipelineData?.id,
        phaseName: phases[0]?.name,
      }),
    );
  }

  const openCreatePhaseModal = () => {
    dispatch(
      openModal(MODAL_KEY_MAP.CREATE_PHASE, { pipeId: pipelineData?.id }),
    );
  };

  const updatePhase = async (value, phaseId) => {
    if (StringUtils.isItFilled(value)) {
      const response = await updatePipelinePhaseService(id, phaseId, value);
      if (response) {
        getPipe(id);
      }
    }
  };

  const generatePhaseName = (defaultName, phaseId, phaseColor) => (
    <InlineEdit
      defaultValue={defaultName}
      editView={({ errorMessage, ...fieldProps }) => (
        <InputWrapper {...fieldProps} autoFocus />
      )}
      readView={() => (
        <div className={classes(styles.phaseTitle, phaseColor)}>
          <span>{defaultName}</span>
        </div>
      )}
      onConfirm={value => updatePhase(value, phaseId)}
    />
  );

  const renderedPhases = useMemo(
    () =>
      phases?.map(phase => (
        <Droppable key={`p-${phase.id}`} droppableId={phase.id}>
          {provided => (
            <div
              className={styles.phaseContainer}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div className={styles.phaseHeader}>
                <div className={styles.phaseName}>
                  {generatePhaseName(phase.name, phase.id, phase.color)}

                  <div className={styles.cardsNumber}>
                    {phase.cards.length} کارت
                  </div>
                </div>
                <div className={classes(styles.More)}>
                  {pipelineData && (
                    <PhaseMoreAction
                      phaseId={phase.id}
                      pipe={pipelineData}
                      getPipe={getPipe}
                    />
                  )}
                </div>
              </div>
              <div className={styles.cardsContainer}>
                <CardsList
                  phase={phase}
                  fields={startFormFields}
                  cardsTitle={defaultPipeParameter?.CARD_TITLE_ID}
                />
                <div className={styles.emptyPhase}>{phase.description}</div>
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )),
    [phases, startFormFields, defaultPipeParameter],
  );

  const renderedTabs = useMemo(
    () =>
      tabs.map(
        item =>
          !item.disabled && (
            <Tab key={item.id}>
              <div
                className={classes(
                  styles.tab,
                  activeTab === item.id ? styles.activeTab : '',
                )}
              >
                {item.title}
              </div>
            </Tab>
          ),
      ),
    [activeTab],
  );
  return (
    <>
      <div className={styles.pipeLineContainer}>
        <Tabs
          shouldUnmountTabPanelOnChange
          selected={activeTab}
          onChange={setActiveTab}
          id="pipe_tab"
        >
          <div className={styles.headerContainer}>
            <div className={classes(styles.pipelineHeader, 'pipeLine-Header')}>
              <span className={styles.pipeTitle}>{pipelineData?.name}</span>
              <div className={styles.pipeTools}>
                <Tooltip title="نمای کارتی">
                  <Button
                    data-cy="show-list"
                    icon="project"
                    type={activeButton === 'cardView' ? 'primary' : 'default'}
                    onClick={() => {}}
                  />
                </Tooltip>
                <Tooltip title="تنظیمات پایپلاین">
                  <Button
                    data-cy="pipe-setting"
                    icon="setting"
                    type="default"
                    onClick={openCardSettingModal}
                  />
                </Tooltip>
              </div>
            </div>
            <div className={styles.pipelineHeader}>
              <div className={styles.tabWrapper}>
                <TabList>{renderedTabs}</TabList>
              </div>
              <ButtonWrapper
                appearance="primary"
                onClick={openCreateCardModal}
                className={styles.startForm}
              >
                <PlusIcon />
                <span>افزودن کارت </span>
              </ButtonWrapper>
            </div>
          </div>
          <CustomTabPanel heading="" body="">
            <div className={styles.pipeLine}>
              <DragDropContext onDragEnd={onDragEnd}>
                {renderedPhases}
                <div className={styles.buttonWrapper}>
                  <ButtonWrapper
                    appearance="subtle"
                    onClick={openCreatePhaseModal}
                    className={styles.newPhase}
                  >
                    <PlusIcon />
                    <span className={styles.buttonText}>ایجاد فاز جدید</span>
                  </ButtonWrapper>
                </div>
              </DragDropContext>
            </div>
          </CustomTabPanel>
        </Tabs>
      </div>
      <CardDetailModalWrapper titleId={defaultPipeParameter?.CARD_TITLE_ID} />
      <CreateCardModalWrapper />
      <CreatePhaseModalWrapper />
      <PipeSettingModalWrapper />
    </>
  );
}

DetailedPipe.propTypes = {
  id: PropTypes.string.isRequired,
  getPipe: PropTypes.func.isRequired,
  getForm: PropTypes.func.isRequired,
  moveCard: PropTypes.func.isRequired,
  getSettings: PropTypes.func.isRequired,
  pipelineData: PropTypes.object.isRequired,
  pipePhases: PropTypes.array.isRequired,
  startFormFields: PropTypes.array.isRequired,
  defaultPipeParameter: PropTypes.object.isRequired,
};

const stateMap = (
  {
    pipelineManagement: pipes,
    pipelinePhase: phases,
    pipelineForm: forms,
    pipelineParameters: setting,
  },
  { id },
) => ({
  pipelineData: pipes?.data[id],
  pipePhases: phases.data[id],
  startFormFields: forms.data[id]?.fields,
  defaultPipeParameter: setting.data?.PIPE_SETTING,
});

const dispatchMap = {
  getSettings: getPipeParameter,
  getPipe: getPipeAction,
  moveCard: movePipelineCard,
  getForm: getPipelineForm,
};

export default connect(stateMap, dispatchMap)(withStyles(styles)(DetailedPipe));
