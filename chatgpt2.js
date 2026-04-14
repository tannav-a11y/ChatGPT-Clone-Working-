
const API_KEY = "xxxxxxxxxxxxxxxx"; 
const messages = document.querySelector(".messages");

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
            role: "user",
            content: userPrompt,
            
          }
        ],
        
        
        temperature: 0.7 ,
        
       
        
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
const down=document.querySelector(".down");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  const promptValue = input.value.trim();
  
  if (!promptValue) return;

 
  policy.style.display = "none";
  intro.style.display = "none";
  searchholder.style.position = "fixed";
  searchholder.style.bottom = "0";
  searchholder.style.marginLeft = "20%";

   messages.style.paddingBottom = "10%";

  
  let usertext = document.createElement("p");
  usertext.classList.add("user-message");
  usertext.style.color = "white";
  usertext.innerText = promptValue;
  
  messages.appendChild(usertext);

 
 
  showdata(promptValue);
  
 
input.value="";
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

  if (! (pageHeight - scrollPosition <= 30)) {
    down.style.display="block";
  }
  else{
    down.style.display="none";
  }
});
down.addEventListener(("click"),(e)=>{
window.scrollTo({
  top: document.documentElement.scrollHeight,
  behavior: "smooth"
});
})

