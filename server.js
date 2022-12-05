const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const dotenv = require("dotenv");
const route = process.env.PORT || 8888;

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: false, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.send("hello world");
});

app.get("/status", (req, res) => {
  res.send("Status OK");
});

app.post("/mail", async (req, res, next) => {
  const mailData = req.body.data;
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shipshapebear@gmail.com",
      pass: "xkdoamfdjqxvxxts",
    },
  });

  let mailOptions = {
    from: "Email template testing<shipshapebear@gmail.com>",
    to: mailData.email,
    subject: "Mail template",
    html: `<!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>Mail template</title>
            <style>
              .notification-box {
                max-width: 800px;
                margin: auto;
                padding: 30px;
                border: 1px solid #eee;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
                font-size: 16px;
                line-height: 24px;
                font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
                color: #000000;
              }
              .notification-box table {
                width: 100%;
                line-height: inherit;
                text-align: left;
              }
              .notification-box table td {
                padding: 5px;
                vertical-align: top;
              }
              .psacc-logo {
                width: 230px;
                height: auto;
                object-fit: contain;
                aspect-ratio: 16/9;
                margin: 0 auto;
              }
              .pickup-banner {
                width: 100%;
                height: auto;
                aspect-ratio: 16/9;
              }
        
              @media only screen and (max-width: 600px) {
              }
            </style>
          </head>
          <body>
            <div class="notification-box">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td colspan="2" style="text-align: center">
                    <img src="./psacc-logo.png" class="psacc-logo" alt="psacc-logo" />
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <img src="./pickup.png" class="pickup-banner" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <h1 style="font-size: 32px">Your cargo is now ready for pickup!</h1>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Hi @Model.CustomerName</p>
                  </td>
                </tr>
                <tr><td>
                  Your cargo is now ready for pickup at @Model.POD!
                    To know more details about the pickup location, please use the tracker by clicking the button below.
                    
                </td></tr>
              </table>
            </div>
          </body>
        </html>
        
              
        `,
  };

  transporter.sendMail(mailOptions, function (err, resu) {
    if (err) {
      res.send(err);
    } else {
      res.send("Email Sent <br>" + resu);
    }
  });
});

//close order

app.listen(route, () => {
  console.log("Server Started at", process.env.PORT || 8888);
});
