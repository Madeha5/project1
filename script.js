/**
 * Madeha Mahmoud Abo Elezz - Portfolio Scripts
 * Handles mobile drawer, smooth navigation, project details modal,
 * dynamic CV download, contact form validation, and toast notifications.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. Mobile Drawer Navigation
  // ------------------------------------------------------------------------
  const menuToggle = document.getElementById('menuToggle');
  const drawerClose = document.getElementById('drawerClose');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const openDrawer = () => {
    mobileDrawer.classList.add('active');
    drawerOverlay.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    drawerOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    drawerOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (menuToggle) menuToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // ------------------------------------------------------------------------
  // 2. Active Section Highlighting on Scroll
  // ------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');

  const updateActiveNavLink = () => {
    const scrollY = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        mobileNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  // Header elevation on scroll
  const siteHeader = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }, { passive: true });

  // ------------------------------------------------------------------------
  // 3. Project Details Modal
  // ------------------------------------------------------------------------
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCloseSecondary = document.getElementById('modalCloseSecondary');
  const modalTitle = document.getElementById('modalTitle');
  const modalTypeBadge = document.getElementById('modalTypeBadge');
  const modalBody = document.getElementById('modalBody');
  const modalRepoBtn = document.getElementById('modalRepoBtn');

  // Comprehensive project data for modals
  const projectsData = {
    'ecommerce': {
      title: 'E-Commerce Web Automation Suite',
      badge: 'Web Automation & Regression',
      tools: ['Selenium WebDriver', 'Java 17', 'TestNG', 'Page Object Model', 'Maven', 'ExtentReports'],
      description: 'An enterprise-grade test automation framework developed to validate crucial e-commerce customer journeys, cart calculations, coupon validations, and payment gateway interactions.',
      highlights: [
        'Implemented Page Object Model (POM) pattern for high maintainability and test asset reusability.',
        'Engineered data-driven testing using TestNG @DataProvider with external Excel/JSON test datasets.',
        'Integrated parallel execution across Chrome, Firefox, and Edge browsers, cutting regression run times by 45%.',
        'Configured automated screenshot capture on test failures integrated into rich Extent HTML reports.'
      ],
      scenariosCovered: 'User Registration, Search & Filtering, Cart Persistence, Multi-currency Checkout, Order Confirmation.'
    },
    'banking-api': {
      title: 'Financial Services REST API Framework',
      badge: 'API & Backend Automation',
      tools: ['Postman', 'RestAssured', 'Java', 'Newman', 'JSON Schema Validator', 'Git'],
      description: 'Comprehensive API automated testing framework verifying security headers, payload structures, JSON schema conformance, and transaction integrity across core banking microservices.',
      highlights: [
        'Constructed end-to-end API test flows validating Bearer token generation, refresh logic, and role-based permissions.',
        'Utilized RestAssured for automated schema validation, header verification, and response time threshold assertions (<500ms).',
        'Configured Newman CLI execution in Azure DevOps CI/CD pipeline triggering automated API regression on pull requests.',
        'Extracted dynamic session values and chain-linked sequential API requests without hardcoded tokens.'
      ],
      scenariosCovered: 'Authentication, Balance Inquiries, Fund Transfers, Currency Conversion, Rate Limiting & Error Edge Cases.'
    },
    'healthcare-bdd': {
      title: 'Healthcare Portal BDD Test Framework',
      badge: 'BDD & Acceptance Testing',
      tools: ['Cucumber', 'Java', 'Selenium WebDriver', 'Gherkin', 'Maven', 'Jira / Xray'],
      description: 'Behavior-Driven Development test framework establishing unified communication between QA, software engineers, and product stakeholders using human-readable Gherkin feature files.',
      highlights: [
        'Authored clean, declarative Gherkin feature scenarios with Scenario Outlines and Examples tables.',
        'Implemented modular Step Definition classes with strict assertion checkpoints and custom hooks.',
        'Mapped feature scenarios directly to Jira user stories for end-to-end traceability and audit compliance.',
        'Automated HIPAA-sensitive data masking in test logs and execution artifacts.'
      ],
      scenariosCovered: 'Patient Onboarding, Doctor Appointment Booking, Prescription Uploads, Telehealth Access, Role Permissions.'
    },
    'load-testing': {
      title: 'Enterprise SaaS Load & Stress Testing',
      badge: 'Performance & Scalability',
      tools: ['Apache JMeter', 'SQL', 'Azure DevOps', 'Grafana', 'Jira'],
      description: 'High-throughput performance and scalability assessment designed to identify latency bottlenecks, server thread contention, and database query slowdowns prior to peak traffic events.',
      highlights: [
        'Configured JMeter Thread Groups simulating ramp-up, steady-state, and peak stress loads up to 1,500 concurrent virtual users.',
        'Monitored 90th and 95th percentile response times, throughput (TPS), and HTTP error percentage rates.',
        'Executed SQL profiling to detect unindexed database queries causing database lockups during concurrent write operations.',
        'Delivered executive performance report identifying key infrastructure bottlenecks, leading to a 35% improvement in API response times.'
      ],
      scenariosCovered: 'Concurrent Login Stress, Catalog Browsing Spike Test, Bulk Order Placement Endurance, Database Connection Saturation.'
    }
  };

  const openProjectModal = (projectId) => {
    const data = projectsData[projectId];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalTypeBadge.textContent = data.badge;

    modalBody.innerHTML = `
      <div>
        <h4 class="modal-section-title">Overview</h4>
        <p class="modal-text" style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">${data.description}</p>
      </div>

      <div>
        <h4 class="modal-section-title">Tools &amp; Stack</h4>
        <div class="project-tools" style="margin-top: 6px;">
          ${data.tools.map(t => `<span class="tool-tag">${t}</span>`).join('')}
        </div>
      </div>

      <div>
        <h4 class="modal-section-title">Key QA Accomplishments</h4>
        <div class="modal-list">
          ${data.highlights.map(h => `
            <div class="modal-list-item">
              <span class="modal-bullet">&bull;</span>
              <span>${h}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div>
        <h4 class="modal-section-title">Core Scenarios Covered</h4>
        <p style="font-size: 0.9rem; color: var(--text-muted); font-style: italic;">${data.scenariosCovered}</p>
      </div>
    `;

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.view-project-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const projectId = e.currentTarget.getAttribute('data-project-id');
      openProjectModal(projectId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalCloseSecondary) modalCloseSecondary.addEventListener('click', closeProjectModal);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }

  // ------------------------------------------------------------------------
  // 4. Download CV Modal & PDF Generation
  // ------------------------------------------------------------------------
  const cvModal = document.getElementById('cvModal');
  const cvModalCloseBtn = document.getElementById('cvModalCloseBtn');
  const cvModalCloseSecondary = document.getElementById('cvModalCloseSecondary');
  const confirmCvDownload = document.getElementById('confirmCvDownload');
  const cvButtons = [
    document.getElementById('headerCvBtn'),
    document.getElementById('heroCvBtn'),
    document.getElementById('drawerCvBtn')
  ];

  const openCvModal = () => {
    cvModal.classList.add('active');
    cvModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeCvModal = () => {
    cvModal.classList.remove('active');
    cvModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  cvButtons.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openCvModal();
      });
    }
  });

  if (cvModalCloseBtn) cvModalCloseBtn.addEventListener('click', closeCvModal);
  if (cvModalCloseSecondary) cvModalCloseSecondary.addEventListener('click', closeCvModal);
  if (cvModal) {
    cvModal.addEventListener('click', (e) => {
      if (e.target === cvModal) closeCvModal();
    });
  }

  // Generate downloadable CV file dynamically (formatted text CV / PDF representation)
  const triggerCvDownload = () => {
    const cvContent = `================================================================================
MADEHA MAHMOUD ABO ELEZZ
Software Tester | QA Engineer | Automation Tester
Email: madeha.qa@example.com | Location: Cairo, Egypt
LinkedIn: https://linkedin.com/in/madeha-mahmoud
GitHub: https://github.com/madeha-mahmoud
================================================================================

PROFESSIONAL SUMMARY
--------------------------------------------------------------------------------
Detail-oriented Software Tester and QA Engineer with proven expertise in test 
automation, API testing, performance evaluation, and defect prevention across 
agile software development lifecycles. Adept at building robust test automation 
frameworks using Selenium, Java, TestNG, and Cucumber, ensuring scalable, 
high-quality web applications with zero production leakage.

CORE TECHNICAL COMPETENCIES
--------------------------------------------------------------------------------
* Automation Testing: Selenium WebDriver, TestNG, Cucumber (BDD), Maven
* Programming: Java (Core OOP, Collections, Exception Handling)
* API & Integration Testing: Postman, RestAssured, JSON Schema, Newman
* Performance & Database: Apache JMeter, SQL (PostgreSQL, MySQL, SQL Server)
* Test Management & CI/CD: Jira, Azure DevOps, Git, GitHub, TestRail

KEY AUTOMATION PROJECTS
--------------------------------------------------------------------------------
1. E-Commerce Web Automation Suite
   - Tools: Selenium WebDriver, Java, TestNG, Page Object Model (POM), Maven
   - Automated end-to-end regression testing for product search, shopping cart, 
     checkout workflows, and authentication.
   - Reduced regression testing turnaround time by 45% through multi-browser 
     parallel execution.

2. Financial Services REST API Testing Framework
   - Tools: Postman, RestAssured, JSON, Newman, Azure DevOps
   - Automated verification of 40+ REST API endpoints validating authorization 
     tokens, HTTP response status codes, payload schemas, and error codes.
   - Integrated automated collection runs into continuous delivery pipelines.

3. Healthcare Portal BDD Automation Framework
   - Tools: Cucumber, Java, Selenium WebDriver, Gherkin, Git
   - Authored clean, maintainable Gherkin feature files bridging functional 
     requirements and technical validation for patient record management.

4. Enterprise SaaS Performance & Load Testing
   - Tools: Apache JMeter, SQL, Azure DevOps
   - Executed load simulations for 1,200+ concurrent virtual users to isolate 
     database deadlocks and API latency bottlenecks before release.

EDUCATION & CERTIFICATIONS
--------------------------------------------------------------------------------
* Bachelor of Science in Computer Science / Information Technology
* ISTQB Certified Tester Foundation Level (CTFL) - Preparation & Practice
* Automated Software Testing with Selenium & Java Specialization

================================================================================
Generated via Madeha Mahmoud Abo Elezz Portfolio
================================================================================`;

    const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Madeha_Mahmoud_Abo_Elezz_CV.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    closeCvModal();
    showToast('CV downloaded successfully! Thank you for your interest.');
  };

  if (confirmCvDownload) {
    confirmCvDownload.addEventListener('click', triggerCvDownload);
  }

  // ------------------------------------------------------------------------
  // 5. Contact Form Validation & Submission
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const subjectInput = document.getElementById('contactSubject');
  const messageInput = document.getElementById('contactMessage');
  const submitBtn = document.getElementById('submitBtn');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (input, condition) => {
    const formGroup = input.closest('.form-group');
    if (!condition) {
      formGroup.classList.add('has-error');
      return false;
    } else {
      formGroup.classList.remove('has-error');
      return true;
    }
  };

  // Real-time input validation cleanups
  [nameInput, emailInput, subjectInput, messageInput].forEach(field => {
    if (field) {
      field.addEventListener('input', () => {
        field.closest('.form-group').classList.remove('has-error');
      });
    }
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateField(nameInput, nameInput.value.trim().length > 1);
      const isEmailValid = validateField(emailInput, emailRegex.test(emailInput.value.trim()));
      const isSubjectValid = validateField(subjectInput, subjectInput.value.trim().length > 1);
      const isMessageValid = validateField(messageInput, messageInput.value.trim().length > 5);

      if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        // Simulate sending process
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span class="btn-text">Sending...</span>
        `;

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          contactForm.reset();
          showToast('Thank you! Your message has been sent successfully.');
        }, 800);
      }
    });
  }

  // ------------------------------------------------------------------------
  // 6. Toast Notification Helper
  // ------------------------------------------------------------------------
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  const toastIcon = document.getElementById('toastIcon');
  let toastTimeout;

  const showToast = (message) => {
    if (!toast) return;

    if (toastIcon) {
      toastIcon.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      `;
    }

    toastMessage.textContent = message;
    toast.classList.add('active');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('active');
    }, 4500);
  };

  // ------------------------------------------------------------------------
  // 7. Global Keyboard Accessibility (Escape to close modals & drawer)
  // ------------------------------------------------------------------------
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (mobileDrawer.classList.contains('active')) closeDrawer();
      if (projectModal.classList.contains('active')) closeProjectModal();
      if (cvModal.classList.contains('active')) closeCvModal();
    }
  });

  // ------------------------------------------------------------------------
  // 8. Subtle QA Test Pipeline Activity Simulation
  // ------------------------------------------------------------------------
  const activeRunItem = document.querySelector('.pipeline-item.active-run');
  if (activeRunItem) {
    const pipelineItems = [
      { name: 'Database Integrity Verification', tool: 'SQL Assertions', time: '0.6s' },
      { name: 'Cross-Browser Grid Regression', tool: 'Selenium Grid', time: '1.8s' },
      { name: 'Security Header Checks', tool: 'Postman & RestAssured', time: '0.9s' }
    ];
    let currentIndex = 0;

    setInterval(() => {
      currentIndex = (currentIndex + 1) % pipelineItems.length;
      const current = pipelineItems[currentIndex];
      const nameEl = activeRunItem.querySelector('.pipeline-name');
      const metaEl = activeRunItem.querySelector('.pipeline-meta');
      if (nameEl && metaEl) {
        nameEl.textContent = current.name;
        metaEl.textContent = `${current.tool} • In Progress`;
      }
    }, 4000);
  }
});
