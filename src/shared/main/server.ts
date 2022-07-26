import "dotenv/config";
import consoleStamp from "console-stamp";
import cors from "cors";
import http from "http";
import express from "express";

consoleStamp(console, { format: "(->).blue :date(yyyy/mm/dd HH:MM:ss).blue.bgBlack.underline" });

const app = express();
const server = http.createServer(app);

app.disable("x-powered-by");
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
app.use(express.json());

const PORT = process.env.PORT;
server.listen(PORT, () => {
	console.info(`Server is running on port ${PORT}...`);
});

export default server;