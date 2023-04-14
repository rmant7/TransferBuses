import { getNewDb } from "../config/build-config";
import { fb } from "../config/firebase-config";

const fireBaseCollection = getNewDb();
export const PAGE_SIZE = 15;
const ORDER_BY_FIELD = "_id";

function getUniqueId() {
  return Math.random() * Math.floor(Math.random() * Date.now());
}

function getFBCollection() {
  return fb.firestore().collection(fireBaseCollection);
}

function getNextTransfersQuery(pageSize) {
  return getFBCollection().orderBy(ORDER_BY_FIELD).limit(pageSize);
}

function getNextTransfersFromLastQuery(last, pageSize) {
  // delete lastTransfer.id;
  console.log("last: ", last);
  return getFBCollection().orderBy(ORDER_BY_FIELD).startAfter(last._id).limit(pageSize);
}

export async function getTransfersByFromCityId(fromCityId) {
  console.log(fromCityId);
  try {
    const collection = await getFBCollection().where("from", "==", fromCityId).get();
    const data = collection.docs.map((v) => {
      console.log(v.data());
      return v.data();
    });
    return data;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

export async function uploadTransfer(transfer) {
  if (!transfer.regularTrips) {
    delete transfer.regularTripsDays;
  }
  try {
    const collection = fb.firestore().collection(fireBaseCollection);
    const response = await collection.add({ ...transfer, _id: getUniqueId(), timestamp: Date.now() });
    console.log("response id", response.id);
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

export async function uploadNewTransfer(transfer) {
  const response = await getTransfersByFromCityId().add(transfer);
  console.log("response", response);
  return response;
}

export async function getTransfers() {
  try {
    const collection = await getNextTransfersQuery(PAGE_SIZE).get();
    // rewrite("transfers", "transfers-id-timestamp");
    // rewrite("dev-transfers", "dev-transfers-id-timestamp");
    const transfers = collection.docs.map((doc) => {
      return doc.data();
    });
    console.log("received transfers: ", transfers);
    return transfers;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

export async function getNextTransfers(last) {
  try {
    const collection = await getNextTransfersFromLastQuery(last, PAGE_SIZE).get();
    const transfers = collection.docs.map((doc) => {
      return doc.data();
    });
    console.log("next transfers: ", transfers);
    return transfers;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

async function rewrite(dbFrom, dbTo) {
  const c = await fb.firestore().collection(dbFrom).get();
  c.docs.forEach((v) => {
    console.log("old: ", v.data());
    const res = { ...v.data(), _id: getUniqueId(), timestamp: new Date().toJSON() };
    fb.firestore().collection(dbTo).add(res);
    console.log("new: ", res);
  });
}

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
