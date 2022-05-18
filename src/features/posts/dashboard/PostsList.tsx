import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Header, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import PostListItem from "./PostListItem";



export default observer(function PostsList() {

    const { postStore } = useStore();
    const { postByDate, groupedPosts } = postStore;

    return (
        <>
            {groupedPosts.map(([group, posts]) => {
                return (
                    <Fragment>
                        <Header sub color='teal'>
                            {group}
                        </Header>
                        {posts.map(post => (
                            <PostListItem key={post.id} post={post} />
                        ))}
                    </Fragment>
                )

            })}

        </>
    )
})