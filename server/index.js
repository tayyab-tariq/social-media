import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from "./routes/auth.js"
import { register } from "./controllers/auth.js"
import connectDB from "./config/db.js";

// CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
app.use(cookieParser());


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
connectDB();

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, file.originalname);
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post('/auth/register', upload.single('picture'), register);

/* ROUTES */
app.use('/auth', authRoutes);

/* Middlewares */
app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})