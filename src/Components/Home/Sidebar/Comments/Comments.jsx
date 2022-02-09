import React from 'react';
import AddComments from './AddComments';
import CommentList from './CommentsList';


const Comments = () => {

    return (
        <div style={{backgroundColor:'#fee8d9'}}>
           <AddComments/>
           <CommentList/>
        </div>
    );
};

export default Comments;