import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound() {
    return(
        <Segment placeholder>
            <Header icon>
                <Icon name='search' />
                Ups! Nie znaleziono żądanego przez Ciebie elementu, przepraszamy.
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/posts' primary >
                    Powrót do Artykułów
                </Button>
            </Segment.Inline>
        </Segment>
    )
}