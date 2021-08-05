import './style.css';

import { Component } from 'react';
import { loadposts } from '../../services/load-posts'
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

class Home extends Component {

  state = {
    counter: 0,
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2
  };

  async componentDidMount() {
    await this.loadposts();
  }

  loadposts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadposts();
    this.setState({ posts: postsAndPhotos.slice(page, postsPerPage), allPosts: postsAndPhotos });
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  }

  render() {

    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ?
      posts.filter(post => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
      : posts;

    return (
      <section className="container">

        <div className="search-container">
          
          {!!searchValue && (
            <>
              <h1>Search value: {searchValue}</h1>
            </>
          )}

          <TextInput
            handleChange={this.handleChange}
            searchValue={searchValue}
            type="search" /> <br /> <br />

        </div>


        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 && (
          <p>não existem posts :(</p>
        )}


        <div className="button-container">
          {!searchValue && (
            <Button
              text="Load More posts"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}

        </div>
      </section>
    );
  }
}

export default Home;