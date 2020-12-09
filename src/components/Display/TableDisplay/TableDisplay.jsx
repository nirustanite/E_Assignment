import React, { useEffect, useState } from 'react';
import { Table } from 'semantic-ui-react';
import Paginator from 'react-hooks-paginator';
import './TableDisplay.css';
import Items from'./Items';


const Display = (props) => {

    const { 
        listOfItems, 
    } = props;

    const pageLimit = 3;
 
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);

    useEffect(() => {
        setCurrentData(listOfItems.slice(offset, offset + pageLimit));
    }, [offset, listOfItems]);

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
                    {currentData.length >=1 && currentData.map((item) => {
                        return <Items 
                            key={item.id}
                            item={item} 
                        />
                    })}
                </Table.Body>
            </Table>
            <Paginator
                totalRecords={listOfItems.length}
                pageLimit={pageLimit}
                pageNeighbours={1}
                setOffset={setOffset}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </React.Fragment>
    );
};

export default Display;
