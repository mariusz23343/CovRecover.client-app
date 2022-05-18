import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Grid, GridColumn } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import PostDetailedChat from "./PostDetailedChat";
import PostDetailedHeader from "./PostDetailedHeader";
import PostDetailedInfo from "./PostDetailedInfo";
import PostDetailedSidebar from "./PostDetailedSidebar";



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
           <Grid.Column width={10}>
               <PostDetailedHeader post={post} />
               <PostDetailedInfo post={post}/>
               <PostDetailedChat />
           </Grid.Column>
           <GridColumn width={6}>
                <PostDetailedSidebar />
           </GridColumn>
        </Grid>
    )
})