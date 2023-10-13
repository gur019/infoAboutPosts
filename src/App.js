import React, { useState, useEffect } from 'react';

import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const App = () => {
    const [posts, setPosts] = useState([]);
    const [rowData, setRowData] = useState([]);
  
    useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
        .then(response => response.json())
        .then(data => setPosts(data));
    }, []);
  
    useEffect(() => {
      setRowData(posts);
    }, [posts]);
  
    const handleDelete = (id) => {
      if (window.confirm('Вы уверены, что хотите удалить эту запись?')) {
        const updatedPosts = posts.filter(post => post.id !== id);
        setPosts(updatedPosts);
      }
    };
  
    const handleAdd = (newPost) => {
      setPosts([...posts, newPost]);
    };
  
    const columnDefs = [
      { headerName: 'ID', field: 'id', resizable: true },
      { headerName: 'Title', field: 'title', resizable: true },
      { headerName: 'Body', field: 'body', resizable: true },
      {
        headerName: 'Actions',
        field: 'id',
        cellRenderer: (params) => (
          <button onClick={() => handleDelete(params.value)}>Удалить</button>
        ),
        resizable: true
      },
    ];
  
    return (
      <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          pagination={true}
          paginationPageSize={10}
        ></AgGridReact>

        <form onSubmit={e => {
          e.preventDefault();
          const newPost = {
            id: Date.now(),
            title: e.target.title.value,
            body: e.target.body.value
          };
          handleAdd(newPost);
          e.target.reset();
        }}>
          <input type="text" name="title" placeholder="Title" required />
          <input type="text" name="body" placeholder="Body" required />
          <button type="submit">Добавить</button>
        </form>

      </div>
    );
  };

export default App;
