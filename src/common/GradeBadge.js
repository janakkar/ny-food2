import React, {Component} from "react";
import "./GradeBadge.css";

export class GradeBadge extends Component {
    renderLine() {
        if (this.props.showLine) {
            return (<div className="line"></div>);
        }
    }

    render() {
        const { label, isActive } = this.props;

        return (
        <div className="grade-panel-badge">
            <div className={`circle grade-${label} ${isActive ? 'active-grade' : ''}`}>
                <span className="grade">{label}</span>
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
