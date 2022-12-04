import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebase.config';

function SignIn() {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    }
    catch (error) {
      console.log(error);
    }
  };
  return (
    <GoogleButton onClick={handleGoogleSignIn} />
  );
}

export default SignIn;
