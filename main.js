class Observer {
  #callback;
  #subject;

  constructor(callback, subject) {
    this.#callback = callback;
    this.#subject = subject;
  }

  next() {
    this.#callback(this.#subject.getState());
  }

  unsubscribe() {
    this.#subject.unsubscribe(this);
  }
}

class Subject {
  #observers = [];
  #state;

  getState() {
    return this.#state;
  }

  next(state) {
    this.#state = state;
    this.#observers.forEach((observer) => observer.next());
  }

  subscribe(callback) {
    const observer = new Observer(callback, this);
    this.#observers.push(observer);

    return observer;
  }

  unsubscribe(observer) {
    const observerIndex = this.#observers.indexOf(observer);

    this.#observers.splice(observerIndex, 1);
  }
}

const users$ = new Subject();

users$.subscribe((values) => {
  console.log("Component A: ", values);
});

users$.subscribe((values) => {
  console.log("Component B: ", values);
});

users$.next({ name: "Andreea" });
