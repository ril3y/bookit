import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export class MindMapController {
  constructor() {
    this.storage = window.localStorage;
  }

  saveElement(type, data) {
    const elements = this.getElements(type);
    const newElement = {
      ...data,
      id: uuidv4(),
      timestamp: Date.now()
    };
    elements.push(newElement);
    this.storage.setItem(type, JSON.stringify(elements));
    return newElement;
  }

  getElements(type) {
    const data = this.storage.getItem(type);
    return data ? JSON.parse(data) : [];
  }

  updateElement(type, id, data) {
    const elements = this.getElements(type);
    const index = elements.findIndex(e => e.id === id);
    if (index !== -1) {
      elements[index] = { ...elements[index], ...data };
      this.storage.setItem(type, JSON.stringify(elements));
    }
  }

  deleteElement(type, id) {
    const elements = this.getElements(type);
    const filtered = elements.filter(e => e.id !== id);
    this.storage.setItem(type, JSON.stringify(filtered));
  }
}
