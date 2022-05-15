import React from "react";
import { Button, Container, Icon, Menu } from "semantic-ui-react";

interface Props{
    openForm: () => void;
}

export default function NavBar({openForm}: Props){

    return(
        <Menu inverted fixed='top' color="teal">
            <Container>
                <Menu.Item header as='h3'> <Icon name='heartbeat' /> CovRecover App </Menu.Item>
                <Menu.Item name='Artykuły' /> 
                <Menu.Item name='Twoje Konsultacje' />
                <Menu.Item>
                    <Button.Group>
                        <Button color='blue' content='Panel Artykułów'/>
                        <Button color='blue' content='Panel Konsultacji' />
                        <Button onClick={openForm} color='blue' content='Dodaj Artykuł' />
                    </Button.Group>
                </Menu.Item>
            </Container>
        </Menu>
    )
}