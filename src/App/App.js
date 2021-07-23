import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchImages } from '../services/api';
import { Container } from './App.styled';
import { SearchBar } from '../components/Searchbar/Searchbar';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
import { Modal } from '../components/Modal/Modal';

export default class App extends Component {
  state = {
    searchQuery: null,
    images: [],
    status: 'idle',
    page: 1,
    showModal: false,
  };
  async componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      const images = await fetchImages(this.state.searchQuery);
      this.setState({ images });
    }
  };

  handleNameChange = searchQuery => {
    if (searchQuery.trim() === "") {
      toast.info('Please, enter query!');
        return;
        }
    this.setState({ searchQuery });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal
    }))
  };

  render() {
    return (
      <Container>
        <SearchBar onSearch={this.handleNameChange} />
        <ImageGallery images={this.state.images}/>
        <Modal/>
        <ToastContainer />
      </Container>
    );
  }
  
}
