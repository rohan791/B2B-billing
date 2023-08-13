import { useState } from "react";
import axios from 'axios';
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';


function AddData() {
  const [CUSTOMER_ORDER_ID, setCUSTOMER_ORDER_ID] = useState("");
  const [SALES_ORG, setSALES_ORG] = useState("");
  const [DISTRIBUTION_CHANNEL, setDISTRIBUTION_CHANNEL] = useState("");
  const [CUSTOMER_NUMBER, setCUSTOMER_NUMBER] = useState("");
  const [COMPANY_CODE, setCOMPANY_CODE] = useState("");
  const [ORDER_CURRENCY, setORDER_CURRENCY] = useState("");
  const [AMOUNT_IN_USD, setAMOUNT_IN_USD] = useState("");
  const [ORDER_CREATION_DATE, setORDER_CREATION_DATE] = useState("");
  const [responseText, setResponseText] = useState("");

  const handleAddData = async () => {
    const params = new URLSearchParams();
    params.append("CUSTOMER_ORDER_ID", CUSTOMER_ORDER_ID);
    params.append("SALES_ORG", SALES_ORG);
    params.append("DISTRIBUTION_CHANNEL", DISTRIBUTION_CHANNEL);
    params.append("CUSTOMER_NUMBER", CUSTOMER_NUMBER);
    params.append("COMPANY_CODE", COMPANY_CODE);
    params.append("ORDER_CURRENCY", ORDER_CURRENCY);
    params.append("AMOUNT_IN_USD", AMOUNT_IN_USD);
    params.append("ORDER_CREATION_DATE", ORDER_CREATION_DATE);

    //   fetch(
    //     `AddServlet?${params.toString()}`,
    //   )
    //     .then((response) => console.log(response))
    //     .catch((error) => {
    //       console.error("Error:", error);
    //     });
    // };
    await axios.post('AddServlet', params)
      .then(response => console.log(response))
      .catch(error => {
        console.error("Error:", error);
      });
  };

  const handleDeleteData = () => {
    setCUSTOMER_ORDER_ID("");
    setSALES_ORG("");
    setDISTRIBUTION_CHANNEL("");
    setCUSTOMER_NUMBER("");
    setCOMPANY_CODE("");
    setORDER_CURRENCY("");
    setAMOUNT_IN_USD("");
    setORDER_CREATION_DATE("");
  };

  return (
    <div className="add-data-container">
      {/* <style>
        {`
         uiInputBase-root MuiOutlinedInput-root MuiInputBase-formControl {
            background-color: #ffffff;
            color: #666666;
          }
          .MuiFormLabel-root-MuiInputLabel-root.Mui-focused {
            color: #fc7500;
          }
          .MuiInputBase-root-MuioutlinedInput-root.Mui-focused {
            border-color: #fc7500;
          }
          .MuiButton-contained{
            background-color: #fc7500;
          }
        `}
      </style> */}
      <div style={{ padding: '20px' }}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <TextField
              label="Customer Order Id"
              variant="outlined"
              value={CUSTOMER_ORDER_ID}
              onChange={(e) => setCUSTOMER_ORDER_ID(e.target.value)}
              style={{ backgroundColor: 'white', width: "100%" }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Sales Org"
              variant="outlined"
              value={SALES_ORG}
              onChange={(e) => setSALES_ORG(e.target.value)}
              style={{ backgroundColor: 'white', width: "100%" }}
            />
          </Grid>
          <Grid item xs={6} >
            <TextField
              label="Distribution Channel"
              variant="outlined"
              value={DISTRIBUTION_CHANNEL}
              onChange={(e) => setDISTRIBUTION_CHANNEL(e.target.value)}
              style={{ backgroundColor: 'white', width: "100%" }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Customer Number"
              variant="outlined"
              value={CUSTOMER_NUMBER}
              onChange={(e) => setCUSTOMER_NUMBER(e.target.value)}
              style={{ backgroundColor: 'white', width: "100%" }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Company Code"
              variant="outlined"
              value={COMPANY_CODE}
              onChange={(e) => setCOMPANY_CODE(e.target.value)}
              style={{ backgroundColor: 'white', width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Order Currency"
              variant="outlined"
              value={ORDER_CURRENCY}
              onChange={(e) => setORDER_CURRENCY(e.target.value)}
              style={{ backgroundColor: 'white', width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Amount in USD"
              variant="outlined"
              value={AMOUNT_IN_USD}
              onChange={(e) => setAMOUNT_IN_USD(e.target.value)}
              style={{ backgroundColor: 'white', width: "100%" }}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Order Creation Date"
              variant="outlined"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={ORDER_CREATION_DATE}
              onChange={(e) => setORDER_CREATION_DATE(e.target.value)}
              style={{ backgroundColor: 'white', width: "100%" }}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <Button
              variant="filled"
              onClick={handleAddData}
              style={{ color: 'white', backgroundColor: '#fc7500', width: "100%" }}
            >
              Add Data
            </Button>
          </Grid>
          <Grid item xs={6} md={6}>
            <Button
              variant="filled"
              onClick={handleDeleteData}
              style={{ color: 'white', backgroundColor: '#db4437', width: "100%" }}
            >
              Clear Data
            </Button>
          </Grid>
          <Grid item xs={12}>
            {responseText && (
              <Typography variant="h6" sx={{ mt: 2 }}>
                Response: {responseText}
              </Typography>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default AddData;
