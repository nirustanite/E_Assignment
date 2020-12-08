import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import './TableDisplay.css';
import styled from 'styled-components';
import Items from'./Items';

const StyledButton = styled(Button)`
    background: none !important;
`;

const Display = (props) => {

    const { 
        listOfItems, 
    } = props;


   

    return(
        <React.Fragment>
            <Table basic="very">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>NAME</Table.HeaderCell>
                        <Table.HeaderCell>TYPE</Table.HeaderCell>
                        <Table.HeaderCell>STATUS</Table.HeaderCell>
                        <Table.HeaderCell>OWNER</Table.HeaderCell>
                        <Table.HeaderCell>DATE</Table.HeaderCell>
                        <Table.HeaderCell>ACTION</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {listOfItems.length >=1 && listOfItems.map((item) => {
                        return <Items 
                            key={item.id}
                            item={item} 
                        />
                    })}
                </Table.Body>
            </Table>
        </React.Fragment>
    );
};

export default Display;
