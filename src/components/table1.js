import React, { useEffect, useState } from "react";
import axios from "axios";
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import '../index.css';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, } from "@material-ui/core";

const useStyles = makeStyles({
    container: {
        height: 650,
        width: '100%',
    },
});
const columns = [
    { field: "Sl_no", headerName: (<div style={{ whiteSpace: 'normal', lineHeight: '1.2' }}> Sl <br />No</div>), width: 100 },
    { field: "CUSTOMER_ORDER_ID", headerName: (<div style={{ whiteSpace: 'normal', lineHeight: '1.2' }}>CUSTOMER<br />ORDER ID</div>), width: 180 },
    { field: "SALES_ORG", headerName: (<div style={{ whiteSpace: 'normal', lineHeight: '1.2' }}>SALES<br />ORG</div>), width: 150 },
    { field: "DISTRIBUTION_CHANNEL", headerName: "DISTRIBUTION CHANNEL", width: 250 },
    { field: "COMPANY_CODE", headerName: (<div style={{ whiteSpace: 'normal', lineHeight: '1.2' }}>COMPANY<br />CODE</div>), width: 150 },
    { field: "ORDER_CREATION_DATE", headerName: "ORDER CREATION DATE", width: 250 },
    { field: "ORDER_AMOUNT", headerName: (<div style={{ whiteSpace: 'normal', lineHeight: '1.2' }}>ORDER<br />AMOUNT</div>), width: 150 },
    { field: "ORDER_CURRENCY", headerName: (<div style={{ whiteSpace: 'normal', lineHeight: '1.2' }}> ORDER<br />CURRENCY </div>), width: 180 },
    { field: "CUSTOMER_NUMBER", headerName: "CUSTOMER NUMBER", width: 250 },
];



