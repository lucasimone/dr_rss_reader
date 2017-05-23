import React from "react";

import styles from "../App.css"
const extraText = () => {
    return(
                <p>
                        Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor
                        incidunt ut labore et dolore magna aliqua.
                 </p>
  );
};

export const HeadLine = (props) => {
    return (

        <div className="">
            <div>
                <h1>D+Reader</h1>
                <p>A <strong>D</strong>jango+<strong>R</strong>eact RSS <strong>Reader</strong></p>
                {extraText()}
            </div>
        </div>
    );
};


