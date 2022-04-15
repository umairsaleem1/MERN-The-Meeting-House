const sgMail = require('@sendgrid/mail');
var Mailgen = require('mailgen');
const { baseURL } = require('./baseURL');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);



const sendEmail = (name, receiver, resetLink, otp)=>{

    // Configure mailgen by setting a theme and your product info
    var mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            // Appears in header & footer of e-mails
            name: 'The Meeting House',
            link: baseURL
        }
    });


    // Generating content(data)
    const resetEmailContent = {
        body: {
            name: name,
            intro: 'You have received this email because a password reset request for your account was received.',
            action: {
                instructions: 'Click the button below to reset your password:',
                button: {
                    color: '#22BC66',
                    text: 'Reset your Password',
                    link: resetLink
                }
            },
            outro: 'If you did not request a password reset, no further action is required on your part.'
        }
    };

    // Generating content(data)
    const otpEmailContent = {
        body: {
            name: name,
            intro: 'You have received this email because an otp code request for your account was received.',
            action: {
                instructions: 'Your otp code is:',
                button: {
                }
            },
            outro: otp
        }
    };

    // Generating an HTML email Template with the provided contents
    let emailTemplate;
    if(resetLink){
        emailTemplate = mailGenerator.generate(resetEmailContent); 
    }else{
        emailTemplate = mailGenerator.generate(otpEmailContent);
    }








    const msg = {
        to: receiver,
        from: process.env.SENDER_EMAIL,
        subject: 'Hello from The Meeting House',
        html: emailTemplate,
    };


    (async () => {
        try {
          await sgMail.send(msg);
          console.log('Email sent...');
          
        } catch (error) {
          console.error(error.message);
          throw new Error(error);
        }
    })();
}


module.exports = sendEmail; 