import React from 'react';
import './App.css';

import AgGrid from './components/AgGrid/AgGrid';
import Link from './components/Link';

const App = () => {

    return (

        <div className='app'>
            <AgGrid/>
            <Link page="http://www.facebook.com">sdfsdf</Link>
        </div>

    );
};

export default App;
