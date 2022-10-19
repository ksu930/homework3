import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Comments from "../components/Comments";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Button from "../elements/Button";
import { __deleteTodo, __getTodos } from "../redux/modules/todosSlice";

const Detail = () => {
    console.log("detail 버블링")
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {id} = useParams();
    let todoId = Number(id);
 
    const {todos} = useSelector(state => state.todos)
    const todo = todos.find(element => element.id===todoId)  
    const onDeleteHandler = (todoId) => {
        dispatch(__deleteTodo (todoId));
        navigate("/")
      };

      useEffect(() => {
        dispatch(__getTodos ());
      }, [dispatch]);
   
    return(
        <Layout>
            <Header />
            <StContainer>
                    <StTodoTitleBox>
                        <StTodoTitle>{todo?.title}</StTodoTitle>
                        <StTodoTitleButtons>
                            <StLink to={`/write/${todo?.id}`}>
                                <Button 
                                bgColor="#a6dbba" 
                                size="large" 
                                margin="0 10px 0 0"
                                >
                                    게시글 수정
                                </Button>
                            </StLink>
                                <Button 
                                bgColor="#e4d60f" 
                                size="large" 
                                onClick={()=>onDeleteHandler(todo?.id)}>
                                    게시글 삭제
                                </Button>
                        </StTodoTitleButtons>
                    </StTodoTitleBox>
                    <StTodoBodyBox>
                        {todo?.body}
                    </StTodoBodyBox>  
                <Comments postId={todoId}>
                </Comments>
            </StContainer>
        </Layout>
    )
}

export default Detail;

const StContainer = styled.div`
    margin: 85px 15px 0 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
// const StTodoBox = styled.div`
//     width: 92vw;
//     margin: auto;
// `
const StTodoTitleBox = styled.div`
    border: 1px solid black;
    padding: 10px 20px 10px 20px; 
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #FDF5E6	;
`
const StTodoTitle = styled.div`
    margin: auto 0;
    font-size: 35px;
    font-weight: bolder;
`
const StTodoTitleButtons = styled.div`
    
`
const StLink = styled(Link)`
    text-decoration: none;
    font-size: 16px;
`
const StTodoBodyBox = styled.div`
    height : 20vh;
    border: 1px solid black;
    border-top: 0px;
    padding: 40px 20px 10px 20px; 
    background-color: #FDF5E6	;
    font-size: 25px;
`