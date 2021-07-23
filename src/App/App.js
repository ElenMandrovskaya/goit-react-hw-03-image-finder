import { Component } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
import { fetchImages } from '../services/api';
import { Container } from './App.styled';
import { SearchBar } from '../components/Searchbar/Searchbar';

export default class App extends Component {
  state = {
    searchQuery: null,
    images: [],
    status: 'idle',
  };
  async componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      const countries = await fetchImages(this.state.searchQuery);
      this.setState({ countries });
    };
  }
  handleNameChange = searchQuery => {
    if (searchQuery.trim() === "") {
        alert('enter query')
        return;
        }
    this.setState({ searchQuery });
  };

  render() {
    return (
      <Container>
        <SearchBar onSearch={this.handleNameChange} />
        
        {/* <ToastContainer position="top-right" /> */}
      </Container>
    );
  }
  
}
