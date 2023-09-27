import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import InlineEdit from '@atlaskit/inline-edit';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './SmartFormPreviewer.scss';
import { updatePipelineStartForm } from '../../../../service/pipelineManagementService';
import { StringUtils } from '../../../../utils/stringUtils';
import InputWrapper from '../../widgets/InputWrapper/InputWrapper';
import SmartFormGenerator from '../SmartFormGenerator/SmartFormGenerator';
import OpenBox from '../../icons/openBox';

function FormPreviewer({
  fields,
  removeField,
  moveField,
  pipeId,
  canEditTitle,
  title,
  id,
  getStartForm,
  readOnly,
}) {
  const updateFormTitle = async value => {
    if (StringUtils.isItFilled(value)) {
      const response = await updatePipelineStartForm({
        id,
        title: value,
      });
      if (response) {
        getStartForm(pipeId);
      }
    }
  };

  const formTitle = useMemo(() => {
    if (canEditTitle) {
      return (
        <InlineEdit
          defaultValue={title}
          editView={fieldProps => <InputWrapper {...fieldProps} autoFocus />}
          readView={() => (
            <div className={styles.emptyPartHeader}>
              <span>{title}</span>
            </div>
          )}
          onConfirm={value => updateFormTitle(value)}
        />
      );
    }
    return <div className={styles.emptyPartHeader}>{title}</div>;
  }, [canEditTitle, title]);

  return (
    <div className={styles.fieldsWrapper}>
      <div className={styles.emptyPartContainer}>
        <div className={styles.headerWrapper}>{formTitle}</div>
        <div className={styles.emptyPartDesc}>
          این یک پیش ‌نمایش از فرمی‌ است که شما در حال ساختن آن هستید.
        </div>
        {!(fields.length > 0) && (
          <div className={styles.centerPart}>
            <OpenBox />
            <div className={styles.centerPartDesc}>
              با استفاده از کشیدن و انداختن فیلدها و یا کلیک کردن روی آن‌ها،
              شروع به ساختن یه فرم کنید.
            </div>
          </div>
        )}
        <div className={styles.formFieldsContainer}>
          {' '}
          <SmartFormGenerator
            removeField={removeField}
            moveField={moveField}
            showFieldAction
            fields={fields}
            readOnly={readOnly}
          />
        </div>
      </div>
    </div>
  );
}

FormPreviewer.propTypes = {
  fields: PropTypes.array,
  removeField: PropTypes.func,
  moveField: PropTypes.func,
  pipeId: PropTypes.string.isRequired,
  canEditTitle: PropTypes.bool,
  title: PropTypes.string,
  id: PropTypes.string.isRequired,
  getStartForm: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired,
};
FormPreviewer.defaultProps = {
  fields: [],
  canEditTitle: false,
  title: '',
  removeField: () => {},
  moveField: () => {},
};

export default withStyles(styles)(FormPreviewer);
