const adminEmail = "test@test.com";
const pass = "123456";

import {Login} from "./logUser";

let logUserIn = new Login;

   it("login test", async function() {
    await logUserIn.login("test@test.com", "123456");
    //console.log("Token 2", logUserIn.token, logUserIn.adminLoginResp, "blabla");
})