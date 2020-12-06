import React from 'react';
import { Table, Header, Image, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Display = (props) => {

    const items = props.listOfItems;

    console.log(items);

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
                    {items.length >=1 && items.map((item,i) => {
                        return <Table.Row key={i}>
                                <Table.Cell>
                                     {item.name}
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
