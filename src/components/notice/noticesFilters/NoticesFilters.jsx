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
import icons from '../../../images/icons/icons-card.svg';

const NoticesFilters = ({ filterNoticeAge }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ageOpen, setAgeOpen] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);
  const [rotationAge, setRotationAge] = useState(0);
  const initialValues = {
    age: '',
  };

  const [checkedValues, setCheckedValues] = useState(initialValues);

  const handleCheckboxChangeInternal = (fieldName, newValue) => {
    setCheckedValues(prevCheckedValues => ({
      ...prevCheckedValues,
      [fieldName]: newValue,
    }));
    handleCheckboxChange(newValue);
  };

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

  const handleCheckboxChange = event => {
    filterNoticeAge(event);
  };

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
                      <Label>
                        <Input
                          type="checkbox"
                          name="age"
                          value="month"
                          checked={checkedValues.age === 'month'}
                          onChange={() => {
                            const newValue =
                              checkedValues.age === 'month' ? '' : 'month';
                            handleCheckboxChangeInternal('age', newValue);
                          }}
                        />
                        0-12 m
                      </Label>
                      <Label>
                        <Input
                          type="checkbox"
                          name="age"
                          value="year"
                          checked={values.age === 'year'}
                          onChange={() => {
                            const newValue =
                              values.age === 'year' ? '' : 'year';
                            setFieldValue('age', newValue);
                            handleCheckboxChange(newValue); // Передаємо дані у функцію
                          }}
                        />
                        1 year
                      </Label>
                      <Label>
                        <Input
                          type="checkbox"
                          name="age"
                          checked={values.age === '2years'}
                          value="2years"
                          onChange={() => {
                            const newValue =
                              values.age === '2years' ? '' : '2years';
                            setFieldValue('age', newValue);
                            handleCheckboxChange(newValue); // Передаємо дані у функцію
                          }}
                        />
                        2 years
                      </Label>
                      <Label>
                        <Input
                          type="checkbox"
                          name="age"
                          checked={values.age === '3years'}
                          value="3years"
                          onChange={() => {
                            const newValue =
                              values.age === '3years' ? '' : '3years';
                            setFieldValue('age', newValue);
                            handleCheckboxChange(newValue); // Передаємо дані у функцію
                          }}
                        />
                        3 years +
                      </Label>
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
                      <Label>
                        <Input
                          onChange={() => {
                            const newValue =
                              values.gender === 'male' ? '' : 'male';
                            setFieldValue('gender', newValue);
                            handleCheckboxChange(newValue); // Передаємо дані у функцію
                          }}
                          checked={values.gender === 'male'}
                          type="checkbox"
                          name="gender"
                          value="male"
                        />
                        male
                      </Label>
                      <Label>
                        <Input
                          onChange={() => {
                            const newValue =
                              values.gender === 'female' ? '' : 'female';
                            setFieldValue('gender', newValue);
                            handleCheckboxChange(newValue); // Передаємо дані у функцію
                          }}
                          checked={values.gender === 'female'}
                          type="checkbox"
                          name="gender"
                          value="female"
                        />
                        female
                      </Label>
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
