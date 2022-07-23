import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth';
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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
	if(!userAuth) return;

	const userDocRef = doc(db, 'users', userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);

	if(!userSnapshot.exists()){
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInformation});
		} catch(error) {
			console.log('error creating the user', error.message);
		}
	}

	return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if(!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if(!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);