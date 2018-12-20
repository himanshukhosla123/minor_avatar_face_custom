var baseUrl = "https://myvoice.lyrebird.ai";
var basrUrlAvatar="https://avatar.lyrebird.ai"
var clientId = "1CM9vk2pHyykDzpesF878Ufyfiy";
// "1CJBAAIWXaFhfUxqB2lTQtga1sy";
var clientSecret = "$2a$10$m1F0SW07Aw/QlDmJKG4l6Oq1hbLrXhl7ylGpiwheH7XvUXM1i9or2";
// "$2a$10$5yapuzRSX/GzEiVbQzlOneSWNc5IBlY7ivwVV8nohPdQhrZ2G0pUi";
var encodedUrl="https%3A%2F%2Fhimanshukhosla123.github.io%2Fminor_avatar_face_custom%2Fapp%2Fstatic%2F";
var token=localStorage.getItem("acs");
var code="9818478695";

function voiceAuth(){
    if(!token){
      getToken();
    }
    else{
        generate("Hi Himanshu Khosla");
    }
}

$(document).ready(function(){
    console.log(localStorage.getItem("acs"));
    var tokenDetected=extractAccessToken(location.href)||token;
    console.log(tokenDetected);
    if(tokenDetected)
    {
        localStorage.setItem("acs",tokenDetected);
        token=tokenDetected;
        authorization();
        // generate("Hi Himanshu Khosla");
        getGenerated();
    }
    else {
        // getToken();
    }
});

function extractAccessToken(url){
    try{
    return url.split("access_token=")[1].split("&")[0];
    }
    catch(e){
        return null;
    }
}

function getToken() {
window.location.href="https://myvoice.lyrebird.ai/authorize?response_type=token&client_id="+clientId+"&redirect_uri="+encodedUrl+"&scope=voice&state="+code; 
}


function generate(text,action,intentName) {
    let audio=document.createElement("audio");
              audio.onplay=function(){
                    interval=setInterval(function(){
                        animateSpeakingExpression(0,0.65);
                    },750);
                };
                audio.addEventListener("ended", function(){
                    if(interval)
                    clearInterval(interval);
                    console.log("ended");
               });
        console.log(text);      
        if(action=="input.welcome")
            audio.src="welcome.wav";
        else if(intentName=="bullly")
            audio.src="bully.wav";
        else if(intentName=="Feverintent")
            audio.src="fever.wav";
        else if(intentName=="NeedQuote")
            audio.src="motivational.wav";
        else if(intentName=="examinfo")
            audio.src="exams.wav";
        else if(intentName=="daily")
            audio.src="daily.wav";
        else if(intentName=="food")
            audio.src="food.wav";
        else alert("Sorry can you say that again?")
        if(audio.src)
            audio.play();
        // if(token && token!="null")
        //  $.ajax({
        //     method: 'post',
        //     responseType: 'blob',
        //     url: `https://avatar.lyrebird.ai/api/v0/generate`,
        //     headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
        //     data: JSON.stringify({
        //         text: text
        //     }),
        //     mimeType:"text/plain; charset=x-user-defined"
        // }).done(function(response){
        //     console.log(response);
        //     window.q=response;
        //     let audio=document.createElement("audio");
        //     try{
        //         var len = response.length;
        //         var buf = new ArrayBuffer(len);
        //         var view = new Uint8Array(buf);
        //         for (var i = 0; i < len; i++) {
        //           view[i] = response.charCodeAt(i) & 0xff;
        //         }
        //         var blob = new Blob([view], {type: "audio/x-wav"});
        //         audio.src=URL.createObjectURL(blob);
        //         audio.play();
        //         var interval=null;
        //         audio.onplay=function(){
        //             interval=setInterval(function(){
        //                 animateSpeakingExpression(0,0.65);
        //             },750);
        //         };
        //         audio.addEventListener("ended", function(){
        //             if(interval)
        //             clearInterval(interval);
        //             console.log("ended");
        //        });
        //     }
        //     catch(e){
        //         alert("Error in generating audio");
        //     }
        //     audio.play();
        //  })
        // .fail(function(error){
        //      console.log(error)
        //  })
}

function getGenerated() {
        if(token && token!="null")
        $.ajax({
            method: 'get',
            url: `https://avatar.lyrebird.ai/api/v0/generated`,
            headers: { 'Authorization': 'Bearer ' + token }
        }).done(function(response){
            console.log(response);
        })
        .fail(function(error){
            console.log(error)
        })
}
