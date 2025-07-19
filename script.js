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
          <li><b>High-Caliber, Vetted Experts:</b> We connect you with experienced <b>IAM Engineers, Architects, and Consultants</b> who thrive in <b>ISO 27001 / SOC 2</b> environments. Our talent is rigorously vetted for technical prowess and cultural fit.</li>
          <li><b>Your Strategic Talent Partner:</b> For <b>CISOs, Heads of IAM, and HR/TA Partners,</b> we're a trusted extension of your team. We quickly deliver IAM-literate candidates, anticipating triggers like new projects (MFA, SSO) or audits, saving you time and effort.</li>
          <li><b>Targeted Market Access:</b> Specializing in Germany's <b>Banking, Tech, Manufacturing, and Pharma</b> sectors, our reach extends across <b>DACH</b> and key <b>EU</b> markets, sourcing both German and English-speaking professionals.</li>
          </ul>
        
          <p><b>Ready to Secure Your Digital Future with the Right IAM Talent? Find Your Next IAM Expert Now.</b></p>
        <img src="./img/sect01.png" class="section-img" alt="">
        
          `;
      case "Services for Clients":
        return `
          <p><b>Our Specialized IAM & Cybersecurity Recruitment Services</b></p>

<p>Partner with <b>IAM Hiring</b> to overcome your IAM talent challenges. We offer flexible and effective recruitment solutions designed to meet your precise requirements, whether you're expanding your internal IAM team or scaling consulting teams selling IAM services.</p>

<p><b>Our Core Talent Solutions:</b></p>

<ul>
  <li><b>Permanent Placement (Direct Hire):</b> Securing long-term IAM and Cybersecurity talent is crucial for sustained growth and compliance. We specialize in identifying, attracting, and placing permanent professionals who will integrate seamlessly into your team and strengthen your security posture.
    <ul>
      <li><b>Contingency Search:</b> Our "no win, no fee" model for standard-to-mid-level IAM roles. You only pay upon successful placement, reducing risk for HR/TA Partners.</li>
      <li><b>Retained Search:</b> A dedicated, prioritized search for critical or highly specialized positions, such as IAM Architects, DevSecOps with Identity focus, or IAM Project Managers. This offers exclusive focus, in-depth market mapping, and a guaranteed commitment to finding the ideal candidate within a defined timeframe, addressing CISOs' concerns about long time-to-fill.</li>
      <li><b>Executive Search:</b> For C-level and senior leadership positions (e.g., Chief Identity Officer, VP of IAM Strategy). We employ a discrete and meticulous approach to identify leaders who will shape your organization's security future, particularly for enterprises undergoing significant IAM modernization or Zero Trust rollouts.</li>
    </ul>
  </li>

  <li><b>Contract / Interim IAM Staffing:</b> Need specialized IAM expertise for a specific project, to cover a temporary absence, or to scale up quickly for new initiatives like MFA/SSO deployments? Our network includes highly skilled IAM contractors and interim managers ready to hit the ground running.
    <ul>
      <li>Flexible engagement models to suit project lifecycles.</li>
      <li>Rapid deployment of pre-vetted professionals, crucial for urgent demands from Hiring Managers.</li>
      <li>Access to niche skills for short-to-medium term requirements, especially for PAM or CIAM projects.</li>
      <li>Dedicated account management, ensuring HR/TA Partners receive a true specialist who delivers without wasting time.</li>
    </ul>
  </li>
</ul>

  <img src="./img/sect04.png" class="section-img" alt="">

        `;
      case "Hiring Process":
        return `

<p>Our process is designed to overcome talent shortages and ensure a fast, efficient path to the right hire. We address <b>CISOs'</b> goals of reduced risk and <b>IAM Team Leads'</b> needs for strong, reliable teams.</p>

