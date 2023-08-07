import React, { useEffect, useRef, useState } from 'react';
import { Formik } from 'formik';

import {
  Wrapper,
  BtnToOpen,
  DropdownWrapper,
  Text,
  Icon,
  SubMenu,
  BtnFilter,
  Label,
  Forma,
  Input,
  BtnLabel,
  BtnOpenTitle,
} from './NoticesFilters.styled';

import { v4 as uuidv4 } from 'uuid';
import icons from '../../../images/icons/icons-card.svg';
import ElementFilter from './ElementFilter/ElementFilter';

const NoticesFilters = ({ filterNoticeAge, getFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ageOpen, setAgeOpen] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);
  const [rotationAge, setRotationAge] = useState(0);
  const initialValues = {
    age: '',
    gender: '',
  };

  const [checkedValues, setCheckedValues] = useState(initialValues);

  // ... ваш код ...
  const handleCheckboxChangeInternal = (fieldName, newValue) => {
    setCheckedValues(prevCheckedValues => ({
      ...prevCheckedValues,
      [fieldName]: newValue,
    }));

    filterNoticeAge(newValue);
  };

  useEffect(() => {
    const filtersArray = Object.entries(checkedValues).map(([key, value]) => ({
      id: uuidv4(),
      [key]: value,
    }));
    getFilters(filtersArray);
  }, [checkedValues]);

  const [rotationGender, setRotationGender] = useState(0);
  const handleBtnClick = () => {
    setRotationAge(0);
    setRotationGender(0);
    setAgeOpen(false);
    setGenderOpen(false);
    setIsOpen(!isOpen);
  };

  const handleAgeClick = () => {
    setRotationAge(rotationAge => rotationAge + 180);
    setAgeOpen(!ageOpen);
  };

  const handleGenderClick = () => {
    setRotationGender(rotationGender => rotationGender + 180);
    setGenderOpen(!genderOpen);
  };

  const dropdownRef = useRef();

  const handleOutsideClick = event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <Wrapper ref={dropdownRef}>
      <BtnToOpen
        type="button"
        onClick={handleBtnClick}
        aria-label="toggle filters"
        data-isopen={isOpen}
      >
        <BtnOpenTitle data-isopen={isOpen}>Filter</BtnOpenTitle>
        <Icon width={24} height={24}>
          <use href={icons + '#filters'}></use>
        </Icon>
      </BtnToOpen>
      {isOpen && (
        <DropdownWrapper>
          <div>
            <Text>Filters</Text>
            <SubMenu data-ageopen={ageOpen}>
              <BtnFilter
                type="button"
                onClick={handleAgeClick}
                aria-label="toggle age options"
              >
                <Icon
                  width={24}
                  height={24}
                  style={{ transform: `rotate(${rotationAge}deg)` }}
                >
                  <use href={icons + '#chevron-down'}></use>
                </Icon>
                <BtnLabel>By age</BtnLabel>
              </BtnFilter>
              {ageOpen && (
                <Formik initialValues={{ age: '' }}>
                  {({ values, setFieldValue }) => (
                    <Forma>
                      <ElementFilter
                        type="checkbox"
                        name="age"
                        value="0-12 m"
                        isChecked={checkedValues}
                        checked={checkedValues.age === '0-12 m'}
                        onChange={() => {
                          const newValue =
                            checkedValues.age === '0-12 m' ? '' : '0-12 m';
                          handleCheckboxChangeInternal('age', newValue);
                        }}
                      />
                      <ElementFilter
                        type="checkbox"
                        name="age"
                        value="1 year"
                        isChecked={checkedValues}
                        checked={checkedValues.age === '1 year'}
                        onChange={() => {
                          const newValue =
                            checkedValues.age === '1 year' ? '' : '1 year';
                          handleCheckboxChangeInternal('age', newValue);
                        }}
                      />
                      <ElementFilter
                        type="checkbox"
                        name="age"
                        value="2 years"
                        isChecked={checkedValues}
                        checked={checkedValues.age === '2 years'}
                        onChange={() => {
                          const newValue =
                            checkedValues.age === '2 years' ? '' : '2 years';
                          handleCheckboxChangeInternal('age', newValue);
                        }}
                      />
                      <ElementFilter
                        type="checkbox"
                        name="age"
                        value="3 years+"
                        isChecked={checkedValues}
                        checked={checkedValues.age === '3 years+'}
                        onChange={() => {
                          const newValue =
                            checkedValues.age === '3 years+' ? '' : '3 years+';
                          handleCheckboxChangeInternal('age', newValue);
                        }}
                      />
                    </Forma>
                  )}
                </Formik>
              )}
            </SubMenu>
            <SubMenu data-genderopen={genderOpen}>
              <BtnFilter
                type="button"
                onClick={handleGenderClick}
                aria-label="toggle gender options"
              >
                <Icon
                  width={24}
                  height={24}
                  style={{ transform: `rotate(${rotationGender}deg)` }}
                >
                  <use href={icons + '#chevron-down'}></use>
                </Icon>
                <BtnLabel>By gender</BtnLabel>
              </BtnFilter>
              {genderOpen && (
                <Formik initialValues={{ gender: '' }}>
                  {({ values, setFieldValue }) => (
                    <Forma>
                      <ElementFilter
                        type="checkbox"
                        name="gender"
                        value="male"
                        isChecked={checkedValues}
                        checked={checkedValues.gender === 'male'}
                        onChange={() => {
                          const newValue =
                            checkedValues.gender === 'male' ? '' : 'male';
                          handleCheckboxChangeInternal('gender', newValue);
                        }}
                      />
                      <ElementFilter
                        type="checkbox"
                        name="gender"
                        value="female"
                        isChecked={checkedValues}
                        checked={checkedValues.gender === 'female'}
                        onChange={() => {
                          const newValue =
                            checkedValues.gender === 'female' ? '' : 'female';
                          handleCheckboxChangeInternal('gender', newValue);
                        }}
                      />
                    </Forma>
                  )}
                </Formik>
              )}
            </SubMenu>
          </div>
        </DropdownWrapper>
      )}
    </Wrapper>
  );
};

export default NoticesFilters;
