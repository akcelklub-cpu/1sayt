document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('icon-open');
  const iconClose = document.getElementById('icon-close');

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      iconOpen.classList.toggle('hidden');
      iconClose.classList.toggle('hidden');
    });

    document.querySelectorAll('#mobile-menu a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        iconOpen.classList.remove('hidden');
        iconClose.classList.add('hidden');
      });
    });
  }

  // Header shadow on scroll
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('shadow-md', window.scrollY > 10);
    });
  }

  // Survey ("Опросный лист") -> prefill request form
  const surveyForm = document.getElementById('survey-form');
  if (surveyForm) {
    surveyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(surveyForm);
      const type = data.get('type');
      const dn = data.get('dn');
      const pn = data.get('pn');
      const temp = data.get('temp');
      const medium = data.get('medium');
      const comment = data.get('comment');

      let summary = 'Запрос на подбор арматуры:\n';
      if (type) summary += `— Тип арматуры: ${type}\n`;
      if (dn) summary += `— Условный проход Ду: ${dn} мм\n`;
      if (pn) summary += `— Рабочее давление Ру: ${pn} МПа\n`;
      if (temp) summary += `— Рабочая температура: ${temp} °C\n`;
      if (medium) summary += `— Рабочая среда: ${medium}\n`;
      if (comment) summary += `— Комментарий: ${comment}\n`;

      const taskField = document.getElementById('task-description');
      if (taskField) {
        taskField.value = summary;
      }

      const target = document.getElementById('contact-form');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      const nameField = document.getElementById('name');
      if (nameField) {
        setTimeout(() => nameField.focus(), 600);
      }
    });
  }

  // Request form submit (visual only, no backend yet)
  const requestForm = document.getElementById('request-form');
  const successMessage = document.getElementById('form-success');
  if (requestForm && successMessage) {
    requestForm.addEventListener('submit', (e) => {
      e.preventDefault();
      successMessage.classList.remove('hidden');
      requestForm.reset();
      successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
});
