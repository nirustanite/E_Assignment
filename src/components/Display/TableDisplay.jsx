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
            {/* <table>
            <caption>Statement Summary</caption>
            <thead>
                <tr>
                <th scope="col">Account</th>
                <th scope="col">Due Date</th>
                <th scope="col">Amount</th>
                <th scope="col">Period</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td data-label="Account">Visa - 3412</td>
                <td data-label="Due Date">04/01/2016</td>
                <td data-label="Amount">$1,190</td>
                <td data-label="Period">03/01/2016 - 03/31/2016</td>
                </tr>
                <tr>
                <td scope="row" data-label="Account">Visa - 6076</td>
                <td data-label="Due Date">03/01/2016</td>
                <td data-label="Amount">$2,443</td>
                <td data-label="Period">02/01/2016 - 02/29/2016</td>
                </tr>
                <tr>
                <td scope="row" data-label="Account">Corporate AMEX</td>
                <td data-label="Due Date">03/01/2016</td>
                <td data-label="Amount">$1,181</td>
                <td data-label="Period">02/01/2016 - 02/29/2016</td>
                </tr>
                <tr>
                <td scope="row" data-label="Acount">Visa - 3412</td>
                <td data-label="Due Date">02/01/2016</td>
                <td data-label="Amount">$842</td>
                <td data-label="Period">01/01/2016 - 01/31/2016</td>
                </tr>
            </tbody>
            </table> */}
        </React.Fragment>
    );
};

export default Display;
