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
    selectedImage: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ status: "pending" });
          try {
            const images = await fetchImages(searchQuery, page);
            if (!images.length) {
                throw new Error();
              }
         this.setState((prevState) => ({
          images: [...prevState.images, ...images],
          status: "resolved",
        }));
      } catch (err) {
        this.setState({ status: "idle" });
        toast.error(`Not Found ${searchQuery}`);
      }

      page > 1 &&
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
    }
  };
  
  reset = () => {
    this.setState({
      searchQuery: "",
      page: 1,
      images: [],
      selectedImage: null,
      status: "idle",
    });
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
