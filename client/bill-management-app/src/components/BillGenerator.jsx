import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCustomer } from "../slices/customersSlice";
import { Box, TextField, Button, Typography, Modal, Divider } from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";

const BillGenerator = () => {
  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");
  const [year, setYear] = useState("");
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [products, setProducts] = useState([
    { itemName: "", description: "", quantity: "", price: "", total: "" }, // Default product row
  ]);
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
    if (!customerName || !customerMobile || !year || !date || !expiryDate) {
      alert("Please fill in all required fields.");
      return;
    }

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
    const doc = new jsPDF();
  
    // Title
    doc.setFontSize(18);
    doc.text("Invoice", 105, 10, null, null, "center");
  
    // Customer Details
    doc.setFontSize(12);
    doc.text(`Customer Details:`, 10, 20);
    doc.text(`Name: ${customerName}`, 10, 30);
    doc.text(`Mobile: ${customerMobile}`, 10, 40);
    doc.text(`Year: ${year}`, 10, 50);
    doc.text(`Status: ${status}`, 10, 60);
  
    // Note and Dates
    doc.text(`Note: ${note}`, 10, 70);
    doc.text(`Date: ${date}`, 10, 80);
    doc.text(`Expiry Date: ${expiryDate}`, 10, 90);
  
    // Add Table for Products
    const productRows = products.map((product) => [
      product.itemName,
      product.description,
      product.quantity,
      product.price,
      product.total,
    ]);
  
    doc.autoTable({
      startY: 100,
      head: [["Item Name", "Description", "Quantity", "Price", "Total"]],
      body: productRows,
    });
  
    // Add Total Section
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    const total = subtotal + tax;
  
    const finalY = doc.previousAutoTable.finalY + 10; // Position below the table
    doc.text(`Subtotal: ${subtotal.toFixed(2)}`, 10, finalY);
    doc.text(`Tax (19%): ${tax.toFixed(2)}`, 10, finalY + 10);
    doc.text(`Total: ${total.toFixed(2)}`, 10, finalY + 20);
  
    // Save PDF
    doc.save(`invoice_${customerName}_${date}.pdf`);
  };
  
  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: "auto",
        p: 3,
        boxShadow: 2,
        mt: 4,
        backgroundColor: "white",
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" mb={2} textAlign="center">
        Bill Generator
      </Typography>
  
      {/* Customer Details */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          mb: 2,
        }}
      >
        <TextField
          fullWidth
          label="Customer Name *"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Mobile Number *"
          value={customerMobile}
          onChange={(e) => setCustomerMobile(e.target.value)}
          required
        />
      </Box>
  
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          mb: 2,
        }}
      >
        <TextField
          fullWidth
          label="Year *"
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </Box>
  
      {/* Note and Dates */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          mb: 2,
        }}
      >
        <TextField
          fullWidth
          label="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <TextField
          fullWidth
          label="Date *"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Expiry Date *"
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required
          InputLabelProps={{ shrink: true }}
        />
      </Box>
  
      <Divider sx={{ my: 2 }} />
  
      {/* Products Section */}
      <Typography variant="h6" mt={2}>
        Products
      </Typography>
      {products.map((product, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            mb: 2,
          }}
        >
          <TextField
            label="Item Name"
            value={product.itemName}
            onChange={(e) => handleProductChange(index, "itemName", e.target.value)}
            fullWidth
          />
          <TextField
            label="Description"
            value={product.description}
            onChange={(e) => handleProductChange(index, "description", e.target.value)}
            fullWidth
          />
          <TextField
            label="Quantity"
            type="number"
            value={product.quantity}
            onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
            fullWidth
          />
          <TextField
            label="Price"
            type="number"
            value={product.price}
            onChange={(e) => handleProductChange(index, "price", e.target.value)}
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
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Box sx={{ mb: { xs: 2, sm: 0 } }}>
          <Button variant="contained" onClick={handleSubmit}>
            Generate Bill
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={downloadInvoice}
            sx={{ ml: { sm: 2 }, mt: { xs: 2, sm: 0 } }}
          >
            Download Invoice
          </Button>
        </Box>
        <Box sx={{ textAlign: { xs: "left", sm: "right" }, mt: 1 }}>
          <Typography sx={{ mb: 1 }}>
            Subtotal: ₹{calculateSubtotal().toFixed(2)}
          </Typography>
          <Typography sx={{ mb: 1 }}>
            Tax (19%): ₹{calculateTax(calculateSubtotal()).toFixed(2)}
          </Typography>
          <Typography variant="h6">
            Total: ₹{(calculateSubtotal() + calculateTax(calculateSubtotal())).toFixed(2)}
          </Typography>
        </Box>
      </Box>
  
      {/* Success Modal */}
      <Modal open={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)}>
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
          <Button variant="contained" onClick={() => setIsSuccessModalOpen(false)}>
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}  

export default BillGenerator;
