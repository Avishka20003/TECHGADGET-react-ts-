import { Response, Request } from "express";
import { AuthRequest } from "../middleware/auth";
import { OrderModel } from "../models/orderModel";
import { sendOrderConfirmationEmail } from "../utils/sendEmail"; 
import PDFDocument from "pdfkit";

export const placeOrder = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized! Please login first." });
    }

    const { customerName, shippingAddress, phone, items, totalAmount } = req.body;

    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    const currentYear = new Date().getFullYear();
    const uniqueInvoiceNumber = `INV-${currentYear}-${randomNumber}`;

    const newOrder = new OrderModel({
      invoiceNumber: uniqueInvoiceNumber,
      userId: req.user.sub, 
      customerName,
      shippingAddress,
      phone,
      items,
      totalAmount
    });

    const savedOrder = await newOrder.save();

    if (req.user && req.user.email) {
      sendOrderConfirmationEmail(req.user.email, savedOrder); 
    }

    res.status(201).json({
      message: "Order placed successfully..!",
      data: savedOrder
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to place order", error: err });
  }
};

export const getMyOrders = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const myOrders = await OrderModel.find({ userId: req.user.sub }).sort({ createdAt: -1 });

    res.status(200).json({ message: "ok", data: myOrders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch your orders" });
  }
};

export const getAllOrders = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized! Please login first." });
    }

    const orders = await OrderModel.find().sort({ createdAt: -1 });
    
    res.status(200).json({ message: "ok", data: orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch all orders" });
  }
};

export const cancelOrder = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;

    const order = await OrderModel.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found..!" });
    }

    if (order.userId.toString() !== req.user.sub) {
      return res.status(403).json({ message: "Forbidden! You can only cancel your own orders." });
    }

    if (order.status !== "Pending") {
      return res.status(400).json({ message: `Cannot cancel order! It is already ${order.status}.` });
    }

    order.status = "Cancelled";
    const updatedOrder = await order.save();

    res.status(200).json({ 
      message: "Order cancelled successfully..!", 
      data: updatedOrder 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to cancel order", error: err });
  }
};

export const updateOrderDetails = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params; 
    const { shippingAddress, phone } = req.body; 

    const order = await OrderModel.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found..!" });
    }

    if (order.userId.toString() !== req.user.sub) {
      return res.status(403).json({ message: "Forbidden! You can only update your own orders." });
    }

    if (order.status !== "Pending") {
      return res.status(400).json({ message: `Cannot update order details! It is already ${order.status}.` });
    }

    if (shippingAddress) order.shippingAddress = shippingAddress;
    if (phone) order.phone = phone;

    const updatedOrder = await order.save();

    res.status(200).json({ 
      message: "Order details updated successfully..!", 
      data: updatedOrder 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update order details", error: err });
  }
};

export const downloadInvoice = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id;
    const order = await OrderModel.findById(orderId).populate("items.gadgetId");

    if (!order) {
      return res.status(404).json({ message: "Order not found!" });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=Invoice-${order.invoiceNumber}.pdf`);

    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(res);

    doc.fillColor("#000000").fontSize(30).text("TECHGADGET", 50, 50, { bold: true }); 
    doc.fillColor("#666666").fontSize(10).text("INDUSTRIAL HARDWARE DIVISION", 50, 85);
    
    doc.fillColor("#000000").fontSize(11).text(`INVOICE_NO: ${order.invoiceNumber}`, 350, 55, { align: "right" });
    doc.text(`DATE: ${new Date(order.createdAt).toLocaleDateString()}`, 350, 70, { align: "right" });
    doc.text(`STATUS: ${order.status.toUpperCase()}`, 350, 85, { align: "right" });

    doc.moveTo(50, 110).lineTo(550, 110).strokeColor("#dc2626").lineWidth(2).stroke();

    doc.fillColor("#dc2626").fontSize(12).text("BILL_TO:", 50, 130, { bold: true });
    doc.fillColor("#000000").fontSize(10);
    doc.text(`NAME    : ${order.customerName}`, 50, 150);
    doc.text(`ADDRESS : ${order.shippingAddress}`, 50, 165);
    doc.text(`PHONE   : ${order.phone}`, 50, 180);

    let currentY = 220;

    doc.rect(50, currentY, 500, 25).fill("#dc2626");
    
    doc.fillColor("#ffffff").fontSize(10).font('Helvetica-Bold');
    doc.text("ITEM_DESCRIPTION", 60, currentY + 7, { width: 250 });
    doc.text("QTY", 320, currentY + 7, { width: 50, align: "center" });
    doc.text("PRICE", 390, currentY + 7, { width: 70, align: "right" });
    doc.text("TOTAL", 470, currentY + 7, { width: 70, align: "right" });

    currentY += 25; 
    doc.font('Helvetica'); 

    order.items.forEach((item: any, index: number) => {
      if (index % 2 === 0) {
        doc.rect(50, currentY, 500, 22).fill("#f0f0f0");
      }

      doc.fillColor("#000000").fontSize(10);
      doc.text(item.name, 60, currentY + 6, { width: 250 });
      doc.text(item.quantity.toString(), 320, currentY + 6, { width: 50, align: "center" });
      doc.text(`Rs. ${item.price}.00`, 390, currentY + 6, { width: 70, align: "right" });
      doc.text(`Rs. ${item.quantity * item.price}.00`, 470, currentY + 6, { width: 70, align: "right" });

      currentY += 22;
    });

    doc.moveTo(50, currentY).lineTo(550, currentY).strokeColor("#dc2626").stroke();
    currentY += 15;

    doc.fillColor("#dc2626").fontSize(14).font('Helvetica-Bold').text(
      `GRAND_TOTAL: LKR ${order.totalAmount}.00`, 
      300, 
      currentY, 
      { width: 250, align: "right" }
    );

  
    doc.moveTo(50, 700).lineTo(550, 700).strokeColor("#000000").stroke();
    doc.fillColor("#666666").fontSize(9).font('Helvetica').text(
      "SYSTEM_GENERATED_DOCUMENT | TECHGADGET_SECURE_TRANSACTION", 
      50, 
      715, 
      { align: "center" }
    );

    doc.end();
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate invoice PDF", error: error.message });
  }
};