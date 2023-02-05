// Modal component for error messages, displaying error title, message and an okay button; using createPortal to render modal in DOMs above root in public/index.html
import React, {Fragment} from "react";
import ReactDOM from 'react-dom';
import Card from "./Card";
import Button from "./Button";
import classes from './ErrorModal.module.css';

const Backdrop = props => {
  return <div className={classes.backdrop} onClick={props.onConfirm}/>;
}

// Modal wrapper with error content
const ModalOverlay = props => {
  return (
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          <p>{props.message}</p>
        </div>
        <footer className={classes.actions}>
          <Button onClick={props.onConfirm}> Okay </Button>
        </footer>
      </Card>
  );
}

// error modal element, which is rendered in backdrop-root and overlay-root in public/index.html using createPortal
const ErrorModal = props => {
  return (
      <Fragment>
        {ReactDOM.createPortal(
            <Backdrop onConfirm={props.onConfirm}/>
            , document.getElementById('backdrop-root')
        )}
        {ReactDOM.createPortal(
            <ModalOverlay
                title={props.title}
                message={props.message}
                onConfirm={props.onConfirm}
            />,
            document.getElementById('overlay-root')
        )}
      </Fragment>
  )
}

export default ErrorModal;