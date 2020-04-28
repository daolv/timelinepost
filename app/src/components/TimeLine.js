import React from 'react';
import PropTypes from 'prop-types';
import Post from '../widgets/Post';

export default function TimeLine(props) {
    return (
        <div>
            {props.posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
};

TimeLine.propTypes = {
    posts: PropTypes.array.isRequired
};