import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { appSetModalAddPost } from '../../store/actions/app/appActions';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const ModalAddPost = ({ createNewPost }) => {
    const dispatch = useDispatch();

    const show = useSelector((state) => state.app.modalAddPost, shallowEqual);

    const handleClose = () => dispatch(appSetModalAddPost(false));
    const handleShow = () => dispatch(appSetModalAddPost(true));


    return (
        <div>
            <Button variant="success" onClick={handleShow} className='mb-3'>
                Добавить новый пост
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить новый пост</Modal.Title>
                </Modal.Header>



                <Modal.Body>
                    <Form id="addPost" onSubmit={(e) => (createNewPost(e))}>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Control type="text" placeholder="Title" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="body">
                            <Form.Control type="text" placeholder="Body" required />
                        </Form.Group>
                        <Button variant="primary" type="submit"> Добавить </Button>
                    </Form>
                </Modal.Body>

            </Modal>
        </div>
    );
};

export default ModalAddPost;