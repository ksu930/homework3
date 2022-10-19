import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../elements/Button";

const Header = () =>{
    return (
        <StContainer>
            <div>
                <StLink to={`/`} >
                    <StTag>Home</StTag>
                </StLink>
            </div>
            <div>
                <StLink to={`/write`}>
                    <Button bgColor="#d6d593" size="medium" margin="0 10px 0 0">글쓰기</Button>
                </StLink>
            </div>
        </StContainer>
    )
}

export default Header;

const StContainer = styled.div`
    height: 70px;
    width: 95vw;
    border: 0px solid gray;
    background-color: #eba881;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    font-weight: bolder;
`
const StLink = styled(Link)`
    text-decoration: none;
    font-size: 16px;
`
const StTag = styled.div`
    font-size: 25px;
    margin-bottom: 5px;
    margin-left: 15px;
`
