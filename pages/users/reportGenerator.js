import jsPDF from "jspdf";
import "jspdf-autotable";
const User = require('../../components/models/user');
import {  react, useEffect } from 'react'
// Date Fns is used to format the dates we receive
// from our API call
import { format } from "date-fns";


// define a generatePDF function that accepts a tickets argument
const generatePDF = (objects) => {

  
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["Id", "Name",  "Email", "Status", "Created"];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  Object.entries(objects).forEach(entry => {
    const [key, value] = entry;
    console.log(key, value);
    const objectData = [
      value.id,
      value.name,
      value.email,
      value.active,
    // called date-fns to format the date on the ticket
    format(new Date(value.datecreated), "yyyy-MM-dd")
  ];
  tableRows.push(objectData);
  });
  /*
  objects.forEach(object => {
    const objectData = [
        object.id,
        object.name,
        object.email,
        object.active,
      // called date-fns to format the date on the ticket
      format(new Date(object.datecreated), "yyyy-MM-dd")
    ];
    // push each tickcet's info into a row
    tableRows.push(objectData);
  });
*/

  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  doc.text("Report Data", 14, 15);
  // we define the name of our PDF file.
 // doc.save(`report_${dateStr}.pdf`);
  doc.output('dataurlnewwindow');
};

export default generatePDF;