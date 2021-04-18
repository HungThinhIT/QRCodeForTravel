import {auth} from "./firebase"
let signOut;
auth.signOut().then(() => signOut==true);
export {signOut};