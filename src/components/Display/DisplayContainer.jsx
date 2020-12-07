import React, { useState } from 'react';
import TableDisplay from './TableDisplay';

const DisplayContainer = (props) => {

    const { listOfItems, showfavorite } = props;

    const [iconFill, setIconFill] = useState(false);

    const handleIconClick = () => {
        setIconFill(true);
    }

    return(
        <React.Fragment>
            <TableDisplay 
                listOfItems={listOfItems}  
                showFavIcon={showfavorite} 
                handleIconClick={handleIconClick}
                iconFill={iconFill} />
        </React.Fragment>
    );
};

export default DisplayContainer;