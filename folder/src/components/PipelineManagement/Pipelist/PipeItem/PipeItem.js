/* eslint-disable css-modules/no-unused-class */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from 'classnames';
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from '../PipeList.scss';
import More from '../../icons/more';
import Delete from '../../icons/delete';
import DeleteModal from '../../DeleteModal/DeleteModal';
import history from '../../../../history';
import { deletePipeService } from '../../../../service/pipelineManagementService';
import CPMessage from '../../../CP/CPMessage';

function PipeItem({ pipe, icon, color, getPipes }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [confirm, setConfirm] = useState(false);

  function goToPipe() {
    history.push(`/pipeline-management/${pipe.id}`);
  }

  function openDropdownMenu(event) {
    event.stopPropagation();
    setShowDropdown(true);
  }

  async function deletePipe() {
    const response = await deletePipeService(pipe.id);
    CPMessage('پایپلاین مورد نظر حذف شد', 'success');
    if (response) {
      getPipes();
    }
  }

  function dropDownOnChange(e) {
    setShowDropdown(e.isOpen);
  }

  return (
    <>
      <div className={styles.pipItemContainer}>
        <button
          type="button"
          className={classes(
            showDropdown ? styles.hoveredPipe : styles.pipe,
            color,
          )}
          onClick={goToPipe}
        >
          {icon}
          <span className={styles.pipeNameTitle}>{pipe?.name}</span>
          <span className={styles.pipeCardsNumber}>
            {pipe?.cardCount || 0} کارت
          </span>
          <div className={styles.moreContainer}>
            <span
              role="button"
              tabIndex="0"
              onClick={openDropdownMenu}
              onKeyPress={openDropdownMenu}
            >
              <More />
            </span>
          </div>
          <div className={styles.slash} />
        </button>
        <div className={styles.dropdownMenuContainer}>
          <DropdownMenu isOpen={showDropdown} onOpenChange={dropDownOnChange}>
            <DropdownItemGroup>
              <DropdownItem
                className={styles.moreActionTextWrapper}
                onClick={() => setConfirm(true)}
              >
                <Delete />
                <span className={styles.moreActionText}>حذف پایپ‌لاین</span>
              </DropdownItem>
            </DropdownItemGroup>
          </DropdownMenu>
        </div>
      </div>
      <DeleteModal
        onConfirm={deletePipe}
        show={confirm}
        onClose={() => setConfirm(false)}
        title={`حذف پایپ‌لاین "${pipe.name}"`}
        description="با حذف این پایپ، تمام کارت ها، محتوا و تنظیمات مربوطه در آن برای همیشه از بین می روند."
      />
    </>
  );
}

PipeItem.propTypes = {
  icon: PropTypes.element.isRequired,
  color: PropTypes.string.isRequired,
  pipe: PropTypes.object.isRequired,
  getPipes: PropTypes.func.isRequired,
};

export default withStyles(styles)(PipeItem);
