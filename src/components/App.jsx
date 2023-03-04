import { Component } from 'react';

import toast, { Toaster } from 'react-hot-toast';

import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Container/Container';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    searchQuery: '',
  };

  handleSubmit = searchQuery => {
    if (!searchQuery) {
      toast.error('Please, enter some text', {
        position: 'top-right',
        duration: 2000,
      });
      return;
    }

    this.setState({ searchQuery });
  };

  render() {
    return (
      <>
        <GlobalStyle />
        <Layout>
          <Toaster />
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery searchQuery={this.state.searchQuery} />
        </Layout>
      </>
    );
  }
}
