const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNo = process.env.TWILIO_PHONE_NO;
const client = require('twilio')(accountSid, authToken);

const sendSMS = async (receiverPhoneNo, body)=>{
    try{
        await client.messages.create({ body: body, from: phoneNo, to: receiverPhoneNo});
        console.log('SMS sent..');
    }catch(e){
        console.log(e);
    }
}

module.exports = sendSMS;