import { Request, Response } from "express";
import { GadgetModel } from "../models/gadgetModel";

export const saveGadget = async (req: Request, res: Response) => {
  try {
    const newGadget = new GadgetModel(req.body);
    const savedGadget = await newGadget.save();
    res
      .status(200)
      .json({ message: "Gadget saved successfully...", data: savedGadget });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save gadget...", error: err });
  }
};

export const deleteGadget = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const gadget = await GadgetModel.findByIdAndDelete(id);

    if (!gadget) {
      return res.status(404).json({ message: "Gadget not found..." });
    }

    res.status(200).json({ message: "Gadget deleted successfully..." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete gadget...", error: err });
  }
};

export const updateGadget = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updatedGadget = await GadgetModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedGadget) {
      return res.status(404).json({ message: "Gadget not found..." });
    }
    res.status(200).json({ message: "Gadget updated successfully...", data: updatedGadget });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update gadget..." });
  }
};

export const getAllGadgets = async (req: Request, res: Response) => {
  try {
    const gadgets = await GadgetModel.find();
    res.status(200).json({ message: "ok", data: gadgets });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to retrieve gadgets...", error: err });
  }
};

export const getGadgetByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const gadget = await GadgetModel.findById(id);

    if (!gadget) {
      return res.status(404).json({ message: "Gadget not found" });
    }

    res.status(200).json({ message: "ok", data: gadget });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch gadget..!", error: err });
  }
};