import emailjs from '@emailjs/browser'

export const SendMail = async (data) => {

    const { name, object, to_email, to_name, message, email } = data

    emailjs.send("service_5fm302u", "template_79hfmob", {
        name, object, to_email, to_name, message, email
    }, "bN50q8M2Knnn5yF1i")
}
