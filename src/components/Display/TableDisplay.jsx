import React, { useState } from 'react';
import { Table, Header, Image, Icon, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import './TableDisplay.css';

const StyledButton = styled(Button)`
    background-color: white !important;
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
                        <Table.HeaderCell scope="col">Name</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Owner</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>

                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {listOfItems.length >=1 && listOfItems.map((item,i) => {
                        return <Table.Row key={i} verticalAlign="middle">
                                <Table.Cell data-label="Name">
                                   {item.name}
                                </Table.Cell>
                                <Table.Cell data-label="Type">
                                    {item.type}
                                </Table.Cell>
                                <Table.Cell data-label="Status">
                                    {item.status === "Progress" ? (
                                        <>
                                        <Icon name='hourglass end' color="brown" /> &nbsp; {item.status}
                                        </>
                                    ):(
                                        <>
                                          <span style={{ color: "green"}}> &#10003;</span> &nbsp; {item.status}
                                        </>
                                    )}
                                </Table.Cell>
                                <Table.Cell data-label="Owner">
                                    <Header as='h4' image>
                                        <Image src={item.avatar} size='mini' />
                                        <Header.Content>
                                            {item.owner}    
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell data-label="Date">
                                    {item.date}
                                </Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table>
        </React.Fragment>
    );
};

export default Display;
