import styled from "styled-components";

const Layout = ({children}) => {
    return(
        <StLayout>{children}</StLayout>
    )
}

export default Layout;

const StLayout = styled.div`
    max-width: 95vw;
    max-height: 100%;
    min-height: 93vh;
    background-color: #d6f6f7;
    margin: 20px auto auto auto;
    overflow: auto;
`