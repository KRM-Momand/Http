import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';

function AddAuthor({onAuthorPost}) {

    const authorName = useRef(null);
    const authorBook = useRef(null);
    const authorWebsite = useRef(null);
    const authorInfo = useRef(null);

    const addAuthorFunction = (event) => {
        event.preventDefault();

        const authorAddedDetail = {
            id: Date.now(),
            name: authorName.current.value,
            book: authorBook.current.value,
            website: authorWebsite.current.value,
            info: authorInfo.current.value
        }

        onAuthorPost(authorAddedDetail);
        authorName.current.value = '';
        authorBook.current.value = '';
        authorWebsite.current.value = '';
        authorInfo.current.value = '';
    }
  return (

      <div className="bg-light p-4 rounded shadow-sm">
        <h3 className="text-center mb-4">Add New Author</h3>
        
        <Form onSubmit={addAuthorFunction}>
          {/* Author Name */}
          <Form.Group controlId="authorName">
            <Form.Label>Author Name</Form.Label>
            <Form.Control type="text" placeholder="Enter author's name" ref={authorName}/>
          </Form.Group>

          {/* Book */}
          <Form.Group controlId="book">
            <Form.Label>Book</Form.Label>
            <Form.Control type="text" placeholder="Enter the book title" ref={authorBook} />
          </Form.Group>

          {/* Website */}
          <Form.Group controlId="website">
            <Form.Label>Website</Form.Label>
            <Form.Control type="url" placeholder="Enter author's website URL" ref={authorWebsite} />
          </Form.Group>

          {/* Info */}
          <Form.Group controlId="info">
            <Form.Label>Additional Info</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter any additional info about the author" ref={authorInfo}/>
          </Form.Group>

          {/* Submit Button */}
          <div className="d-flex justify-content-center mt-4">
            <Button variant="dark" type="submit" className="w-50">
              Add Author
            </Button>
          </div>
        </Form>
      </div>
  );
}

export default AddAuthor;
