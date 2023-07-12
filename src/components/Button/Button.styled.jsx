import styled from 'styled-components';

export const BtnElement = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 12px 16px;
  border: none;
  font-size: 16px;
  background-color: ${props =>
    props.status === 'search'
      ? 'transparent'
      : props.status === 'load'
      ? 'rgba(154, 205, 50, 1)'
      : 'grey'};
  color: hsla(0, 0%, 100%, 1);
  transform: scale(1);

  &:hover,
  &:focus {
    transform: ${props =>
    props.status === 'search'
      ? 'scale(1.5)'
      : props.status === 'load'
      ? 'scale(1.2)'
      : 'scale(1)'};
  }

  & > svg {
    margin-right: 8px;
  }
`;
