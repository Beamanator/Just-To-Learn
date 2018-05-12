import React, { Component } from 'react';
import axiosInstance from '../../../axios';

import Post from '../../../components/Post/Post';
// import { Link } from 'react-router-dom';

import './Posts.css';

class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount = () => {
        // console.log(this.props);

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
            console.log(error);
            // this.setState({error: true});
        });
    }

    postSelectedHandler = (id) => {
        // same options as on `Link` component inside `to` prop
        // often useful for using after a given operation finished (like
        //  an http request)
        // this.props.history.push({ pathname: '/' + id });
        this.props.history.push( '/' + id );
    }

    render() {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    // <Link to={'/' + post.id} key={post.id}>
                        <Post
                            key={post.id}
                            title={post.title}
                            author={post.author}
                            clicked={() => this.postSelectedHandler(post.id)}
                        />
                    // </Link>
                )
            });
        }
        return (
            <section className="Posts">
                {posts}
            </section>
        );
    }
}

export default Posts;