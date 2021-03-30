import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import Checkbox from '@material-ui/core/Checkbox';
import { base_url} from '../../Endpoint/endpoint'
import { notifyError_with_msg, notify_Success_msg } from '../Utils/Message'
import {shallowEqual, useSelector } from 'react-redux'
import { Button } from '@material-ui/core';



const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});


export default function DataTable(props) {
  const classes = useStyles();

  const { token, user } = useSelector(state => ({
    token: state.Auth_token,
    user: state.Auth_user,
  }), shallowEqual);

  async function onPress(event){
    console.log(event);

    let id = event.target.id;
    var method;

    if(event.target.title === "verify"){
      method = "PATCH";
    } else {
      method = "DELETE";
    }

      const values = {
        method,
        headers : {
            'x-auth' : token,
        }
    }
    console.log(values)
    try{
        const response = await fetch(`${base_url}/${user}/alumni/${id}`,values);
        const json = await response.json()
        if(!response.ok) {
            notifyError_with_msg(json.err);
        }
        if(response.ok){
          if (method === "PATCH") {
            notify_Success_msg(`Successfully Verified ${json.firstName}`)
          } else {
            notify_Success_msg(`Successfully deleted ${json.firstName}`)
          }
          
    }}
    catch(error){
        console.log(error)
        notifyError_with_msg("Can't Process");
    }
    
  }
  
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Branch</StyledTableCell>
            <StyledTableCell align="right">Degree</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Year</StyledTableCell>
            <StyledTableCell align="right">Roll No</StyledTableCell>
            <StyledTableCell align="right">To-Verify</StyledTableCell>
            {/* <StyledTableCell align="right">Delete</StyledTableCell> */}
          </TableRow>
        </TableHead>

        
        <TableBody>
          {props.rows.map((row, rowIdx) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.branch}</StyledTableCell>
              <StyledTableCell align="right">{row.degree}</StyledTableCell>
              <StyledTableCell align="right">{row.email}</StyledTableCell>
              <StyledTableCell align="right">{row.year}</StyledTableCell>
              <StyledTableCell align="right">{row.roll}</StyledTableCell>
              <StyledTableCell align="right">
                {/* <Checkbox id={row.id} onChange={onPress}/> */}
                <Button
                  variant="outlined" 
                  color="primary"
                  size="small"
                >
                  <div 
                    id={row.id}
                    onClick={onPress}
                    title="verify"
                  >
                    Verify
                  </div>
                </Button>
              </StyledTableCell>
              {/* <StyledTableCell align="right">
                <Button
                  variant="outlined" 
                  color="secondary"
                  size="small"
                >
                  <div 
                    id={row.id}
                    onClick={onPress}
                    title="delete"
                  >
                    Delete
                  </div>
                </Button>
              </StyledTableCell> */}



            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
