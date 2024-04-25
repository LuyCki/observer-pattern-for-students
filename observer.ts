import { ISubject } from "./subject";

export interface IObserver<T> {
  next(): void;
  unsubscribe(): void;
}

export class Observer<T> implements IObserver<T> {
  private callback: any;
  private subject: ISubject<T>;

  constructor(callback: any, subject: ISubject<T>) {
    this.callback = callback;
    this.subject = subject;
  }

  public next(): void {
    this.callback(this.subject.getState());
  }

  public unsubscribe(): void {
    this.subject.unsubscribe(this);
  }
}
