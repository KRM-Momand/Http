import React, { useCallback, useEffect, useState } from 'react';

import {Button} from 'react-bootstrap';

import useFetch from './hooks/use-fetch';
import AuthorCard from './components/AuthorCard';
import AddAuthor from './components/AddAuthor';


function App() {
    const {author, isLoading, error, fetchData} = useFetch();

    const MYURL = 'https://http-test-97d6f-default-rtdb.firebaseio.com/author.json';

    const dataFetchHandler = useCallback(async ()=> {
        await fetchData(MYURL);
    }, [fetchData]);

    const authorPostHandler = async (data) => {
        await fetchData(MYURL, 'POST', data);
        dataFetchHandler();
    }   

  return (
    <div>


        <div className=' mt-5 bg-success'>
            <Button variant='dark' onClick={dataFetchHandler} className=' w-100 p-3' disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Click to Fetch'}
            </Button>

        </div>


        <AddAuthor onAuthorPost={authorPostHandler} />

        <div className='d-flex flex-wrap gap-3' style={{
            backgroundImage: 'url(https://picsum.photos/id/231/1920/1080)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}> 

            {author.map(user => {
                return <AuthorCard key={user.id} book={user.book} name={user.name} website={user.website} info={user.info} /> 
            })}
        </div>

        {isLoading && (
                <div className="d-flex align-items-center justify-content-between m-4">
                    <strong>Loading...</strong>
                    <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                </div>
            )}

        {error && (
            <div className="alert alert-dark m-4" role="alert">
                <h4 className="alert-heading">Error</h4>
                <p>{error}</p>
                <hr />
                <p className="mb-0">For more info, please contact the technical team @ tech.com</p>
            </div>
        )}


    </div>
  )
}

export default App;
