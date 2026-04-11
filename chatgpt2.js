// Note: We no longer need the Google Generative AI import
const API_KEY = "xxxxxxxxxxxx"; 
const messages = document.querySelector(".messages");

async function main(userPrompt) {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`, // Groq uses Bearer token authentication
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
        temperature: 0.7 
       
        
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Error from Groq API");
    }

    // Groq follows the OpenAI response format: choices[0].message.content
    return data.choices[0].message.content; 
  } catch (err) {
    console.error("Groq API Error:", err);
    return "Error getting response from Groq. Please check your API key and connection.";
  }
}

/**
 * UI logic to display data
 */
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

}

// Selectors
const input = document.querySelector(".search-bar");
const policy = document.querySelector(".outtext");
const intro = document.querySelector(".text");
const btn = document.querySelector(".go");
const searchholder = document.querySelector(".search");

// Event Listeners
btn.addEventListener("click", (e) => {
  e.preventDefault();
  const promptValue = input.value.trim();
  
  if (!promptValue) return;

  // UI Updates
  policy.style.display = "none";
  intro.style.display = "none";
  searchholder.style.position = "fixed";
  searchholder.style.bottom = "0";
  searchholder.style.marginLeft = "20%";
// searchholder.style.marginTop="3%";
   messages.style.paddingBottom = "10%";
  // Create User Message Bubble
  let usertext = document.createElement("p");
  usertext.classList.add("user-message");
  usertext.style.color = "white";
  usertext.innerText = promptValue;
  
  messages.appendChild(usertext);

 

  // Trigger Bot Response
  showdata(promptValue);
  
  // Reset Input
  input.value = "";
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); 
    btn.click();       
  }
});
