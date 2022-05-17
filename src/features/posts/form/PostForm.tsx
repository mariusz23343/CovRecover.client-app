import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import {v4 as uuid} from 'uuid';



export default observer (function PostForm() {

    const {postStore} = useStore();
    const {createPost, updatePost, loading, loadPost, loadingInitial} = postStore;
    const {id} = useParams<{id: string}>();
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const history = useHistory();
    const [post, setPost] = useState({
        id: '',
        title: '',
        summary: '',
        content: '',
        isPublished: false,
        createdAt: today.toISOString(),
        updatedAt: today.toISOString(),
        publishedAt: today.toISOString()
    });

    useEffect(() => {
        if(id) loadPost(id).then(post => setPost(post!));
    }, [id, loadPost])

    function handleSubmit(){
        console.log(post);
        if(post.id.length === 0){
            let newPost = {
                ...post,
                id: uuid()
            };

            createPost(newPost).then(() => history.push(`/posts/${post.id}`));
        } else {
            updatePost(post).then(() => history.push(`/posts/${post.id}`));
        }


    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setPost({...post, [name]: value})
    }

    if(loadingInitial) return <LoadingComponent content="Ładowanie postu..." />

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder="Tytuł" value={post.title} name='title' onChange={handleInputChange} ></Form.Input>
                <Form.Input placeholder="Podsumowanie" value={post.summary} name='summary' onChange={handleInputChange}></Form.Input>
                <Form.TextArea placeholder="Treść Artykułu" value={post.content} name='content' onChange={handleInputChange}></Form.TextArea>
                <Button type='submit' loading={loading} floated='right'  content='Zapisz Artykuł' />
                <Button  floated='right' type='button' content='Wyjdź z trybu edycji' />
            </Form>
        </Segment>
    )
})