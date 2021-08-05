import './styles.css'

import { Component } from "react";


export class Button extends Component {
    render(props) {
        const { text, onClick, disabled } = this.props;
        console.log(disabled);
        return (
            <button
                className="button"
                disabled={disabled}
                onClick={onClick}>
                {text}
            </button>
        );
    }
}