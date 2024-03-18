document.getElementById("payForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const url = "http://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard";
  //getting the values from the user input
  const cardNum = document.getElementById("card-num").value;
  const exp_month = document.getElementById("month").value;
  const exp_year = document.getElementById("year").value;
  const cvv = document.getElementById("cvv").value;
  let month = new Date().getMonth() + 1;
  console.log(exp_year);
  //validation of expiration date
  let validExp = exp_year > 2023 || (exp_year == 2023 && exp_month >= month);

  //validation of card number
  const patt = /^(5[1-5][0-9]{14})$/;
  let validNum = cardNum.match(patt);
  //validation of the cvv
  let validCVV = cvv.match(/^([0-9]{3,4})$/);

  if (validNum && validExp && validCVV) {
    //putting valid user input into data object
    data = {
      master_card: parseInt(cardNum),
      exp_year: parseInt(exp_year),
      exp_month: parseInt(exp_month),
      cvv_code: cvv,
    };
    console.log(JSON.stringify(data));
    //fetching the api with POST method and assigning the data object to the body
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          throw "Bad data";
        } else {
          throw "Something went wrong";
        }

        //alerting the success message from the result JSON and calling successful function
      })
      .then((resJson) => {
        alert(resJson["message"]);
        successful(String(resJson["data"]["master_card"]));
      })
      .catch((error) => {
        alert(error);
      });
  } else {
    document.getElementById("formResp").innerHTML = "Invalid information";
  }
});
//getting the last four digits of the card number and direct the user to the success page, adding the last digits to the url
successful = (cNum) => {
  console.log(cNum.slice(-4));
  let lastDig = cNum.slice(-4);
  location.replace("success.html?" + lastDig);
};
