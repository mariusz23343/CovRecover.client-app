import React from "react";
import { Button, Card, Grid } from "semantic-ui-react";
import { Post } from "../../../app/models/post";

interface Props{
    post: Post
    cancelSelectedPost: () => void;
    openForm: (id: string) => void;
    changePublishStatus: (post: Post) => void;
}

export default function PostDetails({post, cancelSelectedPost, openForm, changePublishStatus}: Props){

    function handlePublish(){
        post.isPublished = !post.isPublished;
        changePublishStatus(post);
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
                    <Grid.Column width={2}><Button onClick={() => openForm(post.id)} size='small' basic color='blue' content='Edytuj Artykuł' /></Grid.Column>
                    <Grid.Column width={2}><Button onClick={handlePublish} basic color='blue' content='Opublikuj Artykuł' /></Grid.Column>
                    <Grid.Column width={2}><Button onClick={cancelSelectedPost} basic color='blue' content='Anuluj Podgląd' /></Grid.Column>
                </Button.Group>
            </Card.Content>
        </Card>
        </Grid>
    )
}