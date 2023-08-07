import React from 'react';
import { IconCheck, Input, Label } from '../NoticesFilters.styled';
import icons from '../../../../images/icons/icons-card.svg';
const ElementFilter = ({ type, name, value, checked, onChange, isChecked }) => {
  const stringValue = isChecked?.age;
  const genderValue = isChecked?.gender;

  return (
    <>
      <Label>
        <Input
          type={type}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
        />
        {value}
        {stringValue === value || genderValue === value ? (
          <IconCheck width={16} height={16}>
            <use href={icons + '#check'}></use>
          </IconCheck>
        ) : null}
      </Label>
    </>
  );
};

export default ElementFilter;
