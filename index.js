// =====================================
//=========== Consts ===================
//======================================

const SENTIM_API_LINK = "https://sentim-api.herokuapp.com/api/v1/";

//======================================
// ============ Main Run ===============
//======================================
document.addEventListener("click", onClickHandel);
let resultP = document.querySelector("#resultP");
let loaderElement = document.querySelector("#loader");
let catStatus = document.querySelector("#http-status");



//========================================
//=============== functions ==============
//========================================

async function analyzeText(text) {   
    let respons;  
    let data;   
    const resultObject = {}; 
    // =============== specific error handle ====================
    // if(text.trim() === ''){
    //     resultObject["error"] = "Error! => Text cant be space or 'no text' ";
    //     statusCatPhoto("500");
    //     return resultObject;   
    // }

    //Loading...
    resultP.style.color = textColorByType("loading");
    loaderElement.style.display = 'block';
    resultP.innerText = "Loading......";

    respons = await fetch(SENTIM_API_LINK, 
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
    statusCatPhoto(respons.status);

    //Done loading    
    loaderElement.style.display = 'none';
    resultP.innerText = "";

    // If error    
    if(!respons.ok){
        resultObject["error"] = "Error! Something went wrong => " + respons.error;        
        return resultObject;         
    }    

    data = await respons.json();   
    
    // Create returned object
    resultObject['type'] = data.result.type;
    resultObject['polarity'] = data.result.polarity;
    resultObject["error"] = "";
    
    return resultObject;        
}

// ===> handles a click on screen <===
async function onClickHandel(event){
    let textToAnalyze = document.querySelector("#userText").value;
    if(event.target.id === "clearButton"){
        clear()
    }
    if(event.target.id === "submitButton")
    {        
        let analyzedObject = await analyzeText(textToAnalyze);
        if(analyzedObject.error === ""){            
            resultP.style.color = textColorByType(analyzedObject.type);
            resultP.innerText = `The text type is: ${analyzedObject.type} \nAnd the polarity is equal to ${analyzedObject.polarity}`;           
        }
        else{
            // Error             
            resultP.style.color = "black";          
            resultP.innerText = analyzedObject.error;
        }
    }
    
}

function clear(){
    resultP.innerText = "";
    document.querySelector("#userText").value = "";
    catStatus.style.display = 'none'; 
    catStatus.src = "";   
}

async function statusCatPhoto(status){    
    let link = 'https://http.cat/'+status;
    catStatus.src = link;
    catStatus.style.display = "block";
}

function textColorByType(type){
    if(type === "neutral"){
        return "gray";
    }
    else if(type === "negative"){
        return "red";
    }
    else if(type === "positive"){
        return "lightgreen";
    }
    else{
        return "black"
    }
}
