import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { __getCommentsThunk } from "../redux/modules/commentsSlice";

const CommentsNumber = (todoId) =>{
    const {comments} = useSelector(state => state.comments)
    const dispatch = useDispatch();

    useEffect (() => {
        dispatch(__getCommentsThunk());
      }, [dispatch]);

    const thisComments = comments.filter(comment => todoId === comment.postId)
    console.log(thisComments)
    // const number = thisComments.length
    return(
        <div>1</div>
    )
}

export default CommentsNumber