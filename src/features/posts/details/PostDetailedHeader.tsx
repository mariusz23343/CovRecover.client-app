import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Segment, Grid, Icon, Button} from 'semantic-ui-react'
import { Post } from '../../../app/models/post';

interface Props {
    post: Post
}

export default observer(function PostDetailedHeader({post: post}: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='heartbeat'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{post.title}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='calendar' size='large' color='teal'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
            <span>
              {post.createdAt}
            </span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='user md' size='large' color='teal'/>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>lek.med. Jan Kowalski</span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button as={Link} to={`/manage/${post.id}`} color='teal'>Edytuj Artykuł</Button>
                <Button>Opublikuj Artykuł</Button>
                <Button color='red' floated='right'>
                   Usuń Artykuł
                </Button>
            </Segment>
        </Segment.Group>
    )
})
