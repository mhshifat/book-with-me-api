import { Document, model, Schema } from "mongoose";

export interface IFileDocument {
  id: string;
  url: string;
  cloudinaryId: string;
}

const fileSchema = new Schema(
  {
    url: { type: String, required: true },
    cloudinaryId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

type FileModelType = IFileDocument & Document;

export const FileModel = model<FileModelType>("File", fileSchema);
