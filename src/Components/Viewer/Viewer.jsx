import React, { Component } from 'react';
import './Viewer.css';

export default class Viewer extends Component {
    constructor(props) {
        super(props);
        $.ajax({
            url: "https://lementtest2.lement.pro:443/authentication/v1/authenticate",
            method: "POST",
            crossOrigin: true,      
            data: `client_id=7CMZFMmL22BaEhZSp0Uel052iL5aussd` + 
                `&client_secret=RnRA7ThEt0DGPAsK` + 
                `&grant_type=client_credentials` + 
                `&scope=viewables:read%20data:read`
        }).done(function(response){
            debugger;
            token = response;
        })
    }

    render() {
        return (
            <div id="viewer-div"></div>
        );
    }
}