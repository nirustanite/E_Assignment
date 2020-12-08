import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import styled from 'styled-components';

import dropdownOptions from 'Util/dropdownOptions';

const StyledDropDown = styled(Dropdown)`
   border: none !important;
   border-bottom: 1px solid #089ec8 !important;
`;

const DropDown = (props) => {
    return(
        <div>
            <p> <strong> Choose Type : </strong></p>
            <StyledDropDown
                options={dropdownOptions}
                selection 
                defaultValue={'All'}
                onChange={props.handleChange}
            />
        </div>  
    );
};


export default DropDown;