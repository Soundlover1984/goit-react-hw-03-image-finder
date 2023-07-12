import PropTypes from 'prop-types';
import { BtnElement } from './Button.styled';

export const Btn = ({
  text,
  status,
  icon: Icon = null,
  disabled = false,
  type = 'button',
  onClick = null,
}) => {
  return (
    <BtnElement
      status={status}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {Icon && <Icon></Icon>}
      {text}
    </BtnElement>
  );
};

Btn.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.any,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  status: PropTypes.string,
  onClick: PropTypes.func,
};
