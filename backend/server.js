import app from "./app.js";
import cors from "cors";

const PORT = process.env.PORT || 8080;
app.use(cors());
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
