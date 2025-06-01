const immediatePriority = 1; //立即执行 例如用户点击事件
const userBlockingPriority = 2; //用户阻塞 例如用户滚动拖拽
const normalPriority = 3; //正常 例如render动画，ajax请求
const lowPriority = 4; //低 分析统计
const idlePriority = 5; //空闲 console.log

class Scheduler {
  port: any;
  queue: any[] = [];
  currentTask: any = null;
  isPerformingTask = false;

  constructor() {
    this.queue = [];
    this.port = new MessageChannel();
    this.port.port1.onmessage = this.performTask.bind(this);
  }

  scheduleCallback(scheduleLevel: number, callback: () => void) {
    console.log("执行任务");
    let currentTime = performance.now();
    let timeout = 0;
    switch (scheduleLevel) {
      case immediatePriority:
        timeout = -1;
        break;
      case userBlockingPriority:
        timeout = 250;
        break;
      case normalPriority:
        timeout = 5000;
        break;
      case lowPriority:
        timeout = 10000;
        break;
      case idlePriority:
        timeout = 15000;
        break;
    }
    const task = {
      scheduleLevel,
      callback,
      expiredTime: currentTime + timeout,
    };
    this.addTask(this.queue, task);
    if (!this.isPerformingTask) {
      //如果当前没有正在执行的任务，则执行任务
      this.isPerformingTask = true;
      this.port.port2.postMessage(null);
    }
  }

  addTask(queue: any[], task: any) {
    queue.push(task);
    queue.sort((a, b) => a.expiredTime - b.expiredTime);
  }

  peakTask() {
    return this.queue[0] || null;
  }

  popTask() {
    return this.queue.shift();
  }

  performTask() {
    this.workLoop();
  }

  workLoop() {
    let { callback } = this.peakTask();
    callback && callback();
    this.popTask();
    this.isPerformingTask = false;
    if (this.queue.length > 0) {
      this.isPerformingTask = true;
      this.port.port2.postMessage(null);
    }
  }
}

const scheduler = new Scheduler();
scheduler.scheduleCallback(normalPriority, () => {
  console.log("立即执行2");
});

scheduler.scheduleCallback(immediatePriority, () => {
  console.log("立即执行1");
});
