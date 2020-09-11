import React, { Component } from "react";
import { BrowserRouter, Route } from 'react-router-dom'
import { SearchPhoto } from "./Components/SearchPhoto";
import { ListPhoto } from "./Components/ListPhoto";

export default class Routes extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route path="/" Component={ListPhoto}></Route>
                <Route path="Search" Component={SearchPhoto}></Route>
            </BrowserRouter>
        )
    }
}