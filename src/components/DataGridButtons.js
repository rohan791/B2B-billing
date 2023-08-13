import React from "react";
import { Button } from "@material-ui/core";

const DataGridButtons = ({ handleRefreshClick, handleEditClick, handleDeleteClick, selectedRows, }) => {
    return (
        <div>
            <Button variant="contained" onClick={handleRefreshClick} style={{ marginRight: 8, color: "#ffffff" }}>
                Refresh
            </Button>
            <Button variant="contained" onClick={handleEditClick} style={{ marginRight: 8, color: "#ffffff" }} disabled={selectedRows.length === 0}>
                Edit
            </Button>
            <Button variant="contained" onClick={handleDeleteClick} style={{ marginRight: 8, color: "#ffffff" }} disabled={selectedRows.length === 0}>
                Delete
            </Button>
            <Button variant="contained" disabled={selectedRows.length === 0} style={{ marginRight: 8, color: "#ffffff" }}>
                Predict
            </Button>
        </div>
    );
};

export default DataGridButtons;
