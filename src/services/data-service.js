import {fb} from '../config/firebase-config';
// import firebase from "firebase";

export async function uploadTransfer(from, to, date, email, places){
    try{
        // const ref = fb.firestore().collection("users").doc(uid);
        const collection = fb.firestore().collection("transfers");
        const response = await collection.add({
            from,
            to,
            date,
            email,
            places,
        })
        console.log("response is",response.id);
        // await ref.update({
        //     lotsIds:firebase.firestore.FieldValue.arrayUnion(response.id)
        // })

    }catch(error){
        return Promise.reject(error);
    }
}

// export async function getLots(){
//     try{
//         const collection = await fb.firestore().collection("lots").get();
//         const lots = collection.docs.map(doc => { return{ ...doc.data(),id:doc.id}})
//         console.log(lots);
//         return lots;
//     }catch(error){
//         return Promise.reject(error);
//     }
// }

// export async function getMyLots(uid){
//     try{
//         const lotsIds = (await fb.firestore().collection("users").doc(uid).get()).data().lotsIds;
//         var lots = [];
//         if(!lotsIds){
//             return lots;
//         }
//         console.log("My lots:",lots);
//         for(let i = 0; i < lotsIds.length; i++){
//             var lot = (await fb.firestore().collection("lots").doc(lotsIds[i]).get()).data();
//             lots.push({...lot,id:lotsIds[i]});
//         }
//         console.log(lotsIds);
//         return lots;
//     }catch(error){
//         return Promise.reject(error);
//     }
// }
//
//
// export async function getLotById(id){
//     try{
//         const lot = await fb.firestore().collection("lots").doc(id).get();
//         console.log({...lot.data(),id:id});
//         return {...lot.data(),id:id};
//     }catch(error){
//         return Promise.reject(error);
//     }
// }
// export async function deleteLotByid(uid,id){
//     try{
//         const snap = await fb.firestore().collection("lots").doc(id).collection("buyers").get();
//         const users = snap.docs.map(doc => doc.id);
//         console.log("deletedeeeeeee",users)
//         for(var i = 0; i < users.length;i++){
//             await unsubscribeFromLot(users[i],id);
//         }
//
//
//         const deleted = await fb.firestore().collection("lots").doc(id).delete();
//         const ref = fb.firestore().collection("users").doc(uid);
//         await ref.update({
//             lotsIds:firebase.firestore.FieldValue.arrayRemove(id)
//         })
//
//         // return deleted;
//     }catch(error){
//         return Promise.reject(error);
//     }
// }
//
//
// export async function checkBuying(uid,id){
//     if(!uid){
//         return false;
//     }
//     const doc =  await fb.firestore().collection("lots").doc(id).collection("buyers").doc(uid).get();
//     if(doc.exists){
//         console.log("купил уже");
//         return true;
//     }else{
//         console.log("еще не купил");
//         return false;
//     }
// }
//
// export async function subscribeOnLot(uid,id,amount){
//     amount = parseInt(amount);
//     try{
//         const isBought =await checkBuying(uid,id)
//         if(isBought){
//             throw "already bought";
//         }
//
//         const lot = await getLotById(id);
//
//         console.log("Gotted lot:",lot,"id of lot: ",id);
//
//         if(lot.amount + parseInt(amount) > lot.totalAmount){
//             throw "too big number";
//         }
//
//
//
//         const collection = fb.firestore().collection("lots").doc(id).collection("buyers");
//         await collection.doc(uid).set({amount});
//         const lotRef = fb.firestore().collection("lots").doc(id);
//         console.log();
//         if(lot.amount + amount === lot.totalAmount){
//             await lotRef.update({
//                 finished:true
//             })
//         }
//
//         await lotRef.update({
//             amount:firebase.firestore.FieldValue.increment(amount)
//         })
//
//
//         const userRef =  fb.firestore().collection("users").doc(uid);
//         await userRef.update({
//             groupIds:firebase.firestore.FieldValue.arrayUnion(id)
//         })
//     }catch(error){
//         return Promise.reject(error);
//     }
// }
//
// export async function unsubscribeFromLot(uid,id){
//     console.log("ID", id);
//     console.log("UID", uid);
//     const ref =  fb.firestore().collection("lots").doc(id).collection("buyers").doc(uid);
//     const amount =  parseInt((await ref.get()).data().amount);
//     console.log("AMOUNT", amount);
//
//     await ref.delete();
//     const lotRef = fb.firestore().collection("lots").doc(id);
//     await lotRef.update({
//         amount:firebase.firestore.FieldValue.increment(-amount),
//         finished:false
//     })
//
//
//     const userRef = fb.firestore().collection("users").doc(uid);
//     await userRef.update({
//         groupIds:firebase.firestore.FieldValue.arrayRemove(id)
//     })
// }
// export async function getMyGroups(uid){
//     try{
//         const lotsIds = (await fb.firestore().collection("users").doc(uid).get()).data().groupIds;
//         if(!lotsIds){
//             return [];
//         }
//         var lots = [];
//         for(let i = 0; i < lotsIds.length; i++){
//            var lot = (await fb.firestore().collection("lots").doc(lotsIds[i]).get()).data();
//            lots.push({...lot,id:lotsIds[i]});
//         }
//         console.log(lots);
//         return lots;
//     }catch(error){
//         return Promise.reject(error);
//     }
// }
