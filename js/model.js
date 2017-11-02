export class DefaultAdapter {
  constructor() {
    if (new.target === DefaultAdapter) {
      throw new Error();
    }
  }

  preprocess(data) {
    return data;
  }
}

const defaultAdapter = new class extends DefaultAdapter {}();

export default class Model {
  get urlRead() {
    throw new Error(`Abstract method. Define the read url for model.`);
  }

  load(adapter = defaultAdapter) {
    return fetch(this.urlRead)
      .then((res) => res.json())
      .then(adapter.preprocess);
  }
}
