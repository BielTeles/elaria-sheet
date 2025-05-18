// src/utils/storage.js
export const PREFIX = 'elaria_sheet_';

export function saveSheet(sheet) {
  localStorage.setItem(PREFIX + sheet.id, JSON.stringify(sheet));
}

export function loadSheets() {
  return Object.keys(localStorage)
    .filter(key => key.startsWith(PREFIX))
    .map(key => JSON.parse(localStorage.getItem(key)));
}

export function loadSheet(id) {
  return JSON.parse(localStorage.getItem(PREFIX + id));
}

export function deleteSheet(id) {
  localStorage.removeItem(PREFIX + id);
}
