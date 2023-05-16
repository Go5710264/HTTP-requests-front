document.addEventListener('DOMContentLoaded', () => {
  const subscribeWidget = document.querySelector('.subscribe');
  const subscribeForm = subscribeWidget.querySelector('.subscribe-form');
  const unsubscribeBtn = subscribeWidget.querySelector('.unsubscribe-btn');

  subscribeForm.addEventListener('submit', (e) => {
    e.preventDefault(); // приостанавливает автоматическую отправку формы

    const body = new FormData(subscribeForm);

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;

      console.log(xhr.responseText);
    };

    xhr.open('POST', 'http://localhost:7070'); // инициализация пустого запроса на сервер

    xhr.send(body);
  });

  unsubscribeBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const body = Array.from(subscribeForm.elements)
      .filter(({ name }) => name)
      .map(({ name, value }) => `${name}=${encodeURIComponent(value)}`)
      .join('&');

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;

      console.log(xhr.responseText);
    };

    xhr.open('DELETE', `http://localhost:7070/?${body}`);

    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.send();
  });

  // Отправка изображения на сервер
  const uploadForm = subscribeWidget.querySelector('.upload-form');
  const previewImage = subscribeWidget.querySelector('.preview-image');

  uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const body = new FormData(uploadForm);

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;

      console.log(xhr.responseText);
      previewImage.src = `http://localhost:7070/${xhr.responseText}`;
    };

    xhr.open('POST', 'http://localhost:7070/upload');

    xhr.send(body);
  });
});
