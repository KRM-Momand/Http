import React, { useCallback, useEffect, useState } from 'react';

import {Button} from 'react-bootstrap';

import AuthorCard from './components/AuthorCard';
import AddAuthor from './components/AddAuthor';


function App() {
    const [author, setAuthor] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const dataFetchHandler = useCallback( async() => {
        setIsLoading(true);
        setError(null);

        
        try {
            const response = await fetch('https://http-test-97d6f-default-rtdb.firebaseio.com/author.json');
            if(!response.ok){
                throw new Error('Sorry, we could not fetch any data!!!');
            }
            const data = await response.json();

            const fetchedData = [];
            for(const key in data){
                fetchedData.push({
                    id: key,
                    book: data[key].book,
                    author: data[key].author,
                    website: data[key].website,
                    info: data[key].info
                })
            }
            setAuthor(fetchedData);
            /*
            const authorInfo = data.map(user => {
                return {
                    id: user.id,
                    book: user.username,
                    author: user.name,
                    website: user.website,
                    info: user.company.catchPhrase
                }
            })
            setAuthor(authorInfo) */
            console.log(data);
        } catch (error) {

            setError(error.message);

        } finally {
            setIsLoading(false);
        }

    },[]);


    useEffect(()=> {
        dataFetchHandler(); 
    }, [dataFetchHandler]);

    const authorPostHandler = async (data) => {
        const response = await fetch('https://http-test-97d6f-default-rtdb.firebaseio.com/author.json', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const recievedData = await response.json();
        console.log(`This is the Data : ${recievedData}`);

        setAuthor(prevAuthors => [
            ...prevAuthors,
            { id: recievedData.id, ...data } // Using the id received from the backend
        ]);
    }

  return (
    <div>

        <div className=' mt-5 bg-success'>
            <Button variant='dark' onClick={dataFetchHandler} className=' w-100 p-3' disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Click to Fetch'}
            </Button>

        </div>

        <AddAuthor onAuthorPost={authorPostHandler} /> 

        {isLoading && 
            <div className="d-flex align-items-center justify-content-between m-4">
                <strong>Loading...</strong>
                <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
            </div>
        }

        {error && 
            <div className="alert alert-dark m-4" role="alert">
            <h4 className="alert-heading">Error</h4>
            <p> {error} </p>
            <hr />
            <p className="mb-0">for more info please contact technical team @ tech.com</p>
            </div>        
        }


        <div className='d-flex flex-wrap gap-3' style={{
            backgroundImage: 'url(https://picsum.photos/id/231/1920/1080)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}> 

            {author.map(user => {
                return <AuthorCard key={user.id} book={user.book} author={user.author} website={user.website} info={user.info} /> 
            })}

        </div>


    </div>
  )
}

export default App;