<ol>
  <li><b>In-depth Needs Assessment & Strategy Definition:</b> We begin with a thorough consultation to understand your specific IAM role requirements, company culture, existing tech stack (e.g., CyberArk, ForgeRock, Saviynt), and strategic security roadmap (e.g., Zero Trust). We align on your Hiring Need (2–10 roles/year) and craft a customized search strategy.</li>
  
  <li><b>Targeted Sourcing & Identification of IAM Experts:</b> Leveraging our extensive network across Germany, DACH, and Europe, proprietary database, and advanced active sourcing techniques, we identify passive and active IAM professionals who precisely match your criteria. We prioritize candidates with experience in environments like yours (e.g., ISO 27001, SOC 2).</li>
  
  <li><b>Rigorous Vetting & Specialized Qualification:</b> Every candidate undergoes a detailed interview by our team, including hard-skills screening, soft skills assessment, and cultural fit evaluation. We only present candidates who meet our high standards, addressing Hiring Managers' challenges of finding candidates with deep, specialized experience.</li>
  
  <li><b>Presentation of Top Candidates & Interview Coordination:</b> We provide you with a shortlist of highly qualified candidates, complete with detailed profiles and our expert assessment. We manage all interview scheduling, feedback collection, and logistical arrangements, ensuring HR/TA Partners save time and focus on decision-making.</li>
  
  <li><b>Offer Management & Post-Placement Support:</b> We facilitate offer negotiations, ensuring a smooth and successful acceptance. Our support extends to post-placement follow-ups, ensuring successful integration and satisfaction for both client and candidate, reducing CISOs' concerns about team attrition.</li>
</ol>
<img src="./img/sect05.png" class="section-img" alt="">
        `;
      case "Technological Expertise & Roles":
        return `
        <p>Our network comprises professionals skilled in a wide array of industry-leading IAM and related security solutions, ensuring we can match your precise technology requirements:</p>

<p><b>Key IAM & Cybersecurity Roles We Place</b><br>
Our expertise spans the critical positions driving your Identity and Access Management and Cybersecurity initiatives:</p>

<ul>
  <li>IAM Engineers / Architects</li>
  <li>Identity Governance & Administration (IGA) Experts</li>
  <li>Privileged Access Management (PAM) Specialists</li>
  <li>Machine Identity & Secrets Management (MIAM) Experts</li>
  <li>Customer Identity & Access Management (CIAM) Specialists</li>
  <li>IAM Project Managers & Leads</li>
  <li>DevSecOps with Identity focus</li>
  <li>IAM Sales Consultants / Presales Engineers</li>
  <li>IAM Analysts / Administrators</li>
  <li>IAM Consultants (Advisory, Implementation, Integration)</li>
  <li>Cloud IAM Architects (e.g., AWS IAM, Google Cloud IAM)</li>
  <li>IAM Operations Specialist</li>
  <li>Head of IAM / IAM Practice Leader / Head of Infrastructure / Head of Security</li>
  <li>Other Specialized IAM Positions</li>
</ul>

<p><b>Core IAM Platforms:</b></p>
<ul>
  <li>Microsoft Entra ID (formerly Azure Active Directory)</li>
  <li>Okta Workforce Identity Cloud</li>
  <li>Ping Identity</li>
  <li>ForgeRock Identity Platform</li>
  <li>IBM Security Verify</li>
  <li>Oracle Identity Management</li>
  <li>OneLogin</li>
  <li>JumpCloud</li>
  <li>Duo Security (Cisco Duo)</li>
  <li>RSA SecurID</li>
</ul>

<p><b>Identity Governance & Administration (IGA) Platforms:</b></p>
<ul>
  <li>SailPoint Identity Security Cloud</li>
  <li>Saviynt Enterprise Identity Cloud</li>
  <li>Omada Identity Platform</li>
  <li>tenfold</li>
  <li>OneIdentity</li>
</ul>

<p><b>Privileged Access Management (PAM) Platforms:</b></p>
<ul>
  <li>CyberArk Privileged Access Manager</li>
  <li>BeyondTrust Privileged Access Management</li>
  <li>Delinea (formerly Thycotic & Centrify)</li>
  <li>Wallix Bastion</li>
  <li>StrongDM</li>
</ul>

<p><b>MIAM / Secrets Management Platforms:</b></p>
<ul>
  <li>HashiCorp Vault</li>
  <li>Venafi</li>
  <li>AWS IAM</li>
  <li>Google Cloud IAM</li>
</ul>

<p><b>Customer Identity & Access Management (CIAM) Platforms:</b></p>
<ul>
  <li>Okta Customer Identity Cloud (formerly Auth0)</li>
  <li>LoginRadius</li>
  <li>FusionAuth</li>
</ul>

<p><b>Additional Protocols & Standards Expertise:</b><br>
OAuth, OpenID Connect, SAML, SCIM, LDAP, Kerberos.</p>

<p><b>DevSecOps Tooling Expertise:</b><br>
Kubernetes Identity, API Security, CI/CD pipeline security.</p>
<img src="./img/sect06.png" class="section-img" alt="">
        `;
      case "IAM Talent Network":
        return `
        <p>At <b>IAM Hiring</b>, we don't just search for candidates; we connect you with a pre-existing, meticulously curated community of the most sought-after <b>Identity and Access Management (IAM) experts in Europe.</b></p>
        
        <p>Our vast network comprises <b>over 8,000 highly skilled IAM professionals</b>, with approximately <b>5,000 top talents located right here in Germany</b>. What truly sets us apart is the depth of our relationships: we've personally engaged with <b>every single one of these experts</b>, whether through in-depth online interviews, face-to-face meetings at industry conferences, or during dedicated meetups.</p>
        <p>This personal connection means we don't just know their skills; we understand their career aspirations, their ideal work environment, and exactly <b>what opportunity will be truly attractive for them to make a job change</b>. When you partner with us, you're not waiting for a search to begin; we likely <b>already know the ideal candidate you're looking for</b>, enabling faster, more precise placements that genuinely last.</p>
        <img src="./img/sect02.png" class="section-img" alt="">
        `;
      case "Story & Purpose":
        return `
          <p><b>Our Mission:</b> At <b>IAM Hiring</b>, we empower German and European businesses by providing them with expert <b>Identity & Access Management (IAM)</b> and <b>Cybersecurity</b> talent. We specialize in filling crucial roles to strengthen your security posture in today's complex digital landscape.</p>

<p><b>Our Vision:</b> To be the leading and most trusted specialized IAM recruitment partner in Germany and across <b>DACH/EU</b>. We're recognized for our deep industry knowledge, precision matching, and the profound positive impact we have on both client security and candidate careers.</p>

<p><b>Our Story:</b> <b>IAM Hiring</b> is a niche recruitment firm exclusively dedicated to the IAM sector. Founded by managers with multiple years of <b>IT and Cybersecurity recruitment</b> experience in Germany, our passion was to fill a critical market gap. We observed that companies struggled to find truly specialized IAM professionals, often missed by generalist recruiters.</p>

<p>We built <b>IAM Hiring</b> as a direct response, focusing solely on this complex domain. We understand that robust <b>IAM</b> is a critical foundation, not just a technology. Our deep specialization provides unparalleled market intelligence and direct access to a network of highly sought-after IAM professionals. We are the trusted, specialized firm that both top talents and hiring managers prefer.</p>
<img src="./img/sect03.png" class="section-img" alt="">
        `;
      case "Team":
        return `
        <article class="team-member">
          <img class="team-member-img" src="./img/team01.png" alt="">
    <div class="article-cont">
    <p><b>Katja Olkhovaia</b></p>
    <p>
      With 16 years of experience in IT Recruitment and a network of over 27,000 IT experts, Katja brings unparalleled insight into the industry. </p> 
      <p>She leads our strategic client partnerships, ensuring we deliver on the specific needs of CISOs and Heads of IAM.
    </p>
    <p><b>Email:</b> <a href="mailto:katja@iamhiring.de">katja@iamhiring.de</a></p>
    <p><b>Teams:</b> <a href="https://getwhitelisted.de/katja" target="_blank" rel="noopener noreferrer">https://getwhitelisted.de/katja</a></p>
    </div>
  </article>
<article class="team-member">
  <img class="team-member-img" src="./img/team02.png" alt="">
  <div class="article-cont">
    <p><b>Darius Starks</b></p>
    <p>
      11 years of recruitment experience. Focusing on recruiting IAM and Security professionals since 2017, Darius has developed a passion for the security community and the joy of connecting the right security experts together.
    </p>
    <p><b>Email:</b> <a href="mailto:darius@iamhiring.de">darius@iamhiring.de</a></p>
  </div>
</article>

