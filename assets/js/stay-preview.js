// Keep unfinished listings out of the public page, including without JavaScript.
(() => {
  const localHosts = ['localhost', '127.0.0.1', '[::1]'];
  if (location.protocol !== 'file:' && !localHosts.includes(location.hostname)) return;
  const template = document.getElementById('stay-draft');
  const preview = document.getElementById('stay-preview');
  if (template && preview) preview.replaceChildren(template.content.cloneNode(true));
})();
