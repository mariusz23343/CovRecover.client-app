import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";



export default observer(function PostDetails(){

    const {postStore} = useStore();
    const {selectedPost: post, publishPost, loadPost, loadingInitial} = postStore;
    const {id} = useParams<{id: string}>()

    useEffect(() => {
        if(id) loadPost(id);
    }, [id, loadPost])

    if(loadingInitial || !post) return <LoadingComponent />;

    function handlePublish(){
        publishPost(post!.id);
    }

   

    return (
        <Grid>
            <Card fluid>
            <Card.Content>
                <Card.Header>{post.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{post.publishedAt}</span>
                </Card.Meta>
                <Card.Description>
                    {post.summary}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group>
                    <Grid.Column width={2}><Button as={Link} to={`/manage/${post.id}`} size='small' basic color='blue' content='Edytuj Artykuł' /></Grid.Column>
                    <Grid.Column width={2}><Button onClick={handlePublish} basic color='blue' content='Opublikuj Artykuł' /></Grid.Column>
                    <Grid.Column width={2}><Button as={Link} to='/posts'  basic color='blue' content='Anuluj Podgląd' /></Grid.Column>
                </Button.Group>
            </Card.Content>
        </Card>
        </Grid>
    )
})