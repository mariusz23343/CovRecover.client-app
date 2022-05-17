import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Icon, Menu } from "semantic-ui-react";



export default function NavBar(){


    return(
        <Menu inverted fixed='top' color="teal">
            <Container>
                <Menu.Item as={NavLink} to='/' header exact> <Icon name='heartbeat' /> CovRecover App </Menu.Item>
                <Menu.Item as={NavLink} to='/posts' name='Artykuły' /> 
                <Menu.Item name='Twoje Konsultacje' />
                <Menu.Item>
                    <Button.Group>
                        <Button color='blue' content='Panel Artykułów'/>
                        <Button color='blue' content='Panel Konsultacji' />
                        <Button as={NavLink} to='/createPost'  color='blue' content='Dodaj Artykuł' />
                    </Button.Group>
                </Menu.Item>
            </Container>
        </Menu>
    )
}