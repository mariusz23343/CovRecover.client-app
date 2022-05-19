import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, FormField, Header, Label, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from 'uuid';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import CustomTextInput from "../../../app/common/form/CustomTextInput";
import CustomTextArea from "../../../app/common/form/CustomTextArea";
import CustomSelectInput from "../../../app/common/form/CustomSelectInput";
import { categoryOptions } from "../../../app/common/form/categoryOptions.ts/categoryOptions";
import { Post } from "../../../app/models/post";



export default observer(function PostForm() {

    const { postStore } = useStore();
    const { createPost, updatePost, loading, loadPost, loadingInitial } = postStore;
    const { id } = useParams<{ id: string }>();
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const history = useHistory();
    const [post, setPost] = useState<Post>({
        id: '',
        title: '',
        summary: '',
        content: '',
        isPublished: false,
        createdAt: today.toISOString(),
        updatedAt: today.toISOString(),
        publishedAt: today.toISOString()
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('Tytuł jest wymagany!'),
        summary: Yup.string().required('Podsumowanie jest wymagane!'),
        content: Yup.string().required('Treść jest wymagana!')
    })

    useEffect(() => {
        if (id) loadPost(id).then(post => setPost(post!));
    }, [id, loadPost])

    function handleFormSubmit(post: Post) {
        console.log(post);
        if (post.id.length === 0) {
            let newPost = {
                ...post,
                id: uuid(),
                isPublished: false
            };

            console.log(post)
            console.log("XD")

            createPost(newPost).then(() => history.push(`/posts/${post.id}`));
        } else {
            updatePost(post).then(() => history.push(`/posts/${post.id}`));
        }


    }


    if (loadingInitial) return <LoadingComponent content="Ładowanie postu..." />

    return (
        <Segment clearing>
            <Header content='Szczegóły artykułu' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={post}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, dirty, isSubmitting }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <CustomTextInput name='title' placeholder='Tytuł' />
                        <CustomTextInput name='summary' placeholder='Podsumowanie' />
                        <CustomSelectInput options={categoryOptions} placeholder="Kategorie" name='category' />
                        <CustomTextArea rows={30} name='content' placeholder='Treść artykułu' />
                        <Button
                            type='submit'
                            loading={loading}
                            floated='right'
                            content='Zapisz Artykuł'
                            disabled={isSubmitting || !dirty || !isValid}
                        />
                        <Button floated='right' type='button' content='Wyjdź z trybu edycji' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})