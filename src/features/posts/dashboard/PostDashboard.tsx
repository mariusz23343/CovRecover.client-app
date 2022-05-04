import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Post } from "../../../app/models/post";
import PostsList from "./PostsList";

interface Props{
    posts: Post[];
}

export default function PostDashboard({posts}: Props) {
    return(
        <Grid>
            <Grid.Column width='10' >
                <PostsList posts={posts} />
            </Grid.Column>
        </Grid>
    )
}