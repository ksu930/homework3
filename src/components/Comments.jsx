import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getCommentsThunk } from "../redux/modules/commentsSlice";
import Comment from "./Comment";
import CommentAddForm from "./CommentAddForm";


const Comments = ({postId}) => {
    console.log("comments 버블링")
    const dispatch = useDispatch();
    const {comments} = useSelector((state) => state.comments);

    const todoComments = comments.filter((comment) =>
    comment.postId === postId
    );

    useEffect(() => {
        dispatch(__getCommentsThunk());
      }, [dispatch]);

    return (
        <StCommentContainer>
            <CommentAddForm postId={postId}></CommentAddForm>
            <StCommentBox>
                    {todoComments.map((comment)=> {
                        return(
                        <Comment key={comment.id} comment={comment} postId={postId} />
                        )
                    })}               
            </StCommentBox>
       </StCommentContainer>
    )
}

export default Comments;

const StCommentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const StCommentBox = styled.div`
    height: 45vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: scroll;
`