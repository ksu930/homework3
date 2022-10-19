import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Button from "../elements/Button";
import { __addTodo, __getTodos, __updateTodo } from "../redux/modules/todosSlice";
import { Link } from "react-router-dom";

const WriteTodo = () => {

    const {id} = useParams();
    const {todos} = useSelector((state) => state.todos)

    const todo = todos.find((a) => a.id===Number(id))
    const [newTodo, setNewTodo] = useState({
        "title": "",
        "body": "",
    })
    const [updateTodo, setUpdateTodo] = useState(todo)
    console.log(todos)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(__getTodos());
      }, [dispatch]);

    useEffect(() => {
    if(todos.length !== 0){
        const todo = todos.find((a) => a.id===Number(id))
        setUpdateTodo(todo)
    }
    // eslint-disable-next-line
    }, [todos]);  
 
    if(!id){
        const onChangeHandler = (e) => {
            const {name, value} = e.target;
            setNewTodo({
                ...newTodo, [name]:value,
            });
        };

        const onAddTodoHandler = (e) => {
            e.preventDefault()
            if(newTodo.title.trim()=== "" || newTodo.body.trim()==="" ){
                return alert("제목과 내용을 모두 입력해주세요.");
            }        
            dispatch(__addTodo(newTodo))
            setNewTodo({
                title:"",
                body:"",
            });
            navigate("/")
        };
        
        return (
            <Layout>
                <Header/>
                <Stcontainer  onSubmit={onAddTodoHandler}>
                    <StTitleBox>
                        <StTitleInput 
                        placeholder = "제목을 입력하세요"
                        name="title"
                        onChange={onChangeHandler}
                        value={newTodo.title}
                        />
                        <StButtos>
                            <StLink to={`/`} >
                                <Button bgColor="#a6dbba">취소</Button>
                            </StLink>
                            <Button bgColor="#e4d60f">완료</Button>
                        </StButtos>
                    </StTitleBox>
                    <StBody
                    placeholder = "내용을 입력하세요"
                    onChange={onChangeHandler}
                    name="body"
                    value={newTodo.body}
                    />
                </Stcontainer>
            </Layout>
        )
    } 
    
    else{
        console.log("아이디 있따")
        const onChangeHandler = (e) => {
            const {name, value} = e.target;
            setUpdateTodo({
                ...todo, [name]:value,
            });
        };
        const onUpdateTodoHandler = (e) => {
            e.preventDefault()
            if( updateTodo.body.trim()==="" ){
                return alert("내용을 입력해주세요.");
            }        
            dispatch(__updateTodo(updateTodo))
            navigate(`/detail/${id}`)
        };

        return(
            <Layout>
                <Header/>
                <Stcontainer onSubmit={onUpdateTodoHandler}>
                    <StTitleBox>
                        <StTitleDiv>{updateTodo?.title}</StTitleDiv>
                        <StButtos>
                            <StLink to={`/detail/${id}`} >
                                <Button bgColor="#a6dbba">취소</Button>
                            </StLink>
                            <Button  bgColor="#e4d60f">완료</Button>
                        </StButtos>
                    </StTitleBox>
                    <StBody
                    placeholder = "내용을 입력하세요"
                    onChange={onChangeHandler}
                    name="body"
                    value={updateTodo?.body}
                    />
                </Stcontainer>
            </Layout>
        )        
    }

}

export default WriteTodo;

const Stcontainer = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 85px 15px 0 15px;
`
const StTitleBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border: 1px solid black;
    padding: 10px;
`
const StTitleInput = styled.input`
    border: 1px solid black;
    width: 500px;
    font-size: 35px;
`
const StTitleDiv = styled.div`
    border: 1px solid black;
    width: 500px;
    font-size: 35px;
`
const StButtos = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;
`
const StBody = styled.textarea`
    height: 70vh;
    font-size: 20px;
`
const StLink = styled(Link)`
    text-decoration: none;
    font-size: 16px;
`

