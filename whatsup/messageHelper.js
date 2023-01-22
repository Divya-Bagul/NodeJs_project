var axios = require('axios');
var ACCESS_TOKEN ="67fd47ab51b34699a1822c669b5d3f99";
var PHONE_NUMBER_ID ="7283947790"
function sendMessage(data) {
  var config = {
    method: 'post',
    url: `http://truesender.xyz/wapp/api/send?apikey=67fd47ab51b34699a1822c669b5d3f99&mobile=7283947790&msg=testmsg`,
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    data: data
  };

  return axios(config)
}

function getTextMessageInput(recipient, text) {
  return JSON.stringify({
    "messaging_product": "whatsapp",
    "preview_url": false,
    "recipient_type": "individual",
    "to": recipient,
    "type": "text",
    "text": {
        "body": text
    }
  });
}

module.exports = {
  sendMessage: sendMessage,
  getTextMessageInput: getTextMessageInput
};