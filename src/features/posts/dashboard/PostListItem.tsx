import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Post } from "../../../app/models/post";
import { useStore } from "../../../app/stores/store";
import {format} from 'date-fns'

interface Props {
    post: Post
}

export default function PostListItem({post}: Props) {

    const {postStore} = useStore();
    const {deletePost, loading} = postStore;

    const [target, setTarget] = useState('');
    function handlePostDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        deletePost(id);
    }
    
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Content>
                            <Item.Header as={Link} to='`/posts.${post.id'>
                                {post.title}
                            </Item.Header>
                            <Item.Description> <Icon name='user md' /> AUTOR </Item.Description> 
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <Icon name='clock' /> {post.createdAt!}
            </Segment>
            <Segment>
                <Icon name='clipboard' /> {post.summary}
            </Segment>
            <Segment clearing>
                <Button 
                    as={Link}
                    to={`/posts/${post.id}`}
                    color='google plus'
                    floated='right'
                    content='Czytaj'
                />
            </Segment>
        </Segment.Group>
    )
}