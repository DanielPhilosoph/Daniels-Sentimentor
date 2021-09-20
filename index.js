
const SENTIM_API_LINK = "https://sentim-api.herokuapp.com/api/v1/";

async function analyzeText(text) {   
    let respons;  
    let data;   
    const resultObject = {}; 
    if(text.trim() === ''){
        resultObject["error"] = "Error! => Text cant be space or 'no text' ";
        return resultObject;   
    }
    respons = await fetch(`https://sentim-api.herokuapp.com/api/v1/`, 
        {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({'text':text}),
        }
    )
    // Gets info and insert into 'data'
    data = await respons.json();       
    
    
    // If error    
    if(!respons.ok){
        resultObject["error"] = "Error! => " + respons.error;
        return resultObject;         
    }

    // Create returned object
    resultObject['type'] = data.result.type;
    resultObject['polarity'] = data.result.polarity;
    resultObject["error"] = "";
    
    return resultObject;        
}

document.addEventListener("click", onClickHandel);
let resultP = document.querySelector("#resultP");

async function onClickHandel(event){
    let textToAnalyze = document.querySelector("#userText").value;
    if(event.target.id === "submitButton")
    {        
        let analyzedObject = await analyzeText(textToAnalyze);
        if(analyzedObject.error === ""){
            console.log("worked"); 
            resultP.innerText = `The text type is: ${analyzedObject.type} \nAnd the polarity is equal to ${analyzedObject.polarity}`;           
        }
        else{
            // Error 
            console.log("Error");           
            resultP.innerText = analyzedObject.error;
        }
    }
    
}
