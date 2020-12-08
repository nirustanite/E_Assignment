import React, { useState } from 'react';
import { Table, Header, Button, Icon, Image, Modal } from 'semantic-ui-react';
import './TableDisplay.css';
import styled from 'styled-components';
import DetailModal from '../DetailModal/DetailModal';

const StyledButton = styled(Button)`
    background: none !important;
`;

const Items = (props) => {

    const item = props.item;

    const [modalOpen, setModalOpen] = useState(false);
    
    const handleClick = () => {
        setModalOpen(true);
    }

    const onOpen = () => {
        setModalOpen(true);
    }

    const onClose = () => {
        setModalOpen(false);
    }

    return(
        <React.Fragment>
            <Table.Row verticalAlign="middle">
                <Table.Cell data-label="Name">
                    {item.name}
                </Table.Cell>
                <Table.Cell data-label="Type">
                        {item.type}
                </Table.Cell>
                <Table.Cell data-label="Status">
                    {item.status === "Progress" ? (
                        <>
                            &#8987; &nbsp; {item.status}
                        </>
                    ):(
                        <>
                            <span style={{ color: "green"}}> &#10003;</span> &nbsp; {item.status}
                        </>
                    )}
                </Table.Cell>
                <Table.Cell data-label="Owner">
                    <Header as='h5' image>
                        <Image src={item.avatar} rounded size='mini' />
                            <Header.Content>
                                {item.owner}    
                            </Header.Content>
                    </Header>
                </Table.Cell>
                <Table.Cell data-label="Date">
                    {item.date}
                </Table.Cell>
                <Table.Cell data-label="Action">
                    <StyledButton icon onClick={handleClick}> 
                        <Icon name="edit outline" />
                    </StyledButton>
                </Table.Cell>
            </Table.Row>
            {modalOpen && <DetailModal 
                item={item}
                onOpen={onOpen}
                onClose={onClose}
                open={modalOpen}
                setModalOpen={setModalOpen}
            />}
        </React.Fragment>
    );
};


export default Items;