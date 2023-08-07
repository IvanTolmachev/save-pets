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
          <li key={filter.id}>
            {filter.age && (
              <SelectedBtn
                type="button"
                onClick={() => handleReset(filter, 'age')}
              >
                <SelectedLabel>{filter.age}</SelectedLabel>
                <Icon width={16} height={16}>
                  <use href={icons + '#check'}></use>
                </Icon>
              </SelectedBtn>
            )}
            {filter.gender && (
              <SelectedBtn
                type="button"
                onClick={() => handleReset(filter, 'gender')}
              >
                <SelectedLabel>{filter.gender}</SelectedLabel>
                <Icon width={16} height={16}>
                  <use href={icons + '#check'}></use>
                </Icon>
              </SelectedBtn>
            )}
          </li>
        ))}
      </FiltersList>
    </FiltersWrapper>
  );
};

export default SelectedFilters;