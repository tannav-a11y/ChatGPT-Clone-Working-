
const API_KEY = "XXXXXXXXXXXXXXXXXXXXX";
const messages = document.querySelector(".messages");

const Ai_mode=document.querySelector(".AI_mode_selection");

function update_message(){
  let answer=""
  let userAI=Ai_mode.value;
  if(userAI==="Study"){
    answer=`You are a helpful and patient tutor for school students.

Rules:
- Explain concepts in very simple language
- Break answers into steps when needed
- Give examples for better understanding
- Avoid unnecessary complexity
- If the topic is academic, make it exam-friendly`

  }


  else if(userAI==="Coding"){
    answer=`You are an expert programming assistant.

Rules:
- Provide correct and optimized code
- Explain logic clearly but briefly
- Always include examples when useful
- Mention errors and fixes if relevant
- Prefer clean and readable code over complex tricks`

  }


 else if(userAI==="Creative"){
   answer=`You are a creative and imaginative assistant.

Rules:
- Be expressive and engaging
- Generate unique ideas, stories, scripts, captions
- You can use humor and creativity
- Avoid overly strict or technical explanations unless asked`

  }
else if(userAI==="Default"){
  answer=`You are a helpful AI assistant.`
}
return answer
}

async function main(userPrompt) {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
             {
      role: "system",
      content: update_message()
    },
          {
            role: "user",
            content: userPrompt,

          }
        ],


        temperature: 0.7,



      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Error from Groq API");
    }


    return data.choices[0].message.content;
  } catch (err) {
    console.error("Groq API Error:", err);
    return "Oops I couldnt generate response. Please Try Again Later";
  }
}


async function showdata(prompt) {
  let loading = document.createElement("p");
  loading.innerText = "Typing...";
  loading.style.color = "white";
  loading.classList.add("load");
  messages.appendChild(loading);


  let result = await main(prompt);
  loading.remove();

  let bot_para = document.createElement("p");
  bot_para.innerText = result;
  bot_para.style.color = "white";
  bot_para.classList.add("bot-para");
  messages.appendChild(bot_para);
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth"
  });

}

const input = document.querySelector(".search-bar");
const policy = document.querySelector(".outtext");
const intro = document.querySelector(".text");
const btn = document.querySelector(".go");
const searchholder = document.querySelector(".search");
const down = document.querySelector(".down");
const bar = document.querySelector(".bar");
const menu = document.querySelector(".menu");
const inMenu = document.querySelector(".inMenu");
const newchat = document.querySelector(".NewChat");
const settingbtn = document.querySelector(".Setting")
const settingmenu = document.querySelector(".menuHolder")
const settings=document.querySelector(".SettingMenu");
const closebutton_setting = document.querySelector(".close_settings")

const modeSelect = document.querySelector(".Mode");
const outtext2=document.querySelector(".outtext2")



btn.addEventListener("click", (e) => {
  e.preventDefault();
  const promptValue = input.value.trim();

  if (!promptValue) {
    return
    btn.style.backgroundColor = "darkgrey"
  };


  policy.style.display = "none";
  intro.style.display = "none";
 
searchholder.id="chatinput";

outtext2.style.display="none";

  let usertext = document.createElement("p");
  usertext.classList.add("user-message");
  usertext.style.color = "white";
  usertext.innerText = promptValue;

  messages.appendChild(usertext);



  showdata(promptValue);


  input.value = "";
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    btn.click();
  }
});
window.addEventListener("scroll", () => {
  const scrollPosition = window.innerHeight + window.scrollY;
  const pageHeight = document.body.offsetHeight;

  if (!(pageHeight - scrollPosition <= 30)) {
    down.style.display = "flex";
  }
  else {
    down.style.display = "none";
  }
});
down.addEventListener(("click"), (e) => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth"
  });
})

menu.addEventListener("click", (e) => {
  bar.style.left = "0";

})
inMenu.addEventListener("click", (e) => {
  bar.style.left = "-400px";
})
newchat.addEventListener("click", (e) => {

  location.reload();

})
let setting = false;
settingbtn.addEventListener("click", (e) => {
  if (setting === false) {
    settingmenu.style.display = "block";
    setting = true;
  }
  else if (setting === true) {
    settingmenu.style.display = "none";
    setting = false;
  }
})
closebutton_setting.addEventListener("click", (e) => {
  settingbtn.click();
})


const body = document.querySelector("body");
const sidemenu = document.querySelector(".bar");
const logbtn = document.querySelector(".log-in");
const signupbtn = document.querySelector(".sign-up");
const logo = document.querySelector(".sitelogo");

















  let darkmode = true;


modeSelect.addEventListener("change", (e) => {
  let modeval = modeSelect.value;



  if (modeval === "Dark") {
    darkmode = true;
    
    body.style.backgroundColor = "#202020";
    outtext2.style.color="white";
    input.style.backgroundColor = "#3B3C4A";
    input.style.color = "white";
    policy.style.color = "white";
    intro.style.color = "white";
    sidemenu.style.backgroundColor = "#202123";
    settingbtn.style.color = "white";
    newchat.style.color = "white";
    btn.style.backgroundColor = "white";
    
    logbtn.style.backgroundColor = "white";
    logbtn.style.color = "black";
    signupbtn.style.color = "white";
    btn.style.color="black";
    signupbtn.style.borderColor = "white";
    logo.style.backgroundImage = "url('https://tse4.mm.bing.net/th/id/OIP.Si2luWLHcwtluq482s4INAAAAA?pid=ImgDet&w=158&h=158&c=7&o=7&rm=3')"
    inMenu.style.backgroundImage = "url('img-Photoroom.png')"
    menu.style.backgroundImage = "url('img-Photoroom.png')";
 settings.style.backgroundColor="#3B3C4A";

  
  settings.querySelectorAll("*").forEach(el => {
  el.style.color = "white";
});
modeSelect.querySelectorAll("*").forEach(opt=>{
opt.style.backgroundColor="#2F303B"
});
down.style.backgroundColor="#3B3C4A";
down.style.color="white";
Ai_mode.style.color="white"
  }

  else if (modeval === "Light") {
    darkmode = false;
    

outtext2.style.color="black";
    body.style.backgroundColor = "#FFFFFF";
    input.style.backgroundColor = "#E5E7EB";
    input.style.color = "black";
    policy.style.color = "black";
    intro.style.color = "black";
    sidemenu.style.backgroundColor = "#ECECF1"
    sidemenu.style.color = "black";
    settingbtn.style.color = "black";
    newchat.style.color = "black";
    btn.style.backgroundColor = "black";
    logbtn.style.backgroundColor = "black";
    logbtn.style.color = "white";
    signupbtn.style.color = "black";
    signupbtn.style.borderColor = "black";
    logo.style.backgroundImage = "url('https://miro.medium.com/v2/resize:fit:1200/1*IsKmNsl05adgt01-k5dG0w.png')"
    inMenu.style.backgroundImage = "url('sidemenu light-Photoroom.png')"
    menu.style.backgroundImage = "url('sidemenu light-Photoroom.png')"
  btn.style.color="white";
   
  settings.style.backgroundColor="#ECECF1";
  settings.querySelectorAll("*").forEach(el => {
  el.style.color = "black";
});
modeSelect.querySelectorAll("*").forEach(opt=>{
opt.style.backgroundColor="#ECECF1"
});
down.style.backgroundColor="#ECECF1";
down.style.color="black";
Ai_mode.style.color="black"
  }






   
   localStorage.setItem("Mode", modeval);
  
   
  

})


function loop() {
  const bottext = document.querySelectorAll(".bot-para");
const user = document.querySelectorAll(".user-message");
if(darkmode===true){
  user.forEach(el=>{
 el.style.backgroundColor="#3B3C4A";
  el.style.color="white";
  
  })
  bottext.forEach(el=>{
    el.style.backgroundColor="#3B3C4A";
  el.style.color="white";
  })
 
}
else if(darkmode===false){
  user.forEach(el=>{
 el.style.backgroundColor="#F4F4F4";
  el.style.color="black";
  
  })
  bottext.forEach(el=>{
    el.style.backgroundColor="#F4F4F4";
  el.style.color="black";
  
  
  })
 

}
  requestAnimationFrame(loop); // keeps calling itself
}
loop();

let res = localStorage.getItem("Mode");

if (res === "Dark" || res === "Light") {
  modeSelect.value = res;
  modeSelect.dispatchEvent(new Event("change"));
}


function update_loader(){
  const loader=document.querySelectorAll(".load");
  if(darkmode===true){
     loader.forEach(el=>{
   el.style.color = "white";
 })
  }
  else if(darkmode===false){
     loader.forEach(el=>{
   el.style.color = "black";
 })
  }
  requestAnimationFrame(update_loader);
}
update_loader()
