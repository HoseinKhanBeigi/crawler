import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Select from '@atlaskit/select';
import { ObjectUtils } from '../../../../utils/objectUtils';

function SelectPhaseItem({ items, selectedId, onChange, className }) {
  const [item, setItem] = useState();

  const phaseOptions = useMemo(
    () =>
      items.map(phase => ({
        label: phase.name,
        value: phase.id,
      })),
    [items],
  );

  useEffect(() => {
    const selectedOption = phaseOptions.find(
      phaseOption => phaseOption.value === selectedId,
    );
    if (ObjectUtils.checkIfItsFilled(selectedOption)) {
      setItem(selectedOption);
    } else {
      setItem({
        value: items[0].id,
        label: items[0].name,
      });
    }
  }, [selectedId]);

  function selectPhaseOnchange(selected) {
    setItem(selected);
    onChange(selected?.value);
  }

  return (
    <div className={className}>
      <Select
        inputId="grouped-options-example"
        className="single-select"
        classNamePrefix="react-select"
        options={phaseOptions}
        value={item}
        onChange={selectPhaseOnchange}
      />
    </div>
  );
}

SelectPhaseItem.propTypes = {
  items: PropTypes.array.isRequired,
  selectedId: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

SelectPhaseItem.defaultProps = {
  className: '',
  selectedId: '',
};

export default SelectPhaseItem;
