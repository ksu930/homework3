import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "../elements/Button";
import { __deleteComment } from "../redux/modules/commentsSlice";
import ShowInput from "./ShowInput";

const Comment = ({comment, postId}) => {
    console.log("comment 버블링")
    const dispatch = useDispatch();
    const [showInput, setShowInput] = useState(false)

    const onDeleteButtonHandler = (id) => {
        dispatch(__deleteComment(id));
        }
       
    const onClick = () => {
        setShowInput(true)
    } 

    return(
    <StComment key={comment.id}>
        <StCommentName>{comment.name}</StCommentName>
        <StCommentBody>{comment.comment}</StCommentBody>
        { showInput ? <ShowInput comment={comment} setShowInput={setShowInput} postId={postId} /> : null }
        <StButtons>
            <Button
            size="small"
            bgColor="#a6dbba"
            onClick={() => onClick(comment.id)}
            >
            댓글 수정
            </Button>
            <Button
            onClick={() =>onDeleteButtonHandler(comment.id)}
            size="small" 
            bgColor="#e4d60f"
            >
            댓글 삭제
            </Button>
        </StButtons>
    </StComment>
    )
}
export default Comment

const StComment = styled.div`
    padding: 0;
    border: 1px solid black;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    width: 100%;
    overflow: hidden;
`
const StCommentName = styled.div`
    border: 1px solid black;
    margin: 5px;
`
const StCommentBody = styled.div`
    border: 1px solid black;    
    margin: 5px;
`
const StButtons = styled.div`
    margin: 5px;
`