const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken");
// const cookie = require("cookie");
const { json } = require("body-parser");
const bcrypt = require("bcrypt");
const bodyparser = require("body-parser");
const multer = require("multer");
const path = require("path");
const nodemailer = require('nodemailer');

const port = 3001;

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "shopping",
});

app.use(
  cors({
    // origin: ["http://localhost:3000/"],
    // methods: ['GET','PUT','POST','DELETE'],
    // credentials: true,
  })
);
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("Public"));

db.connect((err) => {
  if (err) {
    console.error("Error Connecting to MYSQL " + err);
    return;
  }
  console.log("MYSQL is coonected.....");
});



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'nvtank0000@gmail.com',
      pass: 'vudg tlsl njzl lzug'  
  }
});

function sendConfirmationEmail(email) {
  const mailOptions = {
    from: 'nvtank0000@gmail.com',
    to: email,
    subject: 'Registration Confirmation',
    text: `Thank you for Joining with Online Shopping Center!\n\nYour account is now active. You can login now.\n\nAdditional Information:\nEmail:onlinecente@gmail.com\nPhone: 123-456-7890`,
    attachments: [
      {
        path: '\logo.jpg'
      }
    ],
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.error('Error sending confirmation email:', error);
    } else {
      console.log('Confirmation email sent:', info.response);
    }
  });
}




app.post('/send-email', (req, res) => {
  // console.log('Request body:', req.body); // Log request body
  const { to, subject, message } = req.body;

  // Ensure that the 'to' field is provided and valid
  if (!to || typeof to !== 'string' || !to.trim()) {
    return res.status(400).json({ success: false, message: 'Invalid recipient email address' });
  }

  // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'nvtank0000@gmail.com', // Your Gmail email address
          pass: 'vudg tlsl njzl lzug' // Your Gmail password
        }
      });

  // Define email options
  const mailOptions = {
    from: 'nvtank0000@gmail.com', // Sender address
    to: to, // Recipient address
    subject: subject,
    text: message
  };

  

  //// Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, message: 'Failed to send email' });
    } else {
      console.log('Email sent:', info.response);
      res.json({ success: true, message: 'Email sent successfully' });
    }

    // transporter.sendMail(mailOptions, function(error, info) {
    //   if (error) {
    //     console.error('Error sending confirmation email:', error);
    //   } else {
    //     console.log('Confirmation email sent:', info.response);
    //   }
  });
});








// app.post("/send-email", (req, res) => {
//   const { to, subject, message } = req.body;

//   // Ensure that the 'to' field is provided and valid
//   if (!to || typeof to !== "string" || !to.trim()) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Invalid recipient email address" });
//   }

//   // Create a transporter object using SMTP transport
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "nvtank0000@gmail.com", // Your Gmail email address
//       pass: "vudg tlsl njzl lzug", // Your Gmail password
//     },
//   });

//   // Define email options
//   const mailOptions = {
//     from: "nvtank0000@gmail.com", // Sender address
//     to: to, // Recipient address
//     subject: subject,
//     text: message,
//   };

//   // Send email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error("Error sending email:", error);
//       res
//         .status(500)
//         .json({ success: false, message: "Failed to send email" });
//     } else {
//       console.log("Email sent:", info.response);
//       res.json({ success: true, message: "Email sent successfully" });
//     }
//   });
// });





// Admin login authentication
app.post("/adminLogin", (req, res) => {
  const insertdata =
    "SELECT * from  adminlogin WHERE email = ? AND password =?";
  db.query(insertdata, [req.body.email, req.body.password], (err, result) => {
    if (err) {
      return res.json({ loginStatus: false, Error: "Query Error...." });
    }
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email },
        "admin_jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie("token", token);
      return res.json({ loginStatus: true });
    } else {
      return res.json({
        loginStatus: false,
        Error: "Wrong email and password",
      });
    }
  });
});

// Seller login authentication
app.post("/sellerLogin", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const selectQuery = "SELECT email, password FROM seller WHERE email = ?";

  db.query(selectQuery, [email], (err, result) => {
    if (err) {
      return res.json({ loginStatus: false, Error: "Query Error" });
    }
    if (result.length > 0) {
      const hashedPassword = result[0].password;

      // Compare passwords using bcrypt's compare method
      bcrypt.compare(password, hashedPassword, (bcryptErr, bcryptResult) => {
        if (bcryptErr) {
          return res.json({
            loginStatus: false,
            Error: "Password comparison error",
          });
        }
        if (bcryptResult) {
          // Passwords match, perform login actions
          // For example, generate JWT token
          const token = jwt.sign(
            { role: "seller", email: email },
            "seller_jwt_secret_key",
            { expiresIn: "1d" }
          );
          res.cookie("token", token);
          return res.json({ loginStatus: true });
        } else {
          // Passwords do not match
          return res.json({
            loginStatus: false,
            Error: "Wrong email and password",
          });
        }
      });
    } else {
      // No user found with the provided email
      return res.json({
        loginStatus: false,
        Error: "Wrong email and password",
      });
    }
  });
});