<article class="team-member">
  <img class="team-member-img" src="./img/team03.png" alt="">
  <div class="article-cont">
    <p><b>Vladyslav Kartyshov</b></p>
    <p>
      Vladyslav brings over 5 years of experience in IT-Security recruitment with a specialized focus on Information Security (ISMS, GRC, ISO 27001, BSI IT-Grundschutz) and Cyber Security (SIEM, SOC, Network Security and Ethical Hacking). Supported by a strong network of proven IT-Security professionals, he delivers deep industry insights and precise talent solutions.
    </p>
    <p><b>Email:</b> <a href="mailto:vladislav@iamhiring.de">vladislav@iamhiring.de</a></p>
  </div>
</article>

  `;
      case "For IAM Professionals":
        return `
          <p><b>For IAM Professionals: Your Next Career Move Starts Here</b></p>

  <p>
    As a leading specialized IAM and Cybersecurity recruiter in Germany and DACH, we're dedicated to connecting top talent like you with rewarding career opportunities at innovative companies. Let us help you navigate your next career move, whether you're an IAM Engineer, Architect, or PAM Specialist.
  </p>

  <p><b>Why Partner With IAM Hiring?</b><br>
    We're trusted by top talents who seek meaningful career progression, not just another job. We understand your expertise in Okta, SailPoint, CyberArk, and Azure AD, and we match you with roles that truly fit.
  </p>

  <ul>
    <li>
      <b>Exclusive Access to Top Roles:</b> We partner with leading German and DACH companies (Banking, Tech, Manufacturing, etc.), often on exclusive IAM, PAM, IGA, CIAM, and MIM positions that are not publicly advertised. Gain access to roles perfectly suited to your specialized skills in ISO 27001-compliant environments.
    </li>
    <li>
      <b>Deep IAM Industry Insight & Guidance:</b> Our team understands the nuances of the IAM market, specific technologies, and relevant career paths for DevSecOps with Identity focus or IAM Sales Consultants. We provide informed guidance, salary benchmarking, and insights into current market trends.
    </li>
    <li>
      <b>Personalized Career Journey:</b> We take the time to understand your career aspirations, strengths, and desired work environment, whether you're looking for an IAM Project Manager role or an IAM Architect challenge. We're committed to finding not just a job, but the right long-term career move for you.
    </li>
    <li>
      <b>Streamlined, Expert-Led Process:</b> From resume optimization and interview preparation (we'll help you highlight your CyberArk or SailPoint expertise!) to offer negotiation and onboarding support, we guide you every step of the way, making your job search efficient and stress-free.
    </li>
    <li>
      <b>Confidentiality & Professionalism:</b> Your privacy is paramount. We handle your job search with the utmost discretion and professionalism, understanding the sensitive nature of Cybersecurity careers.
    </li>
  </ul>

  <p><b>Ready for Your Next IAM Career Step?</b><br>
  <a href="#contact">Send Us Your CV</a> | <a href="#consultation">Request a Career Consultation</a>
  </p>
  <img src="./img/sect07.png" class="section-img" alt="">

        `;
      case "Contact":
        return `
 <p>
    Ready to find your next IAM expert for your Banking, Tech, or Manufacturing enterprise, or looking for your next career opportunity in IAM/Cybersecurity? Get in touch with our specialized team today.
  </p>

  <p><b>Send Us a Message in the Chat:</b></p>
  <ul>
    <li>Your Name:</li>
    <li>Your Email:</li>
    <li>Phone (Optional):</li>
    <li>Your Message:</li>
  </ul>

  <p><b>Or Reach Us Directly:</b></p>
  <ul>
    <li><strong>Phone:</strong> +49 30 70016612</li>
    <li><strong>Email:</strong> <a href="mailto:info@iamhiring.de">info@iamhiring.de</a></li>
    <li><strong>Office Address:</strong> Ziegelstraße 16, 10117 Berlin, Germany</li>
    <li><strong>Business Hours:</strong> Monday - Friday: 9:00 AM - 6:00 PM (CET)</li>
  </ul>

  <p><b>Connect With Us:</b></p>
  <p>
    <a href="https://www.linkedin.com/company/107770925/admin/dashboard/" target="_blank" rel="noopener noreferrer">LinkedIn Company Page</a>
  </p>
        `;
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
