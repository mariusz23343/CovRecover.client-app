import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import PostsList from "./PostsList";


export default observer(function PostDashboard() {  

    const {postStore} = useStore();
    const {loadPosts, postRegistry} = postStore;

    useEffect(() => {
       if(postRegistry.size <= 0) postStore.loadPosts();
    }, [postRegistry.size, loadPosts]);

    if(postStore.loadingInitial) return <LoadingComponent content='Ładowanie' />

    return(
        <Grid>
            <Grid.Column width='10' >
                <PostsList />
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Filtry</h2>
            </Grid.Column>
        </Grid>
    )
}
)