

import { React,  useState  } from 'react'
import { useTable, useFilters, useSortBy } from "react-table";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function Table({ columns, data }) {

    
// Create a state
const [filterInput, setFilterInput] = useState("");



   // Use the useTable Hook to send the columns and data to build the table
  
const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
  } = useTable(
    {
      columns,
      data
    },
    useFilters,
    useSortBy // This plugin Hook will help to sort our table columns
  );

  


  const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setFilter("name", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    setFilterInput(value);
  };

  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
    <>
    <div className="input-group rounded">
    <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon"  value={filterInput}   onChange={handleFilterChange}/>
    <span className="input-group-text border-0" id="search-addon">
    <FontAwesomeIcon icon={faSearch} style={{ height: "10px" }} />
    </span>
  </div>
    <table {...getTableProps()} className='table table-bordered table-hover'>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
             <th
             {...column.getHeaderProps(column.getSortByToggleProps())}
             className={
               column.isSorted
                 ? column.isSortedDesc
                   ? "sort-desc"
                   : "sort-asc"
                 : ""
             }
           >
             {column.render("Header")}
           </th>
           
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
    </>
  );
}