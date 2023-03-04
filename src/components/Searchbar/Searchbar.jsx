import { Formik } from 'formik';

import {
  Header,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (values, actions) => {
    onSubmit(values.searchQuery);
    actions.resetForm();
  };

  return (
    <Header>
      <Formik initialValues={{ searchQuery: '' }} onSubmit={handleSubmit}>
        <SearchForm>
          <SearchFormBtn type="submit">
            <span></span>
          </SearchFormBtn>

          <SearchFormInput
            name="searchQuery"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Formik>
    </Header>
  );
};
