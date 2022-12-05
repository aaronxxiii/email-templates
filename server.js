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
  //const data = JSON.parse(req.body);

  
    const mailData = req.body.data;
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    let mailOptions = {
      from: "Email template testing<shipshapebear@gmail.com>",
      to: mailData.email,
      subject: "RPT E-Receipt",
      html:
        `<!DOCTYPE html><html><head><meta charset="utf-8" /><title>RPT Alitagtag e-receipt</title><style>.invoice-box {width: 800px;margin: auto;padding: 30px;border: 1px solid #eee;box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);font-size: 16px;line-height: 24px;font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;color: #555;}.invoice-box table {width: 100%;line-height: inherit;text-align: left;}.invoice-box table td {padding: 5px;vertical-align: top;}.invoice-box table tr td:nth-child(2) {text-align: right;}.invoice-box table tr.top table td {padding-bottom: 20px;}.invoice-box table tr.top table td.title {font-size: 45px;line-height: 45px;color: #333;}.invoice-box table tr.information table td {padding-bottom: 40px;}.invoice-box table tr.heading td {background: #eee;border-bottom: 1px solid #ddd;font-weight: bold;}.invoice-box table tr.details td {padding-bottom: 20px;}.invoice-box table tr.item td {border-bottom: 1px solid #eee;}.invoice-box table tr.item.last td {border-bottom: none;}.invoice-box table tr.total td:nth-child(2) {border-top: 2px solid #eee;font-weight: bold;}@media only screen and (max-width: 600px) {.invoice-box table tr.top table td {width: 100%;display: block;text-align: center;}.invoice-box table tr.information table td {width: 100%;display: block;text-align: center;}}/** RTL **/.invoice-box.rtl {direction: rtl;font-family: Tahoma, "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;}.invoice-box.rtl table {text-align: right;}.invoice-box.rtl table tr td:nth-child(2) {text-align: left;}</style></head><body><div class="invoice-box"><table cellpadding="0" cellspacing="0"><tr><td colspan="2" style="padding-bottom: 20px;"><h1 style="text-align: center; margin: 0 auto; ">Thank you for your payment!</h1></td></tr><tr class="top"><td colspan="2"><table><tr><td class="title"><img src="https://arpt-alitagtag.com/static/media/alitagtag-logo.7d65868a4dd0a1144a1c.png" style="width: 75px; max-width: 75px" /></td><td style="text-align: end">Invoice #: ` +
        mailData.invoice_no +
        ` <br />Date: ` +
        mailData.date +
        ` <br />Tax declaration no. ` +
        mailData.tax_declaration_no +
        `</td></tr></table></td></tr><tr class="information"><td colspan="2"><table><tr><td>ARPT Alitagtag<br /></td><td style="text-align: end"></td></tr></table></td></tr><tr class="heading"><td>Payment Method</td><td></td></tr><tr class="details"><td>Gcash</td></tr><tr class="heading"><td>Period covered</td><td>Price</td></tr><tr class="item"><td> </td><td> </td></tr><tr class="total"><td>` +
        mailData.period_covered +
        `</td><td>Total: ` +
        mailData.amount +
        `</td></tr></table></div></body></html>`,
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
