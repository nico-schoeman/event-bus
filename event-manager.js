export default function EventManager () {
    this.listeners = [];
}

EventManager.prototype.AddListener = function (key, callback) {
    if (!this.listeners.find(listener => listener.key === key))
        this.listeners.push({key: key, callbacks: []});
    let event = this.listeners.find(listener => listener.key === key);
    event.callbacks.push(callback);
}

EventManager.prototype.RemoveListener = function (key, remove) {
    let event = this.listeners.find(listener => listener.key === key);
    if (event) {
        event.callbacks = event.callbacks.filter(callback => callback != remove);
    }
}

EventManager.prototype.TriggerEvent = function (key) {
    let event = this.listeners.find(listener => listener.key === key);
    if (event) {
        event.callbacks.forEach(callback => callback());
    }
}