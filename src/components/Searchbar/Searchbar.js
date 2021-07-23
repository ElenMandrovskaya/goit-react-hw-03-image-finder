import PropTypes from "prop-types";
import { Header, SearchForm, SubmitBtn, BtnLabel, Input } from "./Searchbar.styled"

export function SearchBar({ onSearch }) {

  const handleSearch = event => {
    event.preventDefault();
    onSearch(event.target.elements.searchQuery.value);
  };

    return (
        <Header>
          <SearchForm
              onSubmit={handleSearch}>
                <SubmitBtn type="submit">
                    <BtnLabel>Search</BtnLabel>
                </SubmitBtn>
                <Input
                    name="searchQuery"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
          </SearchForm>
        </Header>
    );
}
SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};