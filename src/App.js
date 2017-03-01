import React, {Component} from "react";

import "./App.css";

class App extends Component {

    render() {
        return (
            <div className="kyf-root">
                <h1 className="kyf-header">
                    Know-Your-Food
                </h1>

                {this.props.children}

            </div>

        );
    }
}

export default App;