function Table1() {
    const baseURL = "DataLoadingServlet";

    let [data, setData] = useState([]); // Initialize with an empty array
    const [checkboxSelection, setCheckboxSelection] = useState(true);
    const [pageSize, setPageSize] = useState(10);

    const [selectData, setSelectdata] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [COMPANY_CODE, setCOMPANY_CODE] = useState("");
    const [ORDER_CURRENCY, setORDER_CURRENCY] = useState("");
    const [DISTRIBUTION_CHANNEL, setDISTRIBUTION_CHANNEL] = useState("");
    const [editData, setEditData] = useState({
        ORDER_CURRENCY: "",
        COMPANY_CODE: "",
        DISTRIBUTION_CHANNEL: "",
    });
    const [gSl_no, setSl_no] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(baseURL);
            let formattedData = response.data.map((item) => ({
                ...item,
                id: item.Sl_no,
            }));
            setData(() => data = formattedData);
        } catch (error) {
            console.error(error);
        }
    };

    const classes = useStyles();


    const handleRowSelection = (selection) => {
        setSelectedRows(selection);
        const selectedData = selection.map((rowId) => data[rowId]);
        console.log("Selected Rows:", selectedData);
        setSelectdata(selectedData);
        selectedData.forEach((entry) => {
            if (entry.hasOwnProperty("Sl_no")) {
                setSl_no(entry.Sl_no - 1)
                console.log("Selected sl_no:", entry.Sl_no - 1, " gg = ", gSl_no)
            }
        });
        // console.log(typeof (selectedData));

    };


    const handleEditClick = () => {
        // Handle edit button click
        setEditDialogOpen(true);
    };

    const handleDeleteClick = () => {
        // Handle delete button click
        setDeleteDialogOpen(true);
    };


    //////

    const handleDeleteConfirm = async () => {

        // console.log(gSl_no);
        const params = new URLSearchParams();
        params.append("Sl_no", gSl_no);
        await axios.post('delete', params)
            .then(response => console.log(response))
            .catch(error => {
                console.error("Error:", error);
            });

        console.log("Delete confirmed");
        setDeleteDialogOpen(false);

    };

    const handleDeleteCancel = () => {

        setSl_no("");
        console.log("Delete canceled");
        setDeleteDialogOpen(false);
    };

    const handleEditConfirm = async () => {

        const params = new URLSearchParams();
        params.append("Sl_no", gSl_no);
        params.append("COMPANY_CODE", COMPANY_CODE);
        params.append("ORDER_CURRENCY", ORDER_CURRENCY);
        params.append("DISTRIBUTION_CHANNEL", DISTRIBUTION_CHANNEL);
        await axios.post('update', params)
            .then(response => console.log(response))
            .catch(error => {
                console.error("Error:", error);
            });
        console.log("Edit confirmed");
        // console.log(ORDER_CURRENCY);
        // console.log(DISTRIBUTION_CHANNEL);
        // console.log(COMPANY_CODE);
        setEditDialogOpen(false);


    };

    const handleEditCancel = () => {

        console.log("Edit canceled");
        setDISTRIBUTION_CHANNEL("");
        setCOMPANY_CODE("");
        setORDER_CURRENCY("");
        setEditDialogOpen(false);
        setSelectedRows([]);

    };

    const handleInputChange1 = (event) => {
        setORDER_CURRENCY(event.target.value);
    };
    const handleInputChange2 = (event) => {
        setCOMPANY_CODE(event.target.value);
    };
    const handleInputChange3 = (event) => {
        setDISTRIBUTION_CHANNEL(event.target.value);
    };

    return (
        <div style={{ height: "auto", width: "100%" }}>
            <style>
                {`
                        .MuiDataGrid-root,
                       .MuiDataGrid-root .MuiDataGrid-cell,
                       .MuiDataGrid-root .MuiDataGrid-columnHeader {
                         background-color: #666666;
                         color: #ffffff;
                         text-align: left;
                         font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                       }
                               
                       .MuiDataGrid-root .MuiDataGrid-iconSeparator {
               
                           display: none;
                         }
                        .MuiCheckbox-colorPrimary.Mui-checked .MuiSvgIcon-root {
                        color: #fc7500; 
                        }
                        .MuiDataGrid-root .MuiDataGrid-columnHeaderTitle {
                        overflow: visible;
                        color: white;
                        }
                        .MuiDataGrid-root .MuiDataGrid-window{
                        color:white;
                        }
                        .MuiTypography-colorInherit {
                        color: white;
                        }
                        .MuiIconButton-colorInherit {
                        color: white;
                        }
                        .MuiCheckbox-root {
                        color: white;
                        }
                        .MuiButton-contained{
                        background-color:#fc7500;
                        } `
                }
            </style>

            <div className={classes.container}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={pageSize}
                    rowsPerPageOptions={[5, 10, 20]}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    checkboxSelection={checkboxSelection}
                    onSelectionModelChange={handleRowSelection}
                    disableSelectionOnClick={true}
                    pagination
                />
                <div style={{ display: "inline", position: 'relative', bottom: "45px", left: "12px" }}>
                    <Button
                        variant="contained"
                        onClick={() => window.location.reload(false)}
                        style={{ marginRight: 8, color: "#ffffff" }}
                    >
                        Refresh
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleEditClick}
                        style={{ marginRight: 8, color: "#ffffff" }}
                        disabled={selectedRows.length === 0}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleDeleteClick}
                        style={{ marginRight: 8, color: "#ffffff" }}
                        disabled={selectedRows.length === 0}
                    >
                        Delete
                    </Button>
                    <Button
                        variant="contained"
                        disabled={selectedRows.length === 0}
                        style={{ marginRight: 8, color: "#ffffff" }}
                    >
                        Predict
                    </Button>
                </div>
            </div>
            <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
                <DialogTitle>Delete Confirmation</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete the selected record(s)?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteConfirm}
                        color="primary"
                        variant="contained"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={editDialogOpen} onClose={handleEditCancel}>
                <DialogTitle>Edit</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                label="Order Currency"
                                variant="outlined"
                                name="ORDER_CURRENCY"
                                value={ORDER_CURRENCY}
                                onChange={handleInputChange1}

                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Company Code"
                                variant="outlined"
                                name="COMPANY_CODE"
                                value={COMPANY_CODE}
                                onChange={handleInputChange2}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Distribution Channel"
                                variant="outlined"
                                name="DISTRIBUTION_CHANNEL"
                                value={DISTRIBUTION_CHANNEL}
                                onChange={handleInputChange3}

                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={3} md={6}>
                            <Button
                                variant="outlined"
                                onClick={handleEditConfirm}

                            >
                                Edit
                            </Button>
                        </Grid>
                        <Grid item xs={3} md={6}>
                            <Button
                                variant="outlined"
                                onClick={handleEditCancel}

                            >
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
        </div >
    );
}

export default Table1;
