import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Segment } from "semantic-ui-react";

export default function HomePage(){
    return(
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as='h1' inverted>
                    CovRecoverApp
                </Header>
                <Header as='h2' inverted content='Witaj w Aplikacji CovrecoverApp, Twoim domowym centrum rehabilitacji' />
                <Button as={Link} to='/posts' size="huge" inverted>
                    Przejdź do artykułów
                </Button>
            </Container>
        </Segment>
    )
}