// var nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'divyabagultestmail@gmail.com',
//     pass: 'divyabagul@12345'
//   }
// });

// var mailOptions = {
//   from: 'divyabagultestmail@gmail.com',
//   to: 'divyapbagul@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };  

// transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });

const accountSid = 'ACf5f0146905ba19b28d1bebd6ba0604b2'; // Your Account SID from www.twilio.com/console
const authToken = '5174729404121f785e574aba656dc4af'; // Your Auth Token from www.twilio.com/console

const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

client.messages
  .create({
    body: 'Hello from Node',
    to: '+917283947790', // Text this number
    from: '+12679156830', // From a valid Twilio number
  })
  .then((message) => console.log(message.sid));



