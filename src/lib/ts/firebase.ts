// Firebase
import { initializeApp} from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyBp3sb7VaYx6PrlugxqI-phwncNoSjFiZ4',
    authDomain: 'diffusion-561b0.firebaseapp.com',
    projectId: 'diffusion-561b0',
    storageBucket: 'diffusion-561b0.appspot.com',
    messagingSenderId: '608701698816',
    appId: '1:608701698816:web:4c9b292a88c6778e6499e5',
    measurementId: 'G-CE1DMWW123'
};

initializeApp(firebaseConfig);

// Auth
export const provider = new GoogleAuthProvider();
export const auth = getAuth();

// Database
export const db = getFirestore();
