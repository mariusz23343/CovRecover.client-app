import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Post } from "../../../app/models/post";

interface Props{
    posts: Post[];
}

export default function PostsList({posts}: Props){
    return (
        <Segment>
            <Item.Group divided>
                {posts.map(post =>(
                    <Item key={post.id}>
                        <Item.Content>
                            <Item.Header as='a'>
                                {post.title}
                            </Item.Header>
                            <Item.Meta>{post.publishedAt}</Item.Meta>
                            <Item.Description>
                                <div>{post.summary}</div>
                                <div>AUTOR</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' content="Przeczytaj" color='teal'  />
                                <Label basic content="Kategoria POSTU" />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}