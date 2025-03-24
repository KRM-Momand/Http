import { useState } from "react";

function useFetch() {
        const [author, setAuthor] = useState([]);
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState(null);

        const fetchData = async (url, method = 'GET', bodyData = null) => {
            setIsLoading(true);
            setError(null);

            const options = {
                method, 
                headers: {
                    'Content-Type': 'application/json'
                },
                ...(method === 'POST' && bodyData ?{ body: JSON.stringify(bodyData)} : {})

            }

            try {
                const response = await fetch(url, options);
                if(!response.ok){ throw new Error('Cannot fetched Data Gilr')}

                const data = await response.json();

                const transformedData = [];
                for (const key in data) {
                    transformedData.push({
                        id: key,
                        book: data[key].book,
                        author: data[key].author,
                        website: data[key].website,
                        info: data[key].info,
                    });
                }
                setAuthor(transformedData);

            } catch(err){
                console.log('Error occurred:', err);
                const errorMessage = err.message || 'Something went wrong!';
                setError(errorMessage);
            } finally {
                setIsLoading(false);
            }

        }
    return {author, isLoading, error, fetchData};
}

export default useFetch;