import React, { useState } from 'react';
import { Menu, Segment, Image, Container, Divider } from 'semantic-ui-react';
import styled from 'styled-components';

const MainDiv = styled.div`
    display: flex;
    flex-direction: row;

    @media screen and (max-width: 600px) {
        flex-wrap: wrap;
    }
`;

const SubDiv = styled.div`
    display: flex;
    flex-direction: row;    
`;

const ColDiv = styled.div`
    display: flex;
    flex-direction: column;  
`;

const StyledP = styled.div`
   font-size: 1.1rem !important;
   color: #0D2E4C !important;
`;

const MenuTabular = (props) => {

    const { item } = props;

    console.log(item);

    const [activeItem, setActiveItem] = useState("Details");

    const handleItemClick = (e, { name }) => {
        setActiveItem(name);
    }

    return(
        <React.Fragment>
            <Menu tabular>
                <Menu.Item
                    name='Details'
                    active={activeItem === 'Details'}
                    onClick={handleItemClick}
                />
                <Menu.Item
                    name='Settings'
                    active={activeItem === 'Settings'}
                    onClick={handleItemClick}
                />
            </Menu>
            <Segment>
                {activeItem === "Details" && <div>
                    <Container>
                        <MainDiv>
                            <Image src={item.src} size="medium" style={{ paddingRight : "20px"}} />
                            <ColDiv>
                                <SubDiv>
                                    <StyledP> Name :</StyledP> &nbsp; {item.name}
                                </SubDiv>
                                <Divider />
                                <SubDiv> 
                                    <StyledP>Type :</StyledP> &nbsp; {item.type}
                                </SubDiv>
                                <Divider />
                                <SubDiv>  
                                    <StyledP>Owner :</StyledP>  &nbsp; <Image avatar src={item.avatar} rounded size="mini" />  &nbsp; {item.owner} 
                                </SubDiv>
                                <Divider />
                                <SubDiv> 
                                    <StyledP>Date : </StyledP> &nbsp; {item.date} 
                                </SubDiv>
                                <Divider />
                            </ColDiv>
                        </MainDiv>
                    </Container>
                </div>}
                {activeItem === "Settings" && <div>
                    <Container>
                        To Be Decided
                    </Container>
                </div>}
            </Segment>
        </React.Fragment>
       

       
    );
};


export default MenuTabular;