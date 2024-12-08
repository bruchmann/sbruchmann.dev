import compression from "compression";
import { createServer } from "node:http";
import express from "express";
import favicon from "express-favicon";
import { dirname as getDirectoryName, resolve as resolvePath } from "node:path";
import { fileURLToPath } from "node:url";
import helmet from "helmet";

process.on("uncaughtException", (err) => {
	console.error(err);
	process.exit(1);
});

process.on("unhandledRejection", (err) => {
	console.error(err);
	process.exit(1);
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = getDirectoryName(__filename);

const app = express();
app.use(compression());
app.use(
	helmet.contentSecurityPolicy({
		useDefaults: true,
		directives: {
			"script-src": ["'self'", "sbruchmann.dev"],
			"style-src": null,
		},
	})
);
app.use(favicon(resolvePath(__dirname, "public", "favicon.png")));
app.use(express.static(resolvePath(__dirname, "public")));

const port = process.env.PORT || 3000;
const server = createServer(app);
server.listen(port, (err) => {
	if (err) {
		console.error(err);
		process.exit(1);
	} else {
		console.log(`Listening on port ${port}`);
	}
});
