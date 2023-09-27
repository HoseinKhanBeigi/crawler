import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CPInput from '../../../components/CP/CPInput';
import CPLabel from '../../../components/CP/CPLabel';
import s from './KycLevelForm.scss';
import CPButton from '../../../components/CP/CPButton';
import kycLevelService from '../../../service/kycLevelService';
import CPLoading from '../../../components/CP/CPLoading';

const { CheckableTag } = Tag;

const KycLevelForm = ({ initialValues, onSubmit, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState(
    initialValues.description || '',
  );
  const [name, setName] = useState(initialValues.name || '');
  const [kycElements, setKycElements] = useState(
    new Set(initialValues.kycElements || []),
  );
  const [allElements, setAllElements] = useState({});

  useEffect(() => {
    setLoading(true);
    kycLevelService
      .getAllElements()
      .then(({ additionalInfo, ...res }) => setAllElements(res))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <CPLoading spinning={loading}>
      <CPLabel label="نام سطح" />
      <CPInput
        placeholder="نام سطح را وارد کنید"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <br />
      <CPLabel label="توضیحات سطح" />
      <CPInput
        placeholder="توضیحات سطح را وارد کنید"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <br />
      <CPLabel label="المان های سطح" />
      <div className={s.elementsContainer}>
        {Object.entries(allElements).map(([elm, title]) => (
          <CheckableTag
            checked={kycElements.has(elm)}
            onChange={checked =>
              setKycElements(prevState => {
                const cloneState = new Set(prevState);
                if (checked) {
                  cloneState.add(elm);
                } else {
                  cloneState.delete(elm);
                }
                return cloneState;
              })
            }
          >
            {title}
          </CheckableTag>
        ))}
      </div>
      <br />
      <div className={s.buttonsContainer}>
        <CPButton onClick={onCancel}>انصراف</CPButton>
        <CPButton
          disabled={!description || !kycElements.size || !name}
          type="primary"
          onClick={() =>
            onSubmit({ description, kycElements: [...kycElements], name })
          }
        >
          ثبت
        </CPButton>
      </div>
    </CPLoading>
  );
};

KycLevelForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};
KycLevelForm.defaultProps = {
  initialValues: { name: '', kycElements: [], description: '' },
  onSubmit: () => {},
  onCancel: () => {},
};

export default withStyles(s)(KycLevelForm);
