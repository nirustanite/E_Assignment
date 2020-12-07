import React, { useState } from 'react';
import { Table, Header, Image, Icon, Button } from 'semantic-ui-react';
import styled from 'styled-components';

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
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Owner</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>

                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {listOfItems.length >=1 && listOfItems.map((item,i) => {
                        return <Table.Row key={i} verticalAlign="middle">
                                <Table.Cell>
                                    <StyledButton icon >
                                        <u style={{ color: "#089ec8"}}>{item.name}</u>
                                    </StyledButton>     
                                </Table.Cell>
                                <Table.Cell>
                                    {item.type}
                                </Table.Cell>
                                <Table.Cell>
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
                                <Table.Cell>
                                    <Header as='h4' image>
                                        <Image src={item.avatar} size='mini' />
                                        <Header.Content>
                                            {item.owner}    
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>
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
