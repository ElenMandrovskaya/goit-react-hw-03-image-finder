import { Component } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
import { Container } from './App.styled';
import { SearchBar } from '../components/Searchbar/Searchbar';

export default class App extends Component {
  state = {
    searchQuery: null,
    images: [],
    status: 'idle',
  };

  handleNameChange = searchQuery => {
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
