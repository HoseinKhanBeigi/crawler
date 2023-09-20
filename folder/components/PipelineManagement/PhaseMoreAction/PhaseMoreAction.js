import React, { useState, useMemo, useContext } from 'react';
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './PhaseMoreAction.scss';
import More from '../icons/more';
import Edit from '../icons/edit';
import Delete from '../icons/delete';
import DeleteModal from '../DeleteModal/DeleteModal';
import { deletePipelinePhaseService } from '../../../service/pipelineManagementService';
import { MODAL_KEY_MAP, ModalWrapperContext } from '../modalWrappers/store';
import { openModal } from '../modalWrappers/store/actions';
import TabsName from '../TabsName';

function PhaseMoreAction({ phaseId, pipe, getPipe }) {
  const [confirm, setConfirm] = useState(false);
  const { dispatch } = useContext(ModalWrapperContext);

  function openPipeSettingModal() {
    dispatch(
      openModal(MODAL_KEY_MAP.PIPE_SETTING, {
        actionId: TabsName.PHASE_SETTING,
        pipeId: pipe.id,
        phaseId,
      }),
    );
  }

  async function deletePhase() {
    const response = deletePipelinePhaseService(phaseId);
    if (response) {
      getPipe(pipe.id);
    }
  }

  const phaseName = useMemo(() => {
    const { phases } = pipe;
    return phases.filter(phase => phase.id === phaseId)[0]?.name;
  }, [phaseId, pipe]);

  return (
    <>
      <div className={styles.moreActionContainer}>
        <DropdownMenu
          triggerButtonProps={{ iconBefore: <More /> }}
          triggerType="button"
        >
          <DropdownItemGroup>
            <DropdownItem
              className={styles.moreActionTextWrapper}
              onClick={openPipeSettingModal}
            >
              <Edit />
              <span className={styles.moreActionText}>ویرایش فاز</span>
            </DropdownItem>
            <DropdownItem
              className={styles.moreActionTextWrapper}
              onClick={() => setConfirm(true)}
            >
              <Delete />
              <span className={styles.moreActionText}>حذف فاز</span>
            </DropdownItem>
          </DropdownItemGroup>
        </DropdownMenu>
      </div>
      <DeleteModal
        onConfirm={deletePhase}
        show={confirm}
        onClose={() => setConfirm(false)}
        title={`حذف فاز "${phaseName}"`}
        description="با حذف این فاز، تمام کارت ها، محتوا و تنظیمات مربوطه در آن برای همیشه از بین می روند."
      />
    </>
  );
}

PhaseMoreAction.propTypes = {
  phaseId: PropTypes.string.isRequired,
  pipe: PropTypes.object.isRequired,
  getPipe: PropTypes.func.isRequired,
};

export default withStyles(styles)(PhaseMoreAction);
