import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import compression from "compression";
import multer from "multer";
import cookieParser from "cookie-parser";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import User from "./models/User.js";
import PropertyDetails from "./models/Property.js";
import { v2 as cloudinary } from 'cloudinary';
import fileUpload from "express-fileupload";

dotenv.config();

const app = express();
const port = 8000;

app.use('/uploads', express.static('uploads'));

// app.use(compression());
app.use(express.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/', // Specify the temporary directory path
}));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://airbndweb.vercel.app","http://localhost:5173"],
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });


const upload = multer({ dest: 'uploads/' });




const secretKey = process.env.SECRET_KEY;
const saltRounds = 12;


async function hashPassword(password) {
  try {
    if (!password) {
      throw new Error("Password is empty or undefined");
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
}

async function verifyPassword(password, hashedPassword) {
  try {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
  } catch (error) {
    throw new Error("Error verifying password");
  }
}










// Routes

// Home route
app.get("/", (req, res) => {
  res.send("Hello");
});

// Route to get user information
app.get("/me", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.userId;

    const foundUser = await User.findById(userId);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const ResUserDoc = {
      isAuthenticated: true,
      id: foundUser._id,
      userEmail: foundUser.userEmail,
      username: foundUser.username,
      isOwner: foundUser.isOwner,
    };
    res.json(ResUserDoc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});

// Route to logout
app.get("/logout", async (req, res) => {
  try {
    res.cookie("jwt", "", { expires: new Date(0), secure: true, sameSite: "none" }).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error logging out:", error.message);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});









// Route to upload property photo and get preview
app.post("/preview", async (req, res) => {
  try {
    const file = req.files && req.files.propertyPhoto;
    if (!file) {
      throw new Error("No file uploaded");
    }
    // console.log("Uploaded file:", file);
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "property-photos",
      public_id: `property-photos/photo-${Date.now()}`,
    });

    console.log("Cloudinary upload result:", result);
    fs.unlink(file.tempFilePath, (err) => {
      if (err) {
        console.error("Error deleting temporary file:", err);
      } else {
        console.log("Temporary file deleted successfully");
      }
    });

    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});














// // Route to upload property photo and get preview
// app.post("/preview",upload.single("propertyPhoto"), async (req, res) => {
//   try {
//     const file = req.file;
//     console.log(file)
//     if (!file) {
//       throw new Error("No file uploaded");
//     }
//     const result = await cloudinary.uploader.upload(file.path, {
//       folder: "property-photos",
//       public_id: `property-photos/photo-${Date.now()}`,
//     });
//     res.json({ imageUrl: result.secure_url });


//     // const baseUrl = "http://localhost:8000/uploads/";
//     // const imageUrl = baseUrl + file.filename; // Construct the full URL
//     // res.json({ imageUrl: imageUrl });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "An internal server error occurred" });
//   }
// });




// Route to add a new property
app.post("/property", async (req, res) => {
    // console.log("req photo: ",req.body.propertyPhotos)
  try {
    const {
      title,
      location,
      details,
      price,
      numberOfGuests,
      wifi,
      parking,
      tv,
      radio,
      pets,
      entrance,
      propertyPhotos
    } = req.body;

    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, secretKey);
    const user = await User.findOne({ userEmail: decoded.userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const property = new PropertyDetails({
      title,
      location,
      details,
      price,
      numberOfGuests,
      wifi: wifi || false,
      parking: parking || false,
      tv: tv || false,
      radio: radio || false,
      pets: pets || false,
      entrance: entrance || false,
      propertyPhotos,
      user: user._id,
    });

    // Save the property document to the database
    await property.save();

    // Return the response
    res.status(201).json({
      property,
      photoUrls: propertyPhotos,
      message:"Property Created Successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});











// Route to get all properties
app.get("/properties", async (req, res) => {
  try {
    const properties = await PropertyDetails.find();
    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});




// Route to get properties by property ID
app.get("/properties/:propertyId", async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    const property = await PropertyDetails.findById(propertyId);

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});






// Route to update a property
app.put("/property/:propertyId", async (req, res) => {
  try {
    const propertyId = req.params.propertyId;

    const updateObj = req.body;

    const result = await PropertyDetails.updateOne({ _id: propertyId }, updateObj);

    if (result.nModified === 0) {
      return res.status(404).json({ error: "Property not found or not updated" });
    }

    res.json({ message: "Property updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});

















// Route to register a new user
app.post("/register", async (req, res) => {
  const { username, userEmail, password, isOwner } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const userDoc = await User.create({
      userEmail,
      password: hashedPassword,
      username,
      isOwner,
    });
    const ResUserDoc = {
      id: userDoc._id,
      userEmail: userDoc.userEmail,
      username: userDoc.username,
      isOwner: userDoc.isOwner,
    };
    const token = jwt.sign({ userId: userDoc._id ,userEmail: userDoc.userEmail }, secretKey);

    res
      .cookie("jwt", token, {
        httpOnly: true,
        sameSite:"none",
        secure:true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({ ResUserDoc, message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});








// Route to log in a user
app.post("/login", async (req, res) => {
  try {
    const { userEmail, password } = req.body;
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const user = await User.findOne({ userEmail });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordVerified = await verifyPassword(password, user.password);
    if (!passwordVerified) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const userDoc = {
      id: user._id,
      userEmail: user.userEmail,
      username: user.username,
      isOwner: user.isOwner,
    };

    const token = jwt.sign({ userId: user._id ,userEmail: user.userEmail }, secretKey);
    res
      .cookie("jwt", token, {
        httpOnly: true,
        sameSite:"none",
        secure:true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ userDoc, message: "User logged in successfully" });
  } catch (error) {
    console.error("Error logging in user:", error.message);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
