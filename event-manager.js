export default function EventManager() {
	this.listeners = [];
	this.interceptors = [];
}

EventManager.prototype.AddInterceptor = function(key, handler) {
	if (!this.interceptors.find(interceptor => interceptor.key === key)) this.interceptors.push({ key: key, handlers: [] });
	let interceptor = this.interceptors.find(interceptor => interceptor.key === key);
	interceptor.handlers.push(handler);
};

EventManager.prototype.AddListener = function(key, callback) {
	if (!this.listeners.find(listener => listener.key === key)) this.listeners.push({ key: key, callbacks: [] });
	let event = this.listeners.find(listener => listener.key === key);
	event.callbacks.push(callback);
};

EventManager.prototype.RemoveListener = function(key, remove) {
	let event = this.listeners.find(listener => listener.key === key);
	if (event) {
		event.callbacks = event.callbacks.filter(callback => callback != remove);
	}
};

EventManager.prototype.TriggerEvent = async function(key, ...args) {
  let interceptor = this.interceptors.find(interceptor => interceptor.key === key);
  if (interceptor) {
    interceptor.handlers.forEach(handler => args = handler(...args));
  }

	let event = this.listeners.find(listener => listener.key === key);
	if (event) {
		event.callbacks.forEach(callback => callback(...args));
	}
};
