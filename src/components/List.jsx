import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getTodos } from "../redux/modules/todosSlice";
import {FaRegCommentDots} from "react-icons/fa"
import { useNavigate } from "react-router-dom";


const List = () =>{
    const dispatch = useDispatch();
    const { isLoading, error, todos } = useSelector((state) => state.todos);

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(__getTodos());
      }, [dispatch]);

    if (isLoading) {
    return <div>Todo List를 불러오는 중입니다!</div>;
    }

    if (error) {
    return <div>{error.message}</div>;
    } 

      return (
        <StContainer>
            <StListWrapper>
                {todos.map((todo) => (
                    <StTodoContainer
                        key={todo.id}
                        onClick={()=>{navigate(`/detail/${todo.id}`)}}>
                        <StTodoTitle>{todo.title}</StTodoTitle>
                        <StTodoBody>{todo.body}</StTodoBody>
                        <Stdiv></Stdiv>
                        <StTodoFooter>
                            <FaRegCommentDots size="20"/>
                            <StCommentsnum>댓글개수</StCommentsnum>
                            {/* <CommentsNumber todoId={todo.id}/> */}
                        </StTodoFooter>
                    </StTodoContainer>
                ))}
            </StListWrapper>
        </StContainer>
    )
}

export default List;

const StContainer = styled.div`
    padding: 24px 24px; 
    margin-top: 70px;
`
const StListWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
`
const StTodoContainer = styled.div`
    width: 270px;
    border: none;
    min-height: 150px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
`
const StTodoTitle = styled.div`
    border: none;
    background-color: grey;
    border-radius: 7px 7px 0 0;
    padding: 10px 10px 10px 10px;
    font-size: 20px;
`
const StTodoBody = styled.div`
    background-color: white;
    height: 20px;
    padding: 35px 10px 10px 10px;
    font-size: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`
const StTodoFooter = styled.div`
    display: flex;
    justify-content: end;
    background-color: teal;
    border-radius: 0 0 7px 7px;
    padding: 3px 10px 3px 10px;
    font-size: 12px;
    gap: 10px;
`
const StCommentsnum = styled.div`
    padding: 3px 0 3px 0;
`
const Stdiv = styled.div`
    height: 100%;
    background-color: white;
`