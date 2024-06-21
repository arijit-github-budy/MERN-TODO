class EmailValidation{
    constructor(){}

    static EmailValidate = async (email) => {
        try {
            let emailValStatus = true;
            const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            if (!email) throw new Error("Email is not available or invalid.");

            if(!String(email).trim().toLowerCase().match(mailformat)){
                emailValStatus = false;
            }   

            return emailValStatus;
        } catch (error) {
            console.log(error);
            throw new Error(error)
        }
    }
}

export default EmailValidation;