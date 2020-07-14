import express, { Application, NextFunction, Request, Response } from "express";
import { config } from "./config/index";
import { CBD } from "./db/index";
import { FakeDB } from "./fakeDB/index";
import { bookingRoutes } from "./routes/v1/bookings";
import { rentalRoutes } from "./routes/v1/rentals";
import { usersRoutes } from "./routes/v1/users";

const { app: appConfig, db } = config;
const app: Application = express();

app.use(express.json());

app.use("/api/v1", usersRoutes);
app.use("/api/v1", rentalRoutes);
app.use("/api/v1", bookingRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  return res.status(err.status || 500).json({
    success: false,
    error: {
      type: err.type || "InternalError",
      errors: err.errors || [
        {
          path: "internal",
          message: "Something went wrong, please try again later!",
        },
      ],
      ...(!appConfig.IN_PROD ? { stack: err.stack } : {}),
    },
  });
});

CBD(db.MONGODB_URI)
  .then(() => {
    console.log("[ BookWithMe ] A database connection has been established!");
    if (!appConfig.IN_PROD) new FakeDB().init();
    return app.listen(appConfig.PORT);
  })
  .then(() => {
    console.log(
      `[ BookWithMe ] The server is running on http://localhost:${appConfig.PORT}!`
    );
  })
  .catch(() => process.exit());
