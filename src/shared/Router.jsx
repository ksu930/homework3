import { BrowserRouter, Route, Routes } from "react-router-dom"
import Detail from "../pages/Detail"
import Home from "../pages/Home"
import WriteTodo from "../pages/WriteTodo"

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/detail/:id" element={<Detail/>} />
                <Route path="/write/:id" element={<WriteTodo/>} />
                <Route path="/write" element={<WriteTodo/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;