/**
 * Add a collection
 */
await db.collection('chats').add({
    chatName: input,
}).then(() =>{
    navigation.goBack()
}).catch((error) => {alert(error)})

/**
 * Get all documents on a collection.
 */
const unsubscribe = await db.collection('chats').onSnapshot(snapshot => (
    setChats(snapshot.docs.map(doc => ({
        id : doc.id,
        data : doc.data()
    })))
))