import{getAuth} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";

import { getDatabase, ref, set, child, push, update, onValue } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";

export function LoginWithCookie(){
    
    console.error("allow only the user ID list to be read without a valid cookie");
    
    const auth = getAuth();
    
    const db = getDatabase();
    
     const poems = ref(db, 'characters/berin/heardPoems');
    onValue(poems, (snapshot) => {
        const data = snapshot.val();

        console.log(data);
    });
}