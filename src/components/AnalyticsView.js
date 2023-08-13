import React, { useRef, useState } from "react";
import Highcharts from "highcharts";
import { TextField, Button, Grid } from "@material-ui/core";

function AnalyticsView(props) {
  const data = props.columns;
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const [selectedDISTRIBUTION_CHANNEL, setSelectedDISTRIBUTION_CHANNEL] =
    useState("");
  const [selectedCUSTOMER_NUMBER, setSelectedCUSTOMER_NUMBER] = useState("");

  const handleViewClick = () => {
    // Filter data based on selected distribution channel and customer number
    let filteredData = data;

    if (selectedDISTRIBUTION_CHANNEL) {
      filteredData = filteredData.filter(
        (item) => item.DISTRIBUTION_CHANNEL === selectedDISTRIBUTION_CHANNEL
      );
    }

    if (selectedCUSTOMER_NUMBER) {
      filteredData = filteredData.filter(
        (item) => item.CUSTOMER_NUMBER === selectedCUSTOMER_NUMBER
      );
    }

    // Generate data for the bar chart
    const barChartData = filteredData.map((item) => ({
      name: item.CUSTOMER_NUMBER,
      y: item.value,
    }));

    // Generate data for the pie chart
    const pieChartData = filteredData.map((item) => ({
      name: item.DISTRIBUTION_CHANNEL,
      y: item.value,
    }));

    // Create the bar chart
    Highcharts.chart(barChartRef.current, {
      chart: {
        type: "bar",
      },
      title: {
        text: "Distribution Channel vs Customer Number",
      },
      xAxis: {
        categories: filteredData.map((item) => item.CUSTOMER_NUMBER),
      },
      yAxis: {
        title: {
          text: "Value",
        },
      },
      series: [
        {
          name: "Distribution Channel",
          data: barChartData,
        },
      ],
    });

    // Create the pie chart
    Highcharts.chart(pieChartRef.current, {
      chart: {
        type: "pie",
      },
      title: {
        text: "Distribution Channels for Selected Customer",
      },
      series: [
        {
          name: "Value",
          data: pieChartData,
        },
      ],
    });
  };

  return (
    <div >
      {/* <style>
        {`
          .MuiInputBase-input-MuiOutlinedInput-input {
            background-color: #ffffff;
            color: #ffffff;
            border-radius:5px;
            border-color:#ffffff; 
          }
          
          .MuiFormLabel-root-MuiInputLabel-root.Mui-focused {
            color: #fc7500;
            border-color:#fc7500;
          }
          .MuiInputBase-root-MuioutlinedInput-root.Mui-focused {
            border-color: #fc7500;
          }
          .MuiButtonBase-root-MuiButton-root{
            background-color: #666666;
            border:solid white;
          }
        `}
      </style> */}
      <div style={{ padding: '20px' }}>


        <Grid container spacing={5}>
          <Grid container spacing={3} item xs={4}>
            <Grid item xs={12}>
              <TextField
                label="Distribution Channel"
                variant="outlined"
                value={selectedDISTRIBUTION_CHANNEL}
                onChange={(e) => setSelectedDISTRIBUTION_CHANNEL(e.target.value)}
                style={{ backgroundColor: 'white', width: "100%" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Customer Number"
                variant="outlined"
                value={selectedCUSTOMER_NUMBER}
                onChange={(e) => setSelectedCUSTOMER_NUMBER(e.target.value)}
                style={{ backgroundColor: 'white', width: "100%" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={handleViewClick} fullWidth>
                View
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2} item xs={8}>
            <Grid item xs={6}>
              <div ref={barChartRef} />
            </Grid>
            <Grid item xs={6}>
              <div ref={pieChartRef} />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default AnalyticsView;
