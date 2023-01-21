import React, {useRef} from 'react';
import {Button, Modal} from "react-bootstrap";
import canvasState from "../store/canvasState";
import 'bootstrap/dist/css/bootstrap.css';



const AppModal = ({showModal,setShowModal}) => {
    const inputRef=useRef()

   const connectionHandler = () => {
     canvasState.setUserName(inputRef.current.value)
       setShowModal(false)
   }

    return (
        <Modal show={showModal} onHide={()=>setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Введите ваше имя</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input ref={inputRef} type={'text'} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary"  onClick={connectionHandler}>
                  Войти
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AppModal;