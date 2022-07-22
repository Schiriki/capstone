import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../../util/firebase/firebase.utils"
import SignUpForm from "../../sing-up-form/sign-up-form.component";

const SignIn = () => {

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <h1>
                Sign in Page
            </h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
            <SignUpForm />
        </div>
    )

}

export default SignIn