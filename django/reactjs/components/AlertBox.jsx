import React from "react";
import { Alert } from "react-bootstrap";

export const AlertBox = (props) => {
    return(
        <Alert bsStyle={props.type}>
            <strong>{props.title}</strong> {props.msg}.
        </Alert>
    );

};