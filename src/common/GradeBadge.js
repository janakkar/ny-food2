import React, {Component} from "react";
import "./GradeBadge.css";

export class GradeBadge extends Component {
    renderLine() {
        let line;
        if (this.props.showLine) {
            line = <div className="line"></div>;
        }
        return line;
    }

    render() {
        return (
            <div className="grade-panel-badge">
                <div className={'circle grade-' + this.props.label + (this.props.isActive ? ' active-grade' : '')}>
                    <span className="grade">{this.props.label}</span>
                </div>
                {this.renderLine()}
            </div>
        );
    }
}

GradeBadge.propTypes = {
    showLine: React.PropTypes.bool,
    label: React.PropTypes.string,
    isActive: React.PropTypes.bool
};
