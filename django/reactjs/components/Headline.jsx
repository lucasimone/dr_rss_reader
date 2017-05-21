import React from "react";

import styles from "../App.css"
const extraText = () => {
    return(
                <p>
                        Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor
                        incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid
                        ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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


