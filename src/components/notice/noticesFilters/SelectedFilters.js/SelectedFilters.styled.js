import styled from 'styled-components';
import variables from 'settings/variables';

export const FiltersWrapper = styled.div`
  ${variables.breakPoints.onlyMobile} {
    margin-top: 80px;
    max-width: 140px;
  }
  ${variables.breakPoints.desktop} {
    justify-items: flex-start;
    justify-self: flex-start;
  }
`;

export const FiltersList = styled.ul`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
  list-style: none;
  ${variables.breakPoints.tablet} {
    width: 100%;
    max-width: 100%;
  }
`;

export const SelectedBtn = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  background: #ffffff;
  box-shadow: 3px 8px 14px rgba(136, 198, 253, 0.19);
`;

export const SelectedLabel = styled.span`
  font-family: 'Inter';
  font-size: 12px;
  line-height: 14px;
  color: var(--main-acc);
`;
export const Icon = styled.svg`
  stroke: var(--main-acc);
  transition: var(--timing);

  &:hover,
  &:focus {
    transform: scale(1.2);
    stroke: var(--header-acc);
  }
`;

// @media screen and (min-width: 768px) {
//     .filtersList {

//     }
// }
