export function initInteractions() {
  // Click to Copy Email
  const toast = document.getElementById('toast-notice');

  document.querySelectorAll('[data-copy-email]').forEach(copyBtn => {
    copyBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = 'lakshanasaravanan1212@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        showToast('Email copied to clipboard!');
      } catch {
        showToast('Could not copy email. Please copy it from the address above.');
      }
    });
  });

    function showToast(message) {
      if (toast) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 2600);
      }
    }

  // Project Details Modal System
    const modalOverlay = document.getElementById('project-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalDetails = document.getElementById('modal-details');

    const projectData = {
      fitness: {
        title: 'Fitness Tracking Mobile Application',
        subtitle: 'Mobile UX/UI Design • Health & Activity Dashboard',
        description: `
          <p>A mobile app concept for tracking workouts, nutrition, and fitness goals.</p>
          <h4 style="margin: 16px 0 8px; color: var(--brown); font-size: 16px;">Key Contributions & Process:</h4>
          <ul>
            <li><strong>Research & flows:</strong> Created user personas and user flows for the core fitness tasks.</li>
            <li><strong>Wireframes & prototypes:</strong> Designed wireframes and interactive prototypes in Figma.</li>
            <li><strong>Responsive UI:</strong> Applied typography and color theory, with a focus on intuitive navigation and accessible interfaces.</li>
          </ul>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 18px;">
            <span class="project-tag">Figma</span>
            <span class="project-tag">Wireframing</span>
            <span class="project-tag">Usability Testing</span>
            <span class="project-tag">Responsive Mobile UI</span>
          </div>
        `
      },
      gatepass: {
        title: 'Smart Gate Pass Management System',
        subtitle: 'Web Interface & Mobile Portal • Automated Campus Logistics',
        description: `
          <p>A responsive web-interface concept for students, faculty, and administrators to manage gate-pass requests.</p>
          <h4 style="margin: 16px 0 8px; color: var(--brown); font-size: 16px;">Key Contributions & Process:</h4>
          <ul>
            <li><strong>User flows:</strong> Mapped request and review journeys for students, faculty, and administrators.</li>
            <li><strong>Wireframes & prototypes:</strong> Created interface wireframes and interactive Figma prototypes.</li>
            <li><strong>Responsive UI:</strong> Focused on intuitive navigation, efficient workflows, and consistent design components.</li>
          </ul>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 18px;">
            <span class="project-tag">Figma</span>
            <span class="project-tag">Information Architecture</span>
            <span class="project-tag">Responsive UI</span>
            <span class="project-tag">Design System</span>
          </div>
        `
      },
      dashboard: {
        title: 'Student Learning Dashboard & Evaluation',
        subtitle: 'EdTech Portal • Progress Analytics & Interactive Quizzes',
        description: `
          <p>A student dashboard concept for course management, assignments, quizzes, and performance analytics.</p>
          <h4 style="margin: 16px 0 8px; color: var(--brown); font-size: 16px;">Key Contributions & Process:</h4>
          <ul>
            <li><strong>User research:</strong> Used research to guide dashboard navigation and engagement decisions.</li>
            <li><strong>Wireframes & prototypes:</strong> Created wireframes and interactive prototypes in Figma.</li>
            <li><strong>Reusable components:</strong> Designed reusable UI components for a consistent learning experience.</li>
          </ul>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 18px;">
            <span class="project-tag">Figma</span>
            <span class="project-tag">Component Library</span>
            <span class="project-tag">Data Visualization</span>
            <span class="project-tag">EdTech UI</span>
          </div>
        `
      }
    };

    window.openProjectModal = function(key) {
      const data = projectData[key];
      if (data && modalDetails) {
        modalDetails.innerHTML = `
          <h3 class="modal-project-title">${data.title}</h3>
          <div class="modal-project-sub">${data.subtitle}</div>
          <div class="modal-project-body">${data.description}</div>
        `;
        modalOverlay.classList.add('is-open');
        modalOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    };

    function closeModal() {
      if (modalOverlay) {
        modalOverlay.classList.remove('is-open');
        modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    }

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('is-open')) {
        closeModal();
      }
    });
}
