import React from "react";
import { useSelector } from "react-redux";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from "@mui/material";

const CustomerTable = () => {
  const customers = useSelector((state) => state.customers.customers);

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 4 }}>
      <Typography variant="h5" mb={2}>
        Customer List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Expiry Date</TableCell>
              <TableCell>Products</TableCell>
              <TableCell>Subtotal</TableCell>
              <TableCell>Tax (19%)</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer, index) => (
              <TableRow key={index}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.contact}</TableCell>
                <TableCell>{customer.year}</TableCell>
                <TableCell>{customer.status}</TableCell>
                <TableCell>{customer.note}</TableCell>
                <TableCell>{customer.billingDate}</TableCell>
                <TableCell>{customer.expiryDate}</TableCell>
                <TableCell>
                  {customer.products.map((product, i) => (
                    <Typography key={i}>
                      {product.itemName} - {product.quantity} x ₹{product.price} = ₹{product.total}
                    </Typography>
                  ))}
                </TableCell>
                <TableCell>₹{customer.subtotal.toFixed(2)}</TableCell>
                <TableCell>₹{customer.tax.toFixed(2)}</TableCell>
                <TableCell>₹{customer.total.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CustomerTable;
