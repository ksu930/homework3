import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "../elements/Button";
import { __getCommentsThunk, __updateComment } from "../redux/modules/commentsSlice";

const ShowInput = ({comment, setShowInput, postId}) => {
  const [newComment, setNewComment] = useState(comment)
  const dispatch = useDispatch();

  const onClick = () => {
    setShowInput(false)
  }
  const onChangeHandler = (e) => {
    const {name, value} = e.target;
    setNewComment({
        ...newComment, [name]:value,
    });
  };

const onUpdateCommentHandler = (e) => {
    e.preventDefault()
    if(newComment.comment.trim()=== ""){
        return alert("수정할 댓글 내용을 입력해주세요.");
    }        
    dispatch(__updateComment(newComment))
    dispatch(__getCommentsThunk())  
    setShowInput(false)
};
  return(
    <StComment>
      <StCommentName>{newComment.name}</StCommentName>
      <StCommentComment 
      onChange={onChangeHandler}
      value={newComment.comment}
      name="comment"
      />
      <StButtons>
          <Button size="small" bgColor="#a6dbba" onClick={onClick}>취소</Button>
          <Button 
          size="small" 
          bgColor="#e4d60f" 
          onClick={onUpdateCommentHandler}
          >
          댓글 수정
          </Button>
      </StButtons>
    </StComment>
    )
  }

export default ShowInput;

const StComment = styled.div`
    padding: 0px;
    border: 1px solid black;
    background-color: green;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    z-index: 5;
    position: absolute;
    width: 100%;
`

const StCommentName = styled.div`
  border: 1px solid black;
  margin: 5px;
`
const StCommentComment = styled.textarea`
  border: 1px solid black;
  margin: 5px;
  height: 30px;
`
const StButtons = styled.div`
  margin: 5px
`