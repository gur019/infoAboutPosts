import React, { useCallback, useMemo, useRef, useState } from 'react';

import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { appSetModalAddPost, appSetModalDeletePost, appSetPosts } from '../../store/actions/app/appActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import ModalAddPost from '../modal/ModalAddPost';
import ModalDeletePost from '../modal/ModalDeletePost';

const AgGrid = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.app.posts, shallowEqual);

    const [post, setPost] = useState({});

    const gridRef = useRef();

    const defaultColDef = useMemo(() => {
        return { resizable: true };
    }, []);

    const onFirstDataRendered = useCallback(() => {
        gridRef.current.api.sizeColumnsToFit();
    }, []);


    const onGridReady = useCallback(() => {
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
            .then(response => response.json())
            .then(data => dispatch(appSetPosts(data)));
    }, []);


    const handleOpenDeleteModal = (post) => {
        setPost(post);
        dispatch(appSetModalDeletePost(true));
    };


    const handleAdd = (newPost) => {
        dispatch(appSetPosts([...posts, newPost]))
        dispatch(appSetModalAddPost(false))
    };

    const createNewPost = (e) => {
        e.preventDefault();
        const newPost = {
            id: Date.now(),
            title: e.target.title.value,
            body: e.target.body.value
        };
        handleAdd(newPost);
        e.target.reset();
    }

    const columnDefs = [
        { headerName: 'ID', field: 'id', width: 50, maxWidth: 50 },
        { headerName: 'Title', field: 'title' },
        { headerName: 'Body', field: 'body' },
        {
            headerName: 'Actions',
            field: 'id',
            width: 150,
            maxWidth: 150,
            cellRenderer: (params) => (
                <Button onClick={() => handleOpenDeleteModal(params.data)} variant="outline-danger" size="sm">Удалить</Button>
            ),
        },

    ];

    return (
        <>
            <h1>Список постов</h1>

            <ModalAddPost createNewPost={createNewPost} />
            <ModalDeletePost post={post}/>

            <div className="ag-theme-alpine" >
                <AgGridReact
                    ref={gridRef}
                    columnDefs={columnDefs}
                    rowData={posts}
                    pagination={true}
                    paginationPageSize={10}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                    onFirstDataRendered={onFirstDataRendered}
                    domLayout={'autoHeight'}
                ></AgGridReact>

            </div>
        </>
    );
};

export default AgGrid;