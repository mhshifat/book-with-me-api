import { connect } from "mongoose";

export const CBD = (uri: string) =>
  connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
