import {fb} from '../config/firebase-config'

export async function getUser(UID) {
    try{
        const ref = fb.firestore().collection('users').doc(UID);
        const doc = await ref.get();
        //console.log(doc.data());
    }
    catch(error){
        return Promise.reject(error)
    }
}