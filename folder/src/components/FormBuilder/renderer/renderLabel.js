import React from 'react';
import { Form, Typography } from 'antd';
import Column from '../components/Column';

const { Item } = Form;
const { Text } = Typography;
export default function renderLabel(f) {
  const {
    field: {
      name,
      value = null,
      copyable = false,
      ellipsis = false,
      strong = false,
      label,
      config: { grid, visibile = true } = {},
    },
  } = f;
  return (
    <>
      {visibile && (
        <Column key={name} grid={grid}>
          <Item label={label} required={false}>
            <Text copyable={copyable} ellipsis={ellipsis} strong={strong}>
              {value}
            </Text>
          </Item>
        </Column>
      )}
    </>
  );
}
