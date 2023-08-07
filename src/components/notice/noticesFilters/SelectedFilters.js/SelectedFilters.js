import {
  FiltersList,
  FiltersWrapper,
  SelectedBtn,
  SelectedLabel,
  Icon,
} from './SelectedFilters.styled';
import icons from '../../../../images/icons/icons-card.svg';

const SelectedFilters = ({ filters, handleReset }) => {
  return (
    <FiltersWrapper>
      <FiltersList>
        {filters.map(filter => (
          <li key={filter}>
            <SelectedBtn type="button" onClick={() => handleReset(filter)}>
              <SelectedLabel>{filter}</SelectedLabel>
              <Icon width={16} height={16}>
                <use href={icons + '#check'}></use>
              </Icon>
            </SelectedBtn>
          </li>
        ))}
      </FiltersList>
    </FiltersWrapper>
  );
};

export default SelectedFilters;
