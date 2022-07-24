import { useState } from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth,signInAuthUserWithEmailAndPassword } from "../../util/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import './sign-in-form.styles.scss'

const defaultFormFields = {
	email: '',
	password: ''
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const handleChange = (event) => {
		const {name, value} = event.target;

		setFormFields({...formFields, [name] : value});
	};

	const resetFormFields = (() => {
		setFormFields(defaultFormFields);
	})

    const singInWithGoogle = async () => {
        const user = await signInWithGooglePopup();
    }

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await signInAuthUserWithEmailAndPassword(email,password);
			resetFormFields();
		} catch (error) {
			switch (error.code){
				case 'auth/wrong-password':
					alert('incorrect password for email');
					break;
				case 'auth/user-not-found':
					alert('no user associated with this email');
					break;
				default:
					console.log(error);
					break;
			}
		}

	}

	return (
		<div className="sign-up-container">
			<h2>Already have an account?</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput label="E-Mail" type="email" required name="email" onChange={handleChange} value={email}/>

				<FormInput label="Password" type="password" required name="password" onChange={handleChange} value={password}/>
				<div className="buttons-container">
					<Button type="submit">Sign In</Button>
					<Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={singInWithGoogle}>Google Sign In</Button>
				</div>
			</form>
		</div>
	)
}

export default SignInForm;