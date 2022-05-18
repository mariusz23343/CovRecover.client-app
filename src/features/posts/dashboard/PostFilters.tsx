import React from "react";
import { Header, Menu } from "semantic-ui-react";

export default function PostFilters(){
    return(
        <>
            <Menu vertical size='large' style={{width:'100%'}}>
                <Header icon='filter' attached color='teal' content='Sortuj' />
                <Menu.Item content='Wszystkie' />
                <Menu.Item content='Informacje Ogólne' />
                <Menu.Item content='Rehabilitacja' />
            </Menu>
        </>
        
    )
}