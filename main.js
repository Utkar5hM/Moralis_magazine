console.log("hello");
// connect to Moralis server
Moralis.initialize("LFRB7Ryp3EK0V8RA7kAXkWB29Q7u1eVy4udOOL0x");
Moralis.serverURL = "https://aytgnmjjtwru.grandmoralis.com:2053/server";

let homepage = "http://127.0.0.1:5500/index.html";
if (Moralis.User.current() == null && window.location.href != homepage) {
  document.querySelector("body").style.display = "none";
  window.location.href = "index.html";
}

let login = async () => {
  await Moralis.authenticate().then(async function (user) {
    console.log("hehe logged in");
    user.set("name", document.getElementById("user-username".value));
    user.set("email", document.getElementById("user-email".value));
    await user.save();
    window.location.href = "dashboard.html";
  });
};

let logout = async () => {
  await Moralis.User.logOut();
  window.location.href = "index.html";
};

let getTransactions = async () => {
  console.log("get transactions clicked");
  const options = {
    chain: "rinkeby",
    address: "0xD7B8F5fF163aA851C0B45E449bbEBA838ADfa516",
  };
  const transactions = await Moralis.Web3API.account.getTransactions(options);
  console.log(transactions);
};
if (document.querySelector("#btn-logout") != null) {
  document.querySelector("#btn-logout").onclick = logout;
}

if (document.querySelector("#btn-login") != null) {
  document.querySelector("#btn-login").onclick = login;
}
if (document.querySelector("#get-transactions-link") != null) {
  document.querySelector("#get-transactions-link").onclick = getTransactions;
}

/* get-transactions-link
get-balances-link
get-nfts-link
*/
