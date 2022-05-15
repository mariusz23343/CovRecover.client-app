import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Post } from "../../../app/models/post";

interface Props {
    post: Post | undefined;
    closeForm: () => void;
    createOrEdit: (post:Post) => void;
}

export default function PostForm({post: selectedPost, closeForm, createOrEdit}: Props) {

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    const initialState = selectedPost ? selectedPost : {
        id: '',
        title: '',
        summary: '',
        content: '',
        isPublished: false,
        createdAt: today.toISOString(),
        updatedAt: today.toISOString(),
        publishedAt: today.toISOString()
    }

    const [post, setPost] = useState(initialState);

    function handleSubmit(){
        console.log(post);
        createOrEdit(post);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setPost({...post, [name]: value})
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder="Tytuł" value={post.title} name='title' onChange={handleInputChange} ></Form.Input>
                <Form.Input placeholder="Podsumowanie" value={post.summary} name='summary' onChange={handleInputChange}></Form.Input>
                <Form.TextArea placeholder="Treść Artykułu" value={post.content} name='content' onChange={handleInputChange}></Form.TextArea>
                <Button type='submit' floated='right'  content='Zapisz Artykuł' />
                <Button onClick={closeForm} floated='right' type='button' content='Wyjdź z trybu edycji' />
            </Form>
        </Segment>
    )
}