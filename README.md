# Wedding Invitation — первая версия

Это готовый React + Vite проект свадебного digital-приглашения.

## Запуск

Нужен Node.js.

```bash
npm install
npm run dev
```

После запуска Vite покажет локальный адрес, обычно:
http://localhost:5173

## Что изменить

Основные данные находятся в:

`src/App.jsx`

Найди:

```js
const wedding = {
  bride: "Amelia",
  groom: "Alexander",
  date: "2026-09-27T17:00:00",
  displayDate: "27 • 09 • 2026",
  weekday: "Воскресенье",
  venue: "The Garden House",
  address: "Ташкент, Узбекистан",
  ceremony: "17:00",
  dinner: "18:30",
  dressCode: "Elegant • Garden",
};
```

Замени значения на свои.

## Музыка

Положи MP3-файл в:

`public/music.mp3`

Название файла должно быть именно:

`music.mp3`

Если хочешь другое имя — измени переменную `musicFile` в `src/App.jsx`.

## Фотографии

Сейчас фотография заменена красивым placeholder-блоком.

Для следующей версии можно добавить реальные фотографии в:

`public/images/`

и заменить placeholder на `<img>`.

## Карта

Кнопка "Открыть на карте" сейчас ведёт на Google Maps.

В `src/App.jsx` замени:

`https://maps.google.com`

на ссылку конкретного места.

## Важно

RSVP в этой первой версии демонстрационный: после отправки появляется alert.

Для реального приглашения можно подключить Telegram Bot, Google Sheets, Formspree или собственный backend.

## Публикация

Проект можно бесплатно разместить на Vercel.

После загрузки проекта в GitHub:

1. Открой Vercel.
2. Import Project.
3. Выбери репозиторий.
4. Framework Preset: Vite.
5. Deploy.

Покупать домен для бесплатной ссылки не обязательно.
