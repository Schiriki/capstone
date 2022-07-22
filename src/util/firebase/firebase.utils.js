import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyBEFkApRaxT7SnlIi7oSHY-nkz8gg34JdA",
	authDomain: "crwn-clothing-db-20ad4.firebaseapp.com",
	projectId: "crwn-clothing-db-20ad4",
	storageBucket: "crwn-clothing-db-20ad4.appspot.com",
	messagingSenderId: "243189338454",
	appId: "1:243189338454:web:722baeb6f9c33595e286f7"
	};
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, 'users', userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);

	if(!userSnapshot.exists()){
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, { displayName, email, createdAt});
		} catch(error) {
			console.log('error creating the user', error.message);
		}
	}

	return userDocRef;
}
