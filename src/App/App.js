import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchImages } from '../services/api';
import { Container } from './App.styled';
import { SearchBar } from '../components/Searchbar/Searchbar';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
// import { Modal } from '../components/Modal/Modal';
// import { Spinner } from '../components/Loader/Spinner';
import { LoadBtn } from '../components/Button/Button'

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
      try {
        this.setState({ status: 'pending' });
        const images = await fetchImages(
          this.state.searchQuery,
          this.state.page,
        );
        this.setState({ images, status: 'resolved' });
      } catch (error) {
        this.setState({ status: 'rejected' });
        toast.error('Error');
      }
    } else if (prevState.page !== this.state.page) {
      try {
        this.setState({ status: 'pending' });
        const images = await fetchImages(
          this.state.searchQuery,
          this.state.page,
        );

        this.setState({
          images: [...this.state.images, ...images],
          status: 'resolved',
        });
        // this.scrollOnLoadMore();
      } catch (error) {
        this.setState({ status: 'rejected' });
        toast.error('Error');
      }
    }
  }

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

  incrementPage = () => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    return (
      <Container>
        <SearchBar onSearch={this.handleNameChange} />
        <ImageGallery images={this.state.images}/>
        {/* <Modal/> */}
        {/* <Spinner/> */}
        <LoadBtn onClick={this.incrementPage}/>
        <ToastContainer />
      </Container>
    );
  }
  
}
