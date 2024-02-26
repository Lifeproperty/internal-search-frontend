import {initializeApp} from "firebase/app";
import {getAuth} from "@firebase/auth";
import {
    fireBaseApiKey,
    fireBaseAppId,
    fireBaseAuthDomain,
    fireBaseMessagingSenderId,
    fireBaseProjectId,
    fireBaseStorageBucket
} from "@/constants/environment";

const firebaseConfig = {
    apiKey: fireBaseApiKey,
    authDomain: fireBaseAuthDomain,
    projectId: fireBaseProjectId,
    storageBucket: fireBaseStorageBucket,
    messagingSenderId: fireBaseMessagingSenderId,
    appId: fireBaseAppId
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

