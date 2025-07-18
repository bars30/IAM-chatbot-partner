const langButtons = document.querySelectorAll('.lang-option');

langButtons.forEach(button => {
  button.addEventListener('click', () => {
    langButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const selectedLang = button.dataset.lang;
    console.log(selectedLang);
  });
});

let firstMessage = true;

document.addEventListener("DOMContentLoaded", () => {
  const promptButtons = document.querySelectorAll(".quick-prompts-btn");
  const promptsSection = document.querySelector(".quick-prompts");
  const chatboxMessages = document.querySelector(".chatbox-messages");
  const questionsBtn = document.querySelector(".chatbox-footer-btn-questions");
  const input = document.querySelector(".send-message");

function typeText(container, text, delay = 15, callback) {
  let i = 0;
  container.textContent = ''; // Մաքրել նախորդը
  const interval = setInterval(() => {
    container.textContent += text.charAt(i);
    i++;

    // ԱՅՍՏԵՂ ԱՎԵԼԱՑՆՈՒՄ ԵՆՔ ՍՔՐՈԼԼԸ
    // container.parentElement.parentElement.scrollTop = container.parentElement.parentElement.scrollHeight;

    if (i >= text.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, delay);
}
// function typeTextHTML(container, html, delay = 20, callback) {
//   container.innerHTML = ''; // Մաքրել նախկին պարունակությունը

//   // Ստեղծել թաքնված span տարր
//   const tempDiv = document.createElement("div");
//   tempDiv.innerHTML = html;
//   const nodes = Array.from(tempDiv.childNodes);

//   let currentIndex = 0;

//   function typeNextNode() {
//     if (currentIndex >= nodes.length) {
//       if (callback) callback();
//       return;
//     }

//     const node = nodes[currentIndex];
//     const clone = node.cloneNode(true);

//     if (clone.nodeType === Node.TEXT_NODE) {
//       let text = clone.textContent;
//       let i = 0;
//       const span = document.createElement("span");
//       container.appendChild(span);

//       const interval = setInterval(() => {
//         span.textContent += text.charAt(i);
//         i++;
//         if (i >= text.length) {
//           clearInterval(interval);
//           currentIndex++;
//           typeNextNode();
//         }
//       }, delay);
//     } else {
//       container.appendChild(clone);
//       currentIndex++;
//       typeNextNode();
//     }
//   }

//   typeNextNode();
// }

function typeTextHTML(container, html, delay = 20, callback) {
  container.innerHTML = ''; // Մաքրել նախորդ պարունակությունը

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  const nodes = Array.from(tempDiv.childNodes);

  let currentIndex = 0;

  function typeNextNode() {
    if (currentIndex >= nodes.length) {
      if (callback) callback();
      return;
    }

    const node = nodes[currentIndex];
    
    if (node.nodeType === Node.TEXT_NODE) {
      const span = document.createElement("span");
      container.appendChild(span);

      typeText(span, node.textContent, delay, () => {
        currentIndex++;
        typeNextNode();
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const clone = node.cloneNode(false); // clone only the element, not children
      container.appendChild(clone);

      // handle child nodes recursively
      const childHTML = node.innerHTML;
      typeTextHTML(clone, childHTML, delay, () => {
        currentIndex++;
        typeNextNode();
      });
    } else {
      currentIndex++;
      typeNextNode();
    }
  }

  typeNextNode();
}


  function getBotReply(prompt) {
    switch (prompt) {
      case "Why Companies Choose Us":
        return `
         <p><b>Seeking Top IAM Talent?</b> We streamline your hiring by delivering pre-vetted experts in <b>Okta, Azure AD, SailPoint, CyberArk,</b> and more. Discover precision talent that fits your exact needs.</p>
        
         <ul>
          <li><b>Deep IAM Specialization:</b> We're not generalists. Our exclusive focus on <b>IAM, PAM, IGA, CIAM, and MIM</b> means we speak your language, understanding complex needs from <b>Zero Trust</b> to <b>DevSecOps with Identity focus.</b></li>
          <li></li>
         </ul>
        
         `;
      case "Services for Clients":
        return `We offer Permanent, Retained, and Executive Search services, as well as contract/interim IAM staffing tailored to your needs.`;
      case "Hiring Process":
        return `Our process covers detailed needs analysis, targeted sourcing, deep vetting, and seamless interview and offer management.`;
      case "Technological Expertise & Roles":
        return `We place experts in IAM, PAM, CIAM, IGA, DevSecOps, and more – experienced with platforms like Okta, SailPoint, CyberArk, Azure AD, etc.`;
      case "IAM Talent Network":
        return `
        <p>We connect IAM talent with exclusive roles in Germany and DACH:</p>
        <ul>
          <li>Roles in Okta, CyberArk, SailPoint, Azure AD, etc.</li>
          <li>Access to unadvertised jobs in Banking, Tech, Pharma</li>
          <li>Personalized job search, salary benchmarking, and resume prep</li>
          <li>Confidential and expert-led recruitment support</li>
        </ul>
        <p>Let us help you find the right long-term move.</p>
        `;
      case "Story & Purpose":
        return `IAM Hiring was founded to fill the gap in specialized IAM recruiting in Germany. Our mission is to empower businesses with IAM talent.`;
      case "Team":
        return `Led by Katja Olkhovaia and our IAM experts, our team understands the industry deeply and builds lasting partnerships with clients and candidates.`;
      case "For IAM Professionals":
        return `We help IAM Engineers, Architects, and Consultants find roles that fit their career goals, offering exclusive access to top IAM opportunities.`;
      case "Contact":
        return `You can reach us via email at info@iamhiring.de or phone at +49 30 70016612. We’re located at Ziegelstraße 16, Berlin.`;
      default:
        return `Thanks for your interest in "${prompt}". Let me tell you more...`;
    }
  }

  promptButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedPrompt = btn.textContent;

      // Անջատել բոլոր կոճակները
      promptButtons.forEach(b => b.disabled = true);

      // Անիմացիայով թաքցնել հարցերի հատվածը
      promptsSection.classList.add("fade-out");

      setTimeout(() => {
        promptsSection.style.display = "none";
        chatboxMessages.style.display = "flex";
        input.classList.add("shrink");
        setTimeout(() => {
          questionsBtn.classList.add("visible");
        }, 200);
      

        // Օգտատիրոջ հաղորդագրությունը ավելացնել չատին
        const userMsg = document.createElement("div");
        userMsg.className = "message user-message";
        const userP = document.createElement("p");
        userP.textContent = selectedPrompt;
        userMsg.appendChild(userP);
        chatboxMessages.appendChild(userMsg);

        setTimeout(() => {
  userMsg.scrollIntoView({ behavior: 'smooth', block: 'start' });
}, 50); // կամ 100 մվրկ

        // Ստեղծել bot-ի պատասխանը
        const botMsg = document.createElement("div");
        botMsg.className = "message bot-message";
        const botP = document.createElement("p");
        botMsg.appendChild(botP);
        chatboxMessages.appendChild(botMsg);



        if (firstMessage) {
          console.log('first message');
          firstMessage = false;
          
        } else {
          const element = document.querySelector('.new-bot-message');
          if (element) {
            element.classList.remove("new-bot-message");
          }
          console.log('not first message');
          botMsg.classList.add("new-bot-message");
        }


console.log("botp", botP);
console.log(getBotReply(selectedPrompt));

questionsBtn.disabled = true;

typeTextHTML(botP, getBotReply(selectedPrompt), 20, () => {
  questionsBtn.disabled = false;
});


        // Սկսել տառ առ տառ գրելը
//         typeText(botP, getBotReply(selectedPrompt), 20, () => {
//           questionsBtn.disabled = false;
//           // chatboxMessages.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'start' });
// setTimeout(() => {
//     // chatboxMessages.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'start' });
//   }, 30);
//           console.log("bdffdf");
          
//           // Կամ սքրոլ անել վերջը, եթե անհրաժեշտ է, կարող ես ավելացնել այստեղ
//           // chatboxMessages.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'start' });
//         });

      }, 400);
    });
  });

  // Questions կոճակի EventListener
  questionsBtn.addEventListener("click", () => {
    const footerPrompts = document.querySelector(".quick-prompts-footer");
    if (footerPrompts.style.display === "flex") {
      footerPrompts.classList.remove("fade-in");
      footerPrompts.classList.add("fade-out");
      setTimeout(() => {
        footerPrompts.style.display = "none";
      }, 300);
    } else {
      footerPrompts.style.display = "flex";
      footerPrompts.classList.remove("fade-out");
      footerPrompts.classList.add("fade-in");
    }
  });


  // Footer quick prompts կոճակների event listener-ներ
const footerPromptButtons = document.querySelectorAll('.quick-prompts-footer .quick-prompts-btn');
const footerPrompts = document.querySelector(".quick-prompts-footer");

footerPromptButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    footerPrompts.classList.remove("fade-in");
    footerPrompts.classList.add("fade-out");
    setTimeout(() => {
      footerPrompts.style.display = "none";
    }, 300);
  });
});

const textarea = document.getElementById('chatbox-input');

textarea.addEventListener('input', function () {
  this.style.height = 'auto'; // reset height first
  this.style.height = Math.min(this.scrollHeight, 80) + 'px'; // մինչև 150px բարձրանա
});
});
