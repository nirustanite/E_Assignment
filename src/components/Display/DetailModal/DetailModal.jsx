import React from 'react';
import { Modal, Button, Image } from 'semantic-ui-react';
import MenuTabular from '../MenuTabular/MenuTabular';
import styled from 'styled-components';


const StyledCancelButton = styled(Button)`
    background-color: white !important;
    border: 1px solid #089EC8 !important;
    color:  #089EC8 !important;

    &:hover {
        background-color:  #0D2E4C !important;
        color: white !important;
    }
`;

const StyledOkButton = styled(Button)`
    background-color: #089EC8 !important;
    color: white !important;

    &:hover {
        background-color:  #0D2E4C !important;
    }
`;

const DetailModal = (props) => {

    const {item, onOpen, onClose, open, setModalOpen} = props;
    
    return (
        <Modal
            onClose={onClose}
            onOpen={onOpen}
            open={open}
        >
             <Modal.Header> 
                Details 
            </Modal.Header>
             <Modal.Content>
                <MenuTabular item={item}/>
            </Modal.Content>
            <Modal.Actions>
                <StyledCancelButton onClick={() => setModalOpen(false)}>
                   Cancel
                </StyledCancelButton>
                <StyledOkButton onClick={() => setModalOpen(false)}>
                    OK
                </StyledOkButton>
            </Modal.Actions>
        </Modal>
    );
};

export default DetailModal;