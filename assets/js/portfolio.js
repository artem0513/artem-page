/* Accessible presentations and lightweight interactions. No dependencies. */
(() => {
  "use strict";
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const menuButton = $(".menu-toggle");
  const mobileNav = $("#mobile-nav");
  const setMenu = (open, returnFocus = false) => {
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation",
    );
    mobileNav.hidden = !open;
    if (returnFocus) menuButton.focus();
  };
  menuButton.addEventListener("click", () =>
    setMenu(menuButton.getAttribute("aria-expanded") !== "true"),
  );
  mobileNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menuButton.getAttribute("aria-expanded") === "true"
    )
      setMenu(false, true);
  });
  window
    .matchMedia("(min-width: 641px)")
    .addEventListener("change", (event) => {
      if (event.matches) setMenu(false);
    });

  // Content is visible by default, even without JS or IntersectionObserver.
  if ("IntersectionObserver" in window && !reducedMotion.matches) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -18px 0px" },
    );
    $$(".reveal").forEach((element) => revealObserver.observe(element));
    document.documentElement.classList.add("motion-ready");
    reducedMotion.addEventListener("change", (event) => {
      if (event.matches) {
        document.documentElement.classList.remove("motion-ready");
        revealObserver.disconnect();
      }
    });
  }

  const ragSteps = [
    [
      "01 / START WITH THE RIGHT CONTEXT",
      "Delivery reports provide the business information managers need to explore. The assistant brings that information into a searchable workflow.",
    ],
    [
      "02 / FIND THE RELEVANT INFORMATION",
      "Azure AI Search retrieves relevant business information. The Python/FastAPI service connects that retrieval step to the assistant’s workflow.",
    ],
    [
      "03 / PUT THE CONTEXT TO WORK",
      "Azure OpenAI helps turn retrieved context into useful answers for report analysis and data discovery. This is an architecture walkthrough, not a live AI service.",
    ],
  ];
  $$(".rag-step").forEach((button) =>
    button.addEventListener("click", () => {
      const index = Number(button.dataset.step);
      $$(".rag-step").forEach((step) => {
        const active = step === button;
        step.classList.toggle("is-active", active);
        step.setAttribute("aria-pressed", String(active));
      });
      $("#rag-label").textContent = ragSteps[index][0];
      $("#rag-description").textContent = ragSteps[index][1];
    }),
  );

  const projects = {
    logistics: {
      category: "01 / LOGISTICS & PRACTICAL AI — EPAM SYSTEMS",
      slides: [
        {
          kicker: "01 / THE CHALLENGE",
          title: "Keep a complex operation moving.",
          intro:
            "A US logistics platform connecting vehicle tracking, road tax calculations, route planning and payment processing.",
          details: [
            [
              "CONTEXT",
              "Lead Full-Stack .NET / Angular engineer, May 2024 to present.",
            ],
            [
              "RESPONSIBILITY",
              "Designed solution architecture, selected technologies and documented architecture decisions and diagrams in version control.",
            ],
          ],
        },
        {
          kicker: "02 / THE SYSTEM",
          title: "Connected across every layer.",
          intro:
            "Angular applications integrate with .NET microservices on Azure and PostgreSQL-backed storage. A Python/FastAPI assistant adds report analysis and data discovery.",
          system: [
            "Angular",
            ".NET microservices",
            "Azure / PostgreSQL",
            "Python / RAG",
          ],
          details: [
            [
              "PLATFORM",
              "Vehicle tracking, route planning, road tax calculations and payment processing.",
            ],
            [
              "PRACTICAL AI",
              "Azure OpenAI and Azure AI Search help managers find and aggregate delivery data.",
            ],
          ],
          note: "Conceptual component view based on the resume; not a production deployment diagram.",
        },
        {
          kicker: "03 / MY CONTRIBUTION",
          title: "Architecture. Implementation. Team.",
          intro:
            "I worked across technical decisions, production features and the way the engineering team delivers.",
          details: [
            [
              "BUILD",
              "Developed .NET microservices and Angular applications; designed and built the financial system for payment processing.",
            ],
            [
              "ENABLE",
              "Mentored engineers through design discussions and reviews. Introduced Mastra workflows for task aggregation, prioritization and progress tracking.",
            ],
          ],
        },
        {
          kicker: "04 / THE RESULT",
          title: "More connected ways to work.",
          intro:
            "The work brought logistics workflows, financial operations and AI-assisted information discovery into the platform’s scope.",
          details: [
            [
              "BUSINESS CAPABILITY",
              "Managers can use the RAG assistant to analyze delivery reports and find and aggregate delivery data.",
            ],
            [
              "TEAM PRACTICE",
              "Architecture decisions are documented. AI-assisted coding, review and testing workflows support engineering delivery.",
            ],
          ],
          note: "No quantified business outcome is claimed for this project in the supplied resume.",
        },
      ],
    },
    booking: {
      category: "02 / WORKSPACE BOOKING — REENBIT",
      slides: [
        {
          kicker: "01 / THE CHALLENGE",
          title: "Many spaces. One experience.",
          intro:
            "A European booking platform for offices, cafés and parking spaces, with real-time reservations and Google Calendar and Microsoft Outlook synchronization.",
          details: [
            [
              "CONTEXT",
              "Senior Full-Stack .NET / React engineer, April 2022 to May 2024.",
            ],
            [
              "COMPLEXITY",
              "Multi-tenant data isolation, external calendar integrations and workflows that need to recover from booking conflicts.",
            ],
          ],
        },
        {
          kicker: "02 / THE SYSTEM",
          title: "Design for the unexpected.",
          intro:
            "Serverless workflows and asynchronous messaging connect the booking services. A MassTransit saga rolls back bookings after conflicts or service failures and sends follow-up notifications.",
          system: [
            "React / SignalR",
            "Azure Functions",
            "Service Bus",
            "MassTransit saga",
          ],
          details: [
            [
              "USER EXPERIENCE",
              "React applications with real-time calendar updates and SignalR communication.",
            ],
            [
              "INTEGRATIONS",
              "Google Calendar, Microsoft Outlook, Redis caching and background processing.",
            ],
          ],
          note: "Conceptual component view based on the resume; not a production deployment diagram.",
        },
        {
          kicker: "03 / MY CONTRIBUTION",
          title: "Build it. Ship it. Operate it.",
          intro:
            "I connected product features with the infrastructure and delivery workflows needed to run them.",
          details: [
            [
              "ENGINEERING",
              "Implemented serverless workflows, multi-tenant isolation, asynchronous communication and OAuth 2.0 / JWT authentication.",
            ],
            [
              "DELIVERY",
              "Configured GitHub Actions pipelines and containerized workloads. Led infrastructure provisioning with Terraform and Pulumi.",
            ],
          ],
        },
        {
          kicker: "04 / THE RESULT",
          title: "A leaner cloud footprint.",
          intro:
            "Testing and deployment automation used GitHub Actions, Docker and Kubernetes. Deployment optimizations contributed to lower infrastructure costs.",
          metric: "~20%",
          metricLabel: "lower infrastructure costs",
          details: [
            [
              "HOW TO READ THE NUMBER",
              "An approximate project result, attributed to deployment optimizations.",
            ],
            [
              "BEYOND THE METRIC",
              "Resilient booking workflows, tenant isolation and real-time calendar integration.",
            ],
          ],
        },
      ],
    },
    payroll: {
      category: "03 / BUSINESS AUTOMATION — SWEETSOFT",
      slides: [
        {
          kicker: "01 / THE CHALLENGE",
          title: "Make everyday operations easier.",
          intro:
            "A business automation platform for a European cleaning services company, supporting workforce management, payroll, bookings and secure online payments.",
          details: [
            [
              "CONTEXT",
              "Full-Stack .NET / Angular engineer, January 2019 to April 2022.",
            ],
            [
              "WORKFLOWS",
              "Salary calculations, vacation tracking, overtime, sick leave, invoicing and tax payments.",
            ],
          ],
        },
        {
          kicker: "02 / THE SYSTEM",
          title: "The right tools, connected.",
          intro:
            ".NET Core and Entity Framework Core underpin payroll and workforce modules. AngularJS and Kendo UI support the administration interface.",
          system: [
            "AngularJS / Kendo UI",
            ".NET Core / APIs",
            "MSSQL / Redis",
            "Background jobs",
          ],
          details: [
            [
              "DATA",
              "MSSQL, Redis caching and Cosmos DB solutions for distributed storage.",
            ],
            [
              "SERVICES",
              "GraphQL APIs, Hangfire jobs and supporting Python/FastAPI and Java/Spring Boot services.",
            ],
          ],
          note: "Conceptual component view based on the resume; not a production deployment diagram.",
        },
        {
          kicker: "03 / MY CONTRIBUTION",
          title: "Improve the daily essentials.",
          intro:
            "I developed the modules behind payroll and workforce operations and connected supporting services across the platform.",
          details: [
            [
              "FEATURES",
              "Payroll and employee management, invoicing and payment workflows, GraphQL APIs and background processing.",
            ],
            [
              "INTEGRATION",
              "Python/FastAPI and Java/Spring Boot services integrated with .NET through REST APIs and asynchronous messaging.",
            ],
          ],
        },
        {
          kicker: "04 / THE RESULT",
          title: "Less time waiting on the system.",
          intro:
            "Database query optimization reduced response times across payroll and operational modules.",
          metric: "~50%",
          metricLabel: "lower response times",
          details: [
            [
              "WHERE",
              "Payroll and operational modules. This is a response-time result.",
            ],
            [
              "HOW",
              "Optimized database query execution, alongside the platform’s .NET, MSSQL and Redis-backed workflows.",
            ],
          ],
        },
      ],
    },
  };

  const dialog = $("#project-dialog");
  let activeProject = null;
  let slideIndex = 0;
  let presentationTrigger = null;
  const textNode = (tag, text, className) => {
    const element = document.createElement(tag);
    element.textContent = text;
    if (className) element.className = className;
    return element;
  };
  const renderSlide = () => {
    const navigationFocus = document.activeElement;
    const slide = activeProject.slides[slideIndex];
    $("#presentation-category").textContent = activeProject.category;
    $("#slide-kicker").textContent = slide.kicker;
    $("#presentation-title").textContent = slide.title;
    $("#slide-intro").textContent = slide.intro;
    const content = $("#slide-content");
    content.replaceChildren();
    if (slide.system) {
      const system = textNode("div", "", "slide-system");
      system.setAttribute("aria-label", "Conceptual system components");
      slide.system.forEach((label, index) => {
        if (index) {
          const arrow = textNode("b", "↔");
          arrow.setAttribute("aria-hidden", "true");
          system.append(arrow);
        }
        system.append(textNode("span", label));
      });
      content.append(system);
    }
    if (slide.metric) {
      const metric = textNode("p", slide.metric, "slide-metric");
      metric.append(textNode("span", slide.metricLabel));
      content.append(metric);
    }
    if (slide.details) {
      const details = textNode("div", "", "slide-details");
      slide.details.forEach(([label, description]) => {
        const item = textNode("div", "", "slide-detail");
        item.append(textNode("span", label), textNode("p", description));
        details.append(item);
      });
      content.append(details);
    }
    if (slide.note) content.append(textNode("p", slide.note, "work-note mono"));
    $("#slide-progress").textContent =
      `${String(slideIndex + 1).padStart(2, "0")} / ${String(activeProject.slides.length).padStart(2, "0")}`;
    $("#previous-slide").disabled = slideIndex === 0;
    $("#next-slide").disabled = slideIndex === activeProject.slides.length - 1;
    // Disabling a focused button sends focus to the page in Chromium.
    // Keep keyboard users inside the presentation at either boundary.
    if (navigationFocus === $("#next-slide") && $("#next-slide").disabled) {
      $("#previous-slide").focus({ preventScroll: true });
    } else if (
      navigationFocus === $("#previous-slide") &&
      $("#previous-slide").disabled
    ) {
      $("#next-slide").focus({ preventScroll: true });
    }
    $$(".slide-dot").forEach((dot, index) =>
      dot.setAttribute("aria-current", String(index === slideIndex)),
    );
  };
  const changeSlide = (index) => {
    if (
      !activeProject ||
      index < 0 ||
      index >= activeProject.slides.length ||
      index === slideIndex
    )
      return;
    slideIndex = index;
    renderSlide();
    dialog.scrollTop = 0;
  };
  $$("[data-project]").forEach((button) =>
    button.addEventListener("click", () => {
      activeProject = projects[button.dataset.project];
      if (!activeProject) return;
      slideIndex = 0;
      presentationTrigger = button;
      const dots = $(".slide-dots");
      dots.replaceChildren();
      activeProject.slides.forEach((slide, index) => {
        const dot = textNode("button", "", "slide-dot");
        dot.type = "button";
        dot.setAttribute("aria-label", `Slide ${index + 1}: ${slide.title}`);
        dot.addEventListener("click", () => changeSlide(index));
        dots.append(dot);
      });
      renderSlide();
      dialog.showModal();
      document.body.classList.add("dialog-open");
      $(".dialog-close").focus();
    }),
  );
  $(".dialog-close").addEventListener("click", () => dialog.close());
  $("#previous-slide").addEventListener("click", () =>
    changeSlide(slideIndex - 1),
  );
  $("#next-slide").addEventListener("click", () => changeSlide(slideIndex + 1));
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      changeSlide(slideIndex + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      changeSlide(slideIndex - 1);
    }
  });
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      dialog.close();
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("dialog-open");
    presentationTrigger?.focus({ preventScroll: true });
  });

  let toastTimeout;
  const showToast = (message) => {
    clearTimeout(toastTimeout);
    $("#toast").textContent = message;
    $("#toast").classList.add("is-visible");
    toastTimeout = setTimeout(
      () => $("#toast").classList.remove("is-visible"),
      4500,
    );
  };
  $("#copy-email").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("artem.yaroshenko0513@gmail.com");
      showToast("Email copied. Let’s build something thoughtful.");
    } catch {
      showToast(
        "Couldn’t copy automatically. Use the email link or select the address.",
      );
    }
  });
})();
