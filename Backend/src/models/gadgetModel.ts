import { Document, model, Schema } from "mongoose";

interface IGadget extends Document {
  name: string;
  brand: string;     
  category: string;
  price: number;
  stock: number;
  imageURL: string;
  description: string;
  specs: string[];    
}

const gadgetSchema = new Schema<IGadget>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    imageURL: { type: String, required: true },
    description: { type: String, required: true },
    specs: { type: [String], required: true },
  },
  { timestamps: true }
);

export const GadgetModel = model<IGadget>("gadgets", gadgetSchema);