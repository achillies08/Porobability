for await (const doc of AccountTestData.find()) {
  fetchData = doc; // Prints documents one at a time
  console.log("Puuid: ", fetchData.accountData.puuid);
}
