import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCustomer } from "../slices/customersSlice";
import { Box, TextField, Button, Typography, Modal, Divider } from "@mui/material";

const BillGenerator = () => {
  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");
  const [year, setYear] = useState("");
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [products, setProducts] = useState([]);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const dispatch = useDispatch();

  const addProductField = () => {
    setProducts([
      ...products,
      { itemName: "", description: "", quantity: "", price: "", total: "" },
    ]);
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;

    if (field === "quantity" || field === "price") {
      const quantity = parseFloat(updatedProducts[index].quantity) || 0;
      const price = parseFloat(updatedProducts[index].price) || 0;
      updatedProducts[index].total = quantity * price;
    }

    setProducts(updatedProducts);
  };

  const calculateSubtotal = () =>
    products.reduce((sum, product) => sum + parseFloat(product.total || 0), 0);

  const calculateTax = (subtotal) => (subtotal * 19) / 100;

  const handleSubmit = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    const total = subtotal + tax;
  
    const newCustomer = {
      name: customerName,
      contact: customerMobile,
      year,
      status,
      note,
      billingDate: date,
      expiryDate,
      products,
      subtotal,
      tax,
      total,
    };
  
    dispatch(addCustomer(newCustomer));
    setIsSuccessModalOpen(true);
  };
  

  const downloadInvoice = () => {
    const invoiceData = {
      customerName,
      customerMobile,
      year,
      status,
      note,
      date,
      expiryDate,
      products,
    };
    const blob = new Blob([JSON.stringify(invoiceData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `invoice_${customerName}_${date}.json`;
    link.click();
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3, boxShadow: 2, mt: 4 }}>
      <Typography variant="h5" mb={2}>
        Bill Generator
      </Typography>

      {/* Row 1: Customer Details */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          label="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Mobile Number"
          value={customerMobile}
          onChange={(e) => setCustomerMobile(e.target.value)}
        />
        <TextField
          fullWidth
          label="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <TextField
          fullWidth
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </Box>

      {/* Row 2: Note and Dates */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          label="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <TextField
          fullWidth
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Expiry Date"
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Row 3: Products */}
      <Typography variant="h6" mt={2}>
        Products
      </Typography>
      {products.map((product, index) => (
        <Box key={index} sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            label="Item Name"
            value={product.itemName}
            onChange={(e) =>
              handleProductChange(index, "itemName", e.target.value)
            }
            fullWidth
          />
          <TextField
            label="Description"
            value={product.description}
            onChange={(e) =>
              handleProductChange(index, "description", e.target.value)
            }
            fullWidth
          />
          <TextField
            label="Quantity"
            type="number"
            value={product.quantity}
            onChange={(e) =>
              handleProductChange(index, "quantity", e.target.value)
            }
            fullWidth
          />
          <TextField
            label="Price"
            type="number"
            value={product.price}
            onChange={(e) =>
              handleProductChange(index, "price", e.target.value)
            }
            fullWidth
          />
          <TextField
            label="Total"
            value={product.total}
            InputProps={{ readOnly: true }}
            fullWidth
          />
        </Box>
      ))}
      <Button variant="outlined" onClick={addProductField} sx={{ mb: 2 }}>
        Add Product
      </Button>

      <Divider sx={{ my: 2 }} />

      {/* Bottom Row */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Box>
          <Button variant="contained" onClick={handleSubmit}>
            Generate Bill
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={downloadInvoice}
            sx={{ ml: 2 }}
          >
            Download Invoice
          </Button>
        </Box>
        <Box sx={{ textAlign: "right" }}>
          <Typography>Subtotal: ₹{calculateSubtotal().toFixed(2)}</Typography>
          <Typography>Tax (19%): ₹{calculateTax(calculateSubtotal()).toFixed(2)}</Typography>
          <Typography variant="h6">
            Total: ₹{(calculateSubtotal() + calculateTax(calculateSubtotal())).toFixed(2)}
          </Typography>
        </Box>
      </Box>

      {/* Success Modal */}
      <Modal
        open={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            p: 3,
            bgcolor: "white",
            boxShadow: 24,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" mb={2}>
            Bill Generated Successfully!
          </Typography>
          <Button
            variant="contained"
            onClick={() => setIsSuccessModalOpen(false)}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default BillGenerator;
