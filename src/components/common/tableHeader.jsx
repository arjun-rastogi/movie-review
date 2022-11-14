import React from 'react'

const TableHeader = props => {
  const raiseSort = path => {
    const sortColumns = {...props.sortColumn}
    if(sortColumns.path === path) 
    sortColumns.order = (props.sortColumn.order === 'asc') ? 'desc' : 'asc';
    else {
      sortColumns.path = path
      sortColumns.order = 'asc';
    }
    props.onSort(sortColumns);
  };

  const renderSortIcon = column => {
    const { sortColumn } =  props;

    if(column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  }


  return (
    <>
     <thead>
        <tr>
          {props.columns.map(column => (
          <th
          className="clickable"
          key={column.path || column.key}
          onClick={() => raiseSort(column.path)}
          >
          {column.label} {renderSortIcon(column)}
         </th>
         ))}
        </tr>
     </thead>

    </>
  )
}

export default TableHeader