import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Post } from "../../../app/models/post";
import { useStore } from "../../../app/stores/store";



export default observer(function PostsList(){

    const {postStore} = useStore();
    const {deletePost, postByDate, loading} = postStore;

    const [target, setTarget] = useState('');
    function handlePostDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        deletePost(id);
    }
    return (
        <Segment>
            <Item.Group divided>
                {postByDate.map(post =>(
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
                                <Button as={Link} to={`/posts/${post.id}`} floated='right' content="Przeczytaj" color='teal'  />
                                <Button name={post.id} loading={loading && target === post.id} onClick={(e) => handlePostDelete(e, post.id)} floated='right' content="Usuń" color='red'  />
                                <Label basic content="Kategoria POSTU" />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})