// Request Notification Permission
if ("Notification" in window) {
    Notification.requestPermission();
  }

  // Schedule all tasks
  function scheduleTasks() {
    const tasks = [
      { time: "04:30", message: "Wake up! Brahma Muhurta Exercises", isAlarm: true },
      { time: "05:30", message: "Morning Routine" },
      { time: "06:00", message: "Skill Building" },
      { time: "07:30", message: "Breakfast Time" },
      { time: "09:00", message: "Start Work" },
      { time: "18:00", message: "Relaxation Time" },
      { time: "20:30", message: "Leisure Time" },
      { time: "22:00", message: "Time to Sleep", isAlarm: true }
    ];

    tasks.forEach(task => {
      scheduleReminder(task.time, task.message, task.isAlarm || false);
    });

    alert("Reminders and alarms have been scheduled for the day.");
  }

  // Function to schedule reminders or alarms
  function scheduleReminder(time, message, isAlarm) {
    const [hours, minutes] = time.split(":").map(Number);
    const now = new Date();
    const taskTime = new Date();
    taskTime.setHours(hours, minutes, 0, 0);

    if (taskTime < now) {
      taskTime.setDate(taskTime.getDate() + 1); // Schedule for the next day if time has passed
    }

    const timeout = taskTime - now;

    setTimeout(() => {
      if (isAlarm) {
        playAlarm(message); // Ring an alarm for wakeup/sleep
      } else {
        showNotification(message); // Show notification for other tasks
      }
    }, timeout);
  }

  // Function to show notifications
  function showNotification(message) {
    if (Notification.permission === "granted") {
      new Notification(message);
    } else {
      alert(message); // Fallback for unsupported browsers
    }
  }

  // Function to play an alarm
  function playAlarm(message) {
    alert(message); // Alert for now; can be replaced with custom sound
  }

  // Service Worker Registration for Background Notifications
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js").then(reg => {
      console.log("Service Worker Registered", reg);
    });
  }