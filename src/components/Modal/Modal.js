import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const modalRoot = document.getElementById('modal-root');

export default class Modal extends React.Component {

    componentDidMount() {
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }

    render() {
        this.el = document.createElement('div');

        return ReactDOM.createPortal(
            this.props.children,
            this.el
        );
    }
}
