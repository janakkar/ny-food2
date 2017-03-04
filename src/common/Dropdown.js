import React, {Component} from "react";
import "./Dropdown.css";

const getItemName = (idPropertyName, item) => {
    return idPropertyName ? item.get(idPropertyName) : item;
};

export class Dropdown extends Component {

    constructor(props) {
        super(props);
        this.state = {showList: false};
        this.showList = this.showList.bind(this);
        this.hideList = this.hideList.bind(this);
    }

    onSelectionChange(event, item) {
        event.preventDefault();
        this.props.onSelectItem(item);
    }

    showList() {
        this.setState({showList: true});
    }

    hideList() {
        this.setState({showList: false});
    }

    render() {
        let listOfItems;
        if (this.state.showList) {
            listOfItems = this.props.listItems.map(item =>
                <li key={item}>
                    <a onClick={(event) => this.onSelectionChange(event, item)}>
                        <span>{getItemName(this.props.idPropertyName, item)}</span>
                    </a>
                </li>);
        }

        return (
            <div className="nyf-dropdown" onMouseLeave={this.hideList}>
                <div className="nyf-dropdown-list">
                    <input readOnly="true" type="text"
                           value={getItemName(this.props.idPropertyName, this.props.selectedItem)}
                           onMouseOver={this.showList}/>
                    <ul>
                        {listOfItems}
                    </ul>
                </div>
                <div className="nyf-arrow-down"></div>
                <div className="nyf-dropdown-action"><input type="button" value="+"/></div>
            </div>
        );
    }

}
Dropdown.propTypes = {
    listItems: React.PropTypes.array,
    idPropertyName: React.PropTypes.string,
    selectedItem: React.PropTypes.any,
    onSelectItem: React.PropTypes.func
};