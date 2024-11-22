import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  useMediaQuery,
  Card,
  CardContent,
  Divider,
} from "@mui/material";

const CustomerTable = () => {
  const customers = useSelector((state) => state.customers.customers);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm")); // Check if mobile view

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 4, p: 1 }}>
      <Typography variant="h5" mb={2}>
        Customer List
      </Typography>

     
      {!isMobile ? (
        // Desktop/Table View
        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
          <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f4f4f4" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Mobile</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Year</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Expiry</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Products</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Subtotal</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Tax</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
              {customers.map((customer, index) => (
                <TableRow key={index}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.contact}</TableCell>
                  <TableCell>{customer.year}</TableCell>
                  <TableCell>{customer.status}</TableCell>
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
      ) : (
        // Mobile View: Cards instead of table
        <Box>
          {customers.map((customer, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {customer.name}
                </Typography>
                <Divider />
                <Typography><strong>Mobile:</strong> {customer.contact}</Typography>
                <Typography><strong>Year:</strong> {customer.year}</Typography>
                <Typography><strong>Status:</strong> {customer.status}</Typography>
                <Typography><strong>Date:</strong> {customer.billingDate}</Typography>
                <Typography><strong>Expiry Date:</strong> {customer.expiryDate}</Typography>
                <Typography sx={{ mt: 1 }}><strong>Products:</strong></Typography>
                {customer.products.map((product, i) => (
                  <Typography key={i} sx={{ ml: 1 }}>
                    {product.itemName} - {product.quantity} x ₹{product.price} = ₹{product.total}
                  </Typography>
                ))}
                <Divider sx={{ my: 1 }} />
                <Typography><strong>Subtotal:</strong> ₹{customer.subtotal.toFixed(2)}</Typography>
                <Typography><strong>Tax (19%):</strong> ₹{customer.tax.toFixed(2)}</Typography>
                <Typography variant="h6"><strong>Total:</strong> ₹{customer.total.toFixed(2)}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default CustomerTable;
