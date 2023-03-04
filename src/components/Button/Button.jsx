import PropTypes from 'prop-types';
import { LoadMoreBtnBox, LoadMoreBtn } from './Button.styled';

export const Button = ({ onClick }) => {
  return (
    <LoadMoreBtnBox>
      <LoadMoreBtn type="button" onClick={onClick}>
        Load more
      </LoadMoreBtn>
    </LoadMoreBtnBox>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
