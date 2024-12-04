import { app } from "./App.js";
import { CheckConnection } from "./Config/db.js";
import userRouter from "./Routes/static.routes.js";
import {createAllTable} from './Utils/dbUtils.js';
const app = express();
app.use(express.json());

// API Routes
app.use("/api/v1", userRouter);


// Connect Start Server
CheckConnection()
  .then(() => {
    app.listen(3000, async() => {
      await createAllTable()
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
