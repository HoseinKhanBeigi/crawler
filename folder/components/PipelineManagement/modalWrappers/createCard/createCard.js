import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import styles from './createCard.scss';
import { ButtonWrapper } from '../../widgets';
import PlusIcon from '../../icons/plusIcon';
import { getPipe as getPipeAction } from '../../../../store/pipelineManagement/pipelineManagement.actions';
import { createPipelineCard } from '../../../../store/pipelineCard/pipelineCard.actions';
import { MODAL_KEY_MAP, ModalWrapperContext } from '../store';
import { openModal } from '../store/actions';
import SmartFormGenerator from '../../SmartForm/SmartFormGenerator/SmartFormGenerator';
import TabsName from '../../TabsName';
import CPMessage from '../../../CP/CPMessage';

function CreateCard({
  pipeId,
  onClose,
  phaseName,
  pipe,
  startForm,
  createCard,
  getPipe,
}) {
  const { dispatch } = useContext(ModalWrapperContext);

  function openPipeSettingModal() {
    dispatch(
      openModal(MODAL_KEY_MAP.PIPE_SETTING, {
        actionId: TabsName.CREATE_CARD,
        pipeId,
      }),
    );
  }

  function chackRequiredFields(values) {
    let validate = true;
    // eslint-disable-next-line no-restricted-syntax,no-unused-vars
    for (const key in values) {
      if (
        startForm?.fields.find(item => item.id === key).properties.required &&
        values[key] === undefined
      )
        validate = false;
    }
    return validate;
  }

  async function submit(values) {
    const validate = chackRequiredFields(values);

    if (!pipe?.phases.length) {
      CPMessage('فازی تعریف نشده است.', 'error');
    } else if (!Object.values(values).find(item => item !== undefined)) {
      CPMessage('جهت ثبت کارت هیچ اطلاعاتی وارد نشده است.', 'error');
    } else if (!validate) {
      CPMessage('لطفا فیلدهای اجباری را پر کنید', 'error');
    } else {
      await createCard(pipe?.phases[0]?.id, pipe?.id, values);
      getPipe(pipe?.id);
      onClose();
    }
  }

  const emptyForm = useMemo(
    () => (
      <div>
        <div className={styles.emptyStartForm}>
          دراین قسمت هیچ فیلدی وجود ندارد.
        </div>
        <div className={styles.startFormButtonWrapper}>
          <ButtonWrapper
            onClick={openPipeSettingModal}
            className={styles.editFieldsButton}
            appearance="subtle"
          >
            <PlusIcon />
            <span className={styles.editButtonText}>
              اضافه کردن بخش های دیگر به این کارت
            </span>
          </ButtonWrapper>
          <ButtonWrapper
            type="submit"
            className={styles.submitButton}
            appearance="primary"
          >
            <span>ساختن کارت</span>
          </ButtonWrapper>
        </div>
      </div>
    ),
    [],
  );

  return (
    <>
      <div className={styles.startFormContainer}>
        <div className={styles.startFormHeader}>
          <div className={styles.startFormTitle}>
            <span>افزودن کارت جدید/</span>
            <span className={styles.phaseName}>{phaseName}</span>
          </div>
        </div>
        <div className={styles.formGeneratorContainer}>
          {startForm?.fields && startForm?.fields?.length && (
            <SmartFormGenerator fields={startForm?.fields} onSubmit={submit}>
              <div className={styles.startFormButtonWrapper}>
                <ButtonWrapper
                  onClick={openPipeSettingModal}
                  className={styles.editFieldsButton}
                  appearance="subtle"
                >
                  <PlusIcon />
                  <span className={styles.editButtonText}>
                    اضافه کردن بخش های دیگر به این کارت
                  </span>
                </ButtonWrapper>
                <ButtonWrapper
                  type="submit"
                  className={styles.submitButton}
                  appearance="primary"
                >
                  <span>ساختن کارت</span>
                </ButtonWrapper>
              </div>
            </SmartFormGenerator>
          )}
          {(!startForm?.fields || !startForm?.fields?.length) && emptyForm}
        </div>
      </div>
    </>
  );
}

CreateCard.propTypes = {
  onClose: PropTypes.func.isRequired,
  pipeId: PropTypes.string.isRequired,
  phaseName: PropTypes.string.isRequired,
  pipe: PropTypes.object.isRequired,
  startForm: PropTypes.object.isRequired,
  createCard: PropTypes.func.isRequired,
  getPipe: PropTypes.func.isRequired,
};

const stateMap = (
  { pipelineManagement: pipes, pipelineForm: forms },
  { pipeId },
) => ({
  pipe: pipes?.data[pipeId],
  startForm: forms?.data[pipeId],
});

const dispatchMap = {
  getPipe: getPipeAction,
  createCard: createPipelineCard,
};

export default connect(stateMap, dispatchMap)(withStyles(styles)(CreateCard));
