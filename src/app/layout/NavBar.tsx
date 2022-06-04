import { observer } from "mobx-react-lite";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Container, Icon, Menu, Image, Dropdown } from "semantic-ui-react";
import { useStore } from "../stores/store";



export default observer(function NavBar() {

    const { userStore: { user, logout } } = useStore();

    return (
        <Menu inverted fixed='top' color="teal">
            <Container>
                <Menu.Item as={NavLink} to='/' header exact> <Icon name='heartbeat' /> CovRecover App </Menu.Item>
                <Menu.Item as={NavLink} to='/posts' name='Artykuły' />
                <Menu.Item name='Twoje Konsultacje' />
                <Menu.Item>
                    <Button.Group>
                        <Button color='blue' content='Panel Artykułów' />
                        <Button color='blue' content='Panel Konsultacji' />
                        <Button as={NavLink} to='/createPost' color='blue' content='Dodaj Artykuł' />
                        <Button as={NavLink} to='/errors' color='blue' content='Test Error' />
                    </Button.Group>
                </Menu.Item>
                <Menu.Item position="right">
                    <Icon name='user' />
                    <Dropdown pointing='top left' text={user?.displayName} >
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profile/${user?.username}`} text='Moje Konto' />
                            <Dropdown.Item onClick={logout} text='Wyloguj' icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
})