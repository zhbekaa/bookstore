//the function called onclick on the html page, adds "responsive" to the className of the element or removes it, 
//responsive className described in the css file
nav = () => {
    const e = document.getElementById("navbar");
  
        if (e.className == "navbar") {
            e.className += " responsive";
            document.getElementsByTagName('header').style = "margin-buttom: 0"
        } else {
            e.className = "navbar"
        }
    
}