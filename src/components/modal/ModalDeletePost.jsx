import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { appSetModalDeletePost, appSetPosts } from '../../store/actions/app/appActions';

const ModalDeletePost = ({ post }) => {
    const dispatch = useDispatch();

    const show = useSelector((state) => state.app.modalDeletePost, shallowEqual);
    const posts = useSelector((state) => state.app.posts, shallowEqual);

    const handleClose = () => dispatch(appSetModalDeletePost(false));

    const hendelDelete = (id) => {
        const updatedPosts = posts.filter(post => post.id !== id);
        dispatch(appSetPosts(updatedPosts));
        handleClose();
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Вы уверены, что хотите удалить эту запись?</Modal.Title>
                </Modal.Header>



                <Modal.Body>
                    <p><b>Title:</b> <span>{post.title}</span> </p>
                    <p><b>Body:</b> <span>{post.body}</span> </p>
                </Modal.Body>


                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Отмена</Button>
                    <Button variant="danger" onClick={() => hendelDelete(post.id)}>Удалить</Button>
                </Modal.Footer>

            </Modal>
        </div>
    );
};

export default ModalDeletePost;