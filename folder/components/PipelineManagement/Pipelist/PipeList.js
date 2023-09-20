/* eslint-disable css-modules/no-unused-class */
import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './PipeList.scss';
import PlusIcon from '../icons/plusIcon';
import Modal from '../Modal/Modal';
import { ButtonWrapper, InputWrapper } from '../widgets';
import Group from '../icons/group';
import Human from '../icons/human';
import Key from '../icons/key';
import Receipt from '../icons/receipt';
import PipeItem from './PipeItem/PipeItem';
import history from '../../../history';
import { getPipes as getPipesAction } from '../../../store/pipelineManagement/pipelineManagement.actions';
import { createPipeService } from '../../../service/pipelineManagementService';

function PipeList({ initialPipes, getPipes }) {
  const [displayCreateCardModal, setDisplayCreateCardModal] = useState(false);
  const [newPipeName, setNewPipeName] = useState();
  const [error, setError] = useState(null);
  const gotoPipe = id => history.push(`/pipeline-management/${id}`);

  function generateRandomColor() {
    const colors = [styles.color0, styles.color1, styles.color2, styles.color3];
    return colors[Math.ceil(Math.random() * 4) - 1];
  }

  function generateRandomIcon() {
    const icons = [<Group />, <Human />, <Key />, <Receipt />];
    return icons[Math.ceil(Math.random() * 4) - 1];
  }

  const pipes = useMemo(() => {
    if (initialPipes) {
      return Object.values(initialPipes).map(item => ({
        ...item,
        color: generateRandomColor(),
        icon: generateRandomIcon(),
      }));
    }
    return [];
  }, [initialPipes]);

  const createPipe = async () => {
    try {
      setError(null);
      const response = await createPipeService(newPipeName);
      gotoPipe(response?.id);
    } catch (e) {
      const errorObject = await e;
      if (errorObject?.response?.data?.exceptionMessage === 'ALREADY_EXISTS') {
        setError('نام انتخاب شده تکراری است، لطفا نام دیگری وارد کنید');
      } else {
        setError('خطایی پیش آمده، دوباره تلاش کنید');
      }
    }
  };
  useEffect(() => {
    getPipes();
  }, []);

  const showModal = () => {
    setDisplayCreateCardModal(true);
  };

  const hideModal = () => {
    setNewPipeName('');
    setError(null);
    setDisplayCreateCardModal(false);
  };

  const onChangeHandler = e => {
    setNewPipeName(e.target.value);
  };

  const renderedPipes = useMemo(
    () =>
      pipes?.map(item => (
        <PipeItem
          key={item.id}
          pipe={item}
          color={item.color}
          icon={item.icon}
          getPipes={getPipes}
        />
      )),
    [pipes],
  );

  return (
    <>
      <div className={styles.pipeListContainer}>
        <div className={styles.greeting}>خوش آمدی:)</div>
        <div className={styles.greetingDesc}>
          در شیوا می‌توانی روند کاری خود را پیگیری کنی، با هم تیمی‌های خود به
          خوبی کار کنی، در خواست‌های خود را سازمان‌دهی کنی و اطلاعات خود را به
          طور متمرکز گردآوری کنی.
        </div>
        <hr className={styles.divider} />
        <div className={styles.pipeTitle}>پایپ‌لاین‌های شما</div>
        <div className={styles.greetingDesc}>
          همه‌‌ی پایپ‌لاین‌ها و مراحل کاری شما در این بخش وجود دارد.
        </div>
        <div className={styles.pipesContainer}>
          <ButtonWrapper
            appearance="link"
            className={styles.newPipe}
            onClick={showModal}
          >
            <PlusIcon />
            <span className={styles.addPipeText}>اضافه کردن پایپ‌ جدید </span>
          </ButtonWrapper>
          {renderedPipes}
        </div>
      </div>
      <div className={styles.modalContainer}>
        <Modal show={displayCreateCardModal} handleClose={hideModal}>
          {displayCreateCardModal && (
            <div className={styles.pipeNameContainer}>
              <h2>افزودن پایپ‌لاین جدید</h2>
              <InputWrapper
                label="نام پایپ‌لاین"
                placeholder="برای پایپ خود یک نام مناسب انتخاب کنید."
                onChange={onChangeHandler}
                value={newPipeName}
                errorMessage={error}
                description="یک نام برای پایپ‌لاین خود انتخاب کنید که روند شما را به بهترین وجه توصیف کنید."
              />
              <div className={styles.modalBtnWrapper}>
                <ButtonWrapper
                  onClick={hideModal}
                  appearance="link"
                  className={styles.cancelButton}
                >
                  <span>لغو</span>
                </ButtonWrapper>
                <ButtonWrapper
                  onClick={createPipe}
                  appearance="primary"
                  className={styles.createButton}
                >
                  <span>ایجاد</span>
                </ButtonWrapper>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
}

PipeList.propTypes = {
  initialPipes: PropTypes.object.isRequired,
  getPipes: PropTypes.func.isRequired,
};

const stateMap = store => ({
  initialPipes: store.pipelineManagement?.data,
});

const dispatchMap = {
  getPipes: getPipesAction,
};

export default connect(stateMap, dispatchMap)(withStyles(styles)(PipeList));
