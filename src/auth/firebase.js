import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCbfA_mvN-XDG7NfpZ2FhTiidbTucDvb6w",
  authDomain: "prueba-auth-21f80.firebaseapp.com",
  projectId: "prueba-auth-21f80",
  storageBucket: "prueba-auth-21f80.firebasestorage.app",
  messagingSenderId: "1082230713450",
  appId: "1:1082230713450:web:b504b25f08f69f06972e13",
};

const app = initializeApp(firebaseConfig);

//////////////////////////////////////////////////////////////////////
///////////////// AUTENTICACIÓN DE USUARIOS FIREBASE//////////////////////////
//////////////////////////////////////////////////////////////////////

const provider = new GoogleAuthProvider();
const auth = getAuth();

export function crearUsuario(email, password){
    return(
        new Promise((res, rej) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                console.log("Credenciales", userCredential)
                const user = userCredential.user;
                console.log(user)
                res(user)
                // ...
            })
            .catch((error) => {
                console.log(error.code, error.message)
                const errorCode = error.code;
                const errorMessage = error.message;
                rej(error)
                // ..
            });
        })
    )
}

auth.useDeviceLanguage()
export function logearG(){
    signInWithPopup(auth, provider)
    .then((result) => {
        console.log("test", result)
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
        console.log("test error", error )
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
}

export function loginEmailPass(email, password){
    return(
        new Promise((res, rej) => {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                console.log("Credenciales", userCredential)
                const user = userCredential.user;
                console.log(user)
                res(user)
            })
            .catch((error) => {
                console.log(error.code)
                const errorCode = error.code;
                const errorMessage = error.message;
                rej(error)
            });
        })
    )
}
/////////////////////////////////////////////////////////////////
///////////////////// BASE DE DATOS FIRESTORE  //////// ////////
////////////////////////////////////////////////////////////////

import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";

const db = getFirestore(app);

export function crearProducto(name, imagen, price, description) {
    return new Promise(async (res, rej) => {
        try {
        const docRef = await addDoc(collection(db, "productos"), {
            name: name,
            imagen: imagen,
            price: price,
            description: description
        });

        console.log("Document written with ID: ", docRef.id);
        res(docRef)

        } catch (e) {
        console.error("Error adding document: ", e);
        rej(e)
        }
    });
}

export function obtenerProductos() {
    return(
        new Promise(async (res, rej) => {
                try {
                    const querySnapshot = await getDocs(collection(db, "users"));
                    
                    const resultados = querySnapshot.docs.map(doc => {
                        const data = doc.data();
                        return {
                            id: doc.id,
                            name: data.name,
                            imagen: data.image,
                            price: data.price,
                            description: data.description
                        };
                    });

                    res (resultados);
                } catch (error) {
                    console.error("Error al obtener los usuarios:", error);
                    rej (error);
                }
        })
    )
}

/*crearProducto("test", "url", 23, "klasjdklsajdsaldkklasdljka").then(() => {
    console.log("si")
}).catch((error) => {
    console.log(error)
})*/

/*obtenerProductos().then((prod) => {
    console.log(prod)
}).catch((error) => {
    console.log(error)
})*/