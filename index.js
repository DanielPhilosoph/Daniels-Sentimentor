
const SENTIM_API_LINK = "https://sentim-api.herokuapp.com/api/v1/";

async function analyzeText(text) {
    
    const respons = await fetch(`https://sentim-api.herokuapp.com/api/v1/`, 
        {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({'text':text,}),
        }
    )
    // Gets info and insert into 'data'
    const data = await respons.json();   
    
    // If error
    let errorMassage = "";
    if(!respons.ok){
        errorMassage = "Error! " + data.error
    }

    // Create returned object
    const resultObject = {
        type: data.result.type,
        polarity: data.result.polarity,
        error: errorMassage,
    }
    return resultObject;        
}


document.getElementById("submitButton").addEventListener("click", onClickHandel)


function onClickHandel(){
    let textToAnalyze = document.getElementsByName("userText").innerText
    let analyzedObject = await analyzeText(textToAnalyze);
    if(analyzedObject.error === ""){

    }
    else{
        // Error
        let resultP = document.getElementsById("resultP")
        resultP.innerText = analyzedObject.error;
    }
    
}