// user login authentication
app.post("/userLogin", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const selectQuery = "SELECT email, password FROM userdetails WHERE email = ?";

  db.query(selectQuery, [email], (err, result) => {
    if (err) {
      return res.json({ loginStatus: false, Error: "Query Error" });
    }
    if (result.length > 0) {
      const hashedPassword = result[0].password;

      // Compare passwords using bcrypt's compare method
      bcrypt.compare(password, hashedPassword, (bcryptErr, bcryptResult) => {
        if (bcryptErr) {
          return res.json({
            loginStatus: false,
            Error: "Password comparison error",
          });
        }
        if (bcryptResult) {
          // Passwords match, perform login actions
          // For example, generate JWT token
          const token = jwt.sign(
            { role: "user", email: email },
            "user_jwt_secret_key",
            { expiresIn: "1d" }
          );
          res.cookie("token", token);
          return res.json({ loginStatus: true });
        } else {
          // Passwords do not match
          return res.json({
            loginStatus: false,
            Error: "Wrong email and password",
          });
        }
      });
    } else {
      // No user found with the provided email
      return res.json({
        loginStatus: false,
        Error: "Wrong email and password",
      });
    }
  });
});

// show category
app.get("/category", (req, res) => {
  const sqlGet = "SELECT * FROM category";
  db.query(sqlGet, (err, data) => {
    // console.log(err);
    // console.log("data", data);
    res.send(data);
  });
});

// Add category
app.post("/add_category", (req, res) => {
  const sql = "INSERT INTO category (`name`) VALUES (?)";
  db.query(sql, [req.body.category], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Input is Mandatory" });
    return res.json({ Status: true ,message: "Category added successfully" });

    
  });
});

// Add seller ragistation
app.post("/add_seller", (req, res) => {
  const sql = `INSERT INTO seller (name, email, password, contact, address, category_id) VALUES (?)`;
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      console.error("Hashing Error:", err);
      return res.json({ Status: false, Error: "Hashing Error" });
    }
    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.contact,
      req.body.address,
      req.body.category_id,
    ];
    db.query(sql, [values], (err, result) => {
      if (err) {
        console.error("MySQL insert error:", err);
        return res.json({ Status: false, Error: "Query Error" });
      }
      console.log("Seller added successfully:");
      sendConfirmationEmail(req.body.email);
      return res.json({ Status: true });

      
    });
  });
});

// Add user ragistation
app.post("/add_user", (req, res) => {
  const sql = `INSERT INTO userdetails (name, email, password, contact, address,  gender) VALUES (?)`;
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      console.error("Hashing Error:", err);
      return res.json({ Status: false, Error: "Hashing Error" });
    }
    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.contact,
      req.body.address,
      req.body.gender,
    ];
    db.query(sql, [values], (err, result) => {
      // if (err) {
      //   console.error("Query Error:", err);
      //   return res.json({ Status: false, Error: "Query Error" });
      // }
      // else{
      //   sendConfirmationEmail(req.body.email);
      //   return res.json({ Status: true, message: "User added successfully" });
      // }
      if (err) {
        console.error("MySQL insert error:", err);
        return res.json({ Status: false, Error: "Query Error" });
      }
      console.log("User added successfully");
      sendConfirmationEmail(req.body.email);
      return res.json({ Status: true, message: "User added successfully" });
    });
  });
});

// image Upload
const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "Public/Images");
  },
  filename: (req, file, cd) => {
    cd(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});
//end image Upload

// Add product
app.post("/add_product", upload.single("image"), (req, res) => {
  const sql = `INSERT INTO productdetails (product_name, product_description, product_price, product_quantity, image) VALUES (?)`;
  const values = [
    req.body.name,
    req.body.description,
    req.body.price,
    req.body.quantity,
    req.file.filename,
  ];
  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error("Query Error:", err);
      return res.json({ Status: false, Error: "Query Error" });
    }
    console.log("Product added successfully");

    return res.json({ Status: true, message: "Product added successfully" });
  });
});

// show product
app.get("/get_product", (req, res) => {
  const sqlGet = "SELECT * FROM productdetails";
  db.query(sqlGet, (err, data) => {
    if (err) {
      return console.log(err);
    }
    res.send(data);
  });
});

// show single data
app.get("/edit_product/:product_id", (req, res) => {
  const product_id = req.params.product_id;
  const sqlGet = "SELECT * FROM productdetails WHERE product_id = ?";
  db.query(sqlGet, [product_id], (err, data) => {
    if (err) {
      console.error("Query Error:", err);
      return res.status(500).json({ Status: false, Error: "Query Error" });
    }
    if (data.length === 0) {
      // No product found with the given product_id
      return res
        .status(404)
        .json({ Status: false, Error: "Product not found" });
    }
    // Product found, send the product details back to the client
    res.json({ Status: true, Result: data });
  });
});

