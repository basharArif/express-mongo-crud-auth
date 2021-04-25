const app = require("./app");
const connectDatabase = require("./config/database");

const dotenv = require("dotenv");

// Setting up config file
dotenv.config({ path: "app/config/config.env" });

connectDatabase();

app.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`);
});
