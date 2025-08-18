import { Preferences } from "@capacitor/preferences";
import { LocalNotifications } from "@capacitor/local-notifications";
import { Capacitor } from '@capacitor/core';

export function createReminder(title:string, details:string, date:string, id?:string | null){
    return {
        id: id || crypto.randomUUID(),
        title: title,
        details: details,
        date: date,
    }
}

export async function saveReminder(reminderobject:any){
    const { id,title, details, date } = reminderobject;
    const currentReminder = await getCurrentReminder();
    currentReminder.push(reminderobject);
    await Preferences.set({
        key:'reminders',
        value: JSON.stringify(currentReminder),
    });
    
    scheduleNotification(id,title,details,date);
    return currentReminder;
}

export async function editReminder(reminderobject:any){
  const currentReminder = await getCurrentReminder();
  const editIndex= currentReminder.findIndex((r: { id: string }) => r.id === reminderobject.id);
  currentReminder[editIndex] = reminderobject;
  removeNotificationById(reminderobject.id);
  scheduleNotification(reminderobject.id,reminderobject.title, reminderobject.details, reminderobject.date);
  await Preferences.set({ key: 'reminders', value: JSON.stringify(currentReminder) });
}

export async function scheduleNotification(id:string, title: string, details: string, date: Date) {
  await LocalNotifications.schedule({
    notifications: [
      {
        title: title,
        body: details,
        id: Math.floor(Math.random() * 1000000), 
        schedule: { 
          at: new Date(date),
          allowWhileIdle: true,
        }, 
        sound: undefined,
        smallIcon: "ic_stat_icon_config_sample",
        actionTypeId: "reminders",
        extra: {
            reminderId: id
        }
      }
    ]
  }).then(()=>{
    console.log("Notification geplant!");
  }).catch(err =>{
    console.error("Fehler beim Planen der Notification!");
  });
}

async function removeNotificationById(reminderId:string){
    const pending = await LocalNotifications.getPending();
    const toCancel = pending.notifications
      .filter(n => (n.extra as any)?.reminderId === reminderId)
      .map(n => ({ id: n.id }));
    if(toCancel.length){
      await LocalNotifications.cancel({notifications:toCancel}).then(()=>{
        console.log("Notification mit der ID "+reminderId+" wurde gelöscht.");
      }).catch(err=>{
        console.log("Notification mit der ID "+reminderId+" konnte nicht gelöscht werden.~n"+err)
      });
    }
}

export async function getCurrentReminder(){
  const { value } = await Preferences.get({ key: 'reminders' });
  return value ? JSON.parse(value) : [];
};

export async function getReminderById(id:string){
  const currentReminder = await getCurrentReminder();
  const reminder = currentReminder.find((r: any) => r.id === id);
  return reminder || null;
}

export async function deleteReminderById(id:string){
  const currentReminder = await getCurrentReminder();
  const newReminders = currentReminder.filter((r: { id: string }) => r.id !== id);
  await Preferences.set({
    key: 'reminders',
    value: JSON.stringify(newReminders)
  });
}

export async function initializeNotifications() {
  const perm = await LocalNotifications.requestPermissions();
  if(Capacitor.getPlatform() !== "web"){
    await LocalNotifications.createChannel({
        id: 'reminders',
        name: 'Reminder Notifications',
        description: 'Alle geplanten Erinnerungen',
        importance: 5, 
        sound: 'default' 
    });
  }
}
