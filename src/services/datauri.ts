import DatauriParser from "datauri/parser";
import { extname } from "path";

const parser = new DatauriParser();

export const formatFileData = (file: any) =>
  parser.format(extname(file.originalname).toString(), file.buffer);
