import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Post } from "../../../app/models/post";
import PostDetails from "../details/PostDetails";
import PostForm from "../form/PostForm";
import PostsList from "./PostsList";

interface Props{
    posts: Post[];
    selectedPost: Post | undefined;
    selectPost: (id: string) => void;
    cancelSelectedPost: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (post:Post) => void;
    deletePost: (id: string) => void;
    changePublishStatus: (post: Post) => void;
}

export default function PostDashboard({posts, selectPost, selectedPost,
     cancelSelectedPost, editMode, openForm, closeForm, createOrEdit, deletePost, changePublishStatus}: Props) {
    return(
        <Grid>
            <Grid.Column width='10' >
                <PostsList posts={posts} selectPost={selectPost} deletePost={deletePost} />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedPost &&  ! editMode &&
                    <PostDetails 
                        post={selectedPost} 
                        cancelSelectedPost={cancelSelectedPost} 
                        openForm={openForm}
                        changePublishStatus={changePublishStatus}
                    />}
                {editMode &&
                    <PostForm 
                        closeForm={closeForm} 
                        post={selectedPost}
                        createOrEdit={createOrEdit}
                    />
                }
            </Grid.Column>
        </Grid>
    )
}