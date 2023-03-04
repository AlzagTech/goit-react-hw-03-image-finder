import {
  ErrorMessageBox,
  ErrorMessageImg,
  ErrorMessageText,
} from './ErrorMessage.styled';

export const ErrorMessage = () => {
  return (
    <ErrorMessageBox>
      <ErrorMessageImg
        src="https://i.ibb.co/HBqXvJK/search-no-results-found-concept-illustration-flat-design-eps10-simple-modern-graphic-element-for-lan.webp"
        alt="Error"
        width={400}
      />
      <ErrorMessageText>Oops, no results found...</ErrorMessageText>
    </ErrorMessageBox>
  );
};