//Update the Product
app.put("/edit_products/:product_id", (req, res) => {
  const product_id = req.params.product_id;
  const { name, description, price, quantity } = req.body;

  const sqlPut = `UPDATE productdetails 
                  SET product_name = ?, product_description = ?, 
                      product_price = ?, product_quantity = ?
                  WHERE product_id = ?`;
  const values = [name, description, price, quantity, product_id];

  db.query(sqlPut, values, (err, result) => {
    if (err) {
      return res.json({
        status: false,
        Error: "Failed to update product data",
      });
    }
    console.log("Product updated successfully");
    return res.json({ status: true, message: "Product updated successfully" });
  });
});

//Delete product
app.delete("/delete_product:product_id", (req, res) => {
  const product_id = req.params.product_id;
  const sql = "delete from productdetails where product_id =?";
  db.query(sql, [product_id], (err, result) => {
    if (err) {
      console.error("Query Error:", err);
      return res.json({
        status: false,
        Error: "Failed to delete product data",
      });
    }
    console.log("Product delete successfully");
    return res.json({ status: true, message: "Product delete successfully" });
  });
});

//total user count
app.get("/user_count", (req, res) => {
  const sql = `SELECT count(iduserdetails) as userData FROM userdetails`;
  db.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error " + err });
    return res.json({ Status: true, Result: result });
  });
});

//total product count
app.get("/product_count", (req, res) => {
  const sql = `SELECT count(product_id) as productcount FROM productdetails`;
  db.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error " + err });
    return res.json({ Status: true, Result: result });
  });
});

//total seller count
app.get("/seller_count", (req, res) => {
  const sql = `SELECT count(id) as sellerData FROM seller`;
  db.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error " + err });
    return res.json({ Status: true, Result: result });
  });
});

//get seller
app.get("/get_seller", (req, res) => {
  const sqlGet = "SELECT * FROM seller";
  db.query(sqlGet, (err, data) => {
    if (err) {
      return console.log(err);
    }
    res.send(data);
  });
});

//Delete product
app.delete("/delete_seller:product_id", (req, res) => {
  const product_id = req.params.product_id;
  const sql = "delete from seller where id =?";
  db.query(sql, [product_id], (err, result) => {
    if (err) {
      console.error("Query Error:", err);
      return res.json({
        status: false,
        Error: "Failed to delete product data",
      });
    }
    console.log("Seller delete successfully");
    return res.json({ status: true, message: "Seller delete successfully" });
  });
});

//show singal seller data
app.get("/edit_seller/:id", (req, res) => {
  const id = req.params.id;
  const sqlGet = "SELECT * FROM seller WHERE id = ?";
  db.query(sqlGet, [id], (err, data) => {
    if (err) {
      console.error("Query Error:", err);
      return res.status(500).json({ Status: false, Error: "Query Error" });
    }
    if (data.length === 0) {
      return res.status(404).json({ Status: false, Error: "seller not found" });
    }
    res.json({ Status: true, Result: data });
  });
});

//Update Seller detils
app.put("/edit_seller/:id", (req, res) => {
  const id = req.params.id;
  const { name, email, contact, address, category_id } = req.body;

  const sqlPut = `UPDATE seller 
                  SET name = ?, email = ?, 
                      contact = ?, address = ?,category_id=?
                  WHERE id = ?`;
  const values = [name, email, contact, address, category_id, id];

  db.query(sqlPut, values, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error " + err });
    return res.json({
      Status: true,
      Result: result,
      message: "Seller details update successfully",
    });
  });
});

// show single data category
app.get("/edit_category/:id", (req, res) => {
  const id = req.params.id;
  const sqlGet = "SELECT * FROM category WHERE id = ?";
  db.query(sqlGet, [id], (err, data) => {
    if (err) {
      console.error("Query Error:", err);
      return res.status(500).json({ Status: false, Error: "Query Error" });
    }
    if (data.length === 0) {
      return res
        .status(404)
        .json({ Status: false, Error: "Category not found" });
    }
    
    res.json({ Status: true, Result: data });
  });
});

//Update the category
app.put("/edit_categorys/:id", (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  const sqlPut = `UPDATE category 
                  SET name = ?
                  WHERE id = ?`;
  const values = [name, id];

  db.query(sqlPut, values, (err, result) => {
    if (err) {
      console.error("Query Error:", err);
      return res.json({
        status: false,
        Error: "Failed to update category data",
      });
    }
    console.log("Category updated successfully");
    return res.json({ status: true, message: "Category updated successfully" });
  });
});

//Delete product
app.delete("/delete_category/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM category WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Query Error:", err);
      return res.json({
        status: false,
        Error: "Failed to delete category data",
      });
    }
    console.log("Category deleted successfully");
    return res.json({ status: true, message: "Category deleted successfully" });
  });
});

// // show product
// app.get("/get_product/:id", (req, res) => {
//   const id = req.params.id;
//   const sqlGet = "SELECT * FROM productdetails WHERE product_id = ?";
//   db.query(sqlGet,[id], (err, data) => {
//     if (err) {
//       return console.log(err);
//     }
//     res.send(data);
//   });
// });

app.listen(port, () => {
  console.log("Server Start is Port Number " + port);
});
