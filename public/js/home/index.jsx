//
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
// import $ from 'jquery';
// import React from 'react';
// import ReactDOM from 'react-dom';

var LikeButton = React.createClass({
    getInitialState: function() {
        return {liked: false};
    },
    handleClick: function(event) {
        this.setState({liked: !this.state.liked});
    },
    render: function() {
        var text = this.state.liked ? 'like' : 'haven\'t liked';
        return (
            <p onClick={ this.handleClick }>
                You {text} this. Click to toggle.
            </p>
        );
    }
});

ReactDOM.render(
    <LikeButton />,
    $("#react")[0]
    // document.getElementById('react')
);
//
// var swiperDom = React.createClass({
//     render: function(){
//         return (
//             <div className='swiper'>
//                 Hello,world! I am Piny.
//             </div>
//         )
//     }
// });
//
// ReactDOM.render(
//     <div className='swiper'>
//         Hello,world! I am Piny.
//     </div>,
//     $('#react')[0]
// );
