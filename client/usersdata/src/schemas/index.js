import * as yup from "yup"
const passwordRule=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const registerSchema=yup.object().shape(
    {
        username:yup.string().required("this field is required"),
        password:yup.string().min(3).matches(passwordRule,{message:"create stronger password"}).required("this field is required"),
        email:yup.string().email("please enter valid email").required("this is field is required")
    }
)

export default registerSchema