import { Preferences } from "@capacitor/preferences";
import { LocalNotifications } from "@capacitor/local-notifications";
import { Capacitor } from '@capacitor/core';

export function createReminder(title:string, details:string, date:string){
    return {
        id:crypto.randomUUID(),
        title: title,
        details: details,
        date: date,
        done:false,
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

export async function scheduleNotification(id:string, title: string, details: string, date: Date) {
  console.log(date);
  await LocalNotifications.schedule({
    notifications: [
      {
        title: title,
        body: details,
        id: Math.floor(Math.random() * 1000000), 
        schedule: { at: new Date(date)}, 
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

const getCurrentReminder = async () => {
  const { value } = await Preferences.get({ key: 'reminders' });
  return value ? JSON.parse(value) : [];
};

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

export {getCurrentReminder};