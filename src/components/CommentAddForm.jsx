import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components"
import Button from "../elements/Button"
import { __addComment } from "../redux/modules/commentsSlice";

const CommentAddForm = ({postId}) => {
    const dispatch = useDispatch();
    const [comment, setComment] = useState({
        postId: postId,
        name:"",
        comment:"",
    });

    const onChangeHandler = (e) => {
        const {name, value} = e.target;
        setComment({
            ...comment, [name]:value,
        });
    };

    const onAddCommentHandler = (e) => {
        e.preventDefault()
        if(comment.name.trim()=== "" || comment.comment.trim()==="" ){
            return alert("이름과 댓글을 모두 입력해주세요.");
        }        
        dispatch(__addComment(comment))
        setComment({
            postId: postId,
            name:"",
            comment:"",
        });
    };

    return(
    <StInputForm onSubmit={onAddCommentHandler}>
        <StNameInput
        placeholder="이름을 입력하세요(5자 이내)"
        value={comment.name}
        name="name"
        onChange={onChangeHandler}
        type="text"
        maxLength={5}
        />
        <StCommentInput
        placeholder="댓글을 입력하세요(50자 이내)"
        value={comment.comment}
        name="comment"
        onChange={onChangeHandler}
        type="text"
        maxLength={50}
        />
        <Button bgColor="#d6d593">댓글 작성</Button>
    </StInputForm>
    )
}

export default CommentAddForm

const StInputForm = styled.form`
    border: 1px solid black;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 5px 5px 5px 5px;
`
const StNameInput = styled.input`
`
const StCommentInput = styled.input`
`