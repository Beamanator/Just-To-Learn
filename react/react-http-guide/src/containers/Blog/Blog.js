import React, { Component } from 'react';
// import axios from 'axios';
import axiosInstance from '../../axios';

import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostID: null,
        error: false
    }

    componentDidMount = () => {
        axiosInstance.get('/posts')
        .then(response => {
            // only store 4 posts for now
            const posts = response.data.slice(0, 4);
            
            // transform data -> ex: add author
            const updatedPosts = posts.map(post => {
                return {
                    ...post,
                    author: 'Max'
                }
            });
            // add posts to state
            this.setState({
                posts: updatedPosts
            });
        })
        .catch(error => {
            // console.log(error);
            this.setState({error: true});
        });
    }

    postSelectedHandler = (id) => {
        this.setState({
            selectedPostID: id
        });
    }
    
    render () {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)}
                    />
                )
            });
        }

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/new-post">New Post</a></li>
                        </ul>
                    </nav>
                </header>
                <section className="Posts">
                    {posts}
                </section>
            </div>
        );
    }
}

export default Blog;