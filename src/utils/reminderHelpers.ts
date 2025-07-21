import { Preferences } from "@capacitor/preferences";

export function createReminder(title:string, details:string, date:string){
    return {
        id:crypto.randomUUID(),
        title: title,
        details: details,
        date: date,
        done:false,
    }
}

export async function saveReminder(reminderobject:Object){
    const currentReminder = await getCurrentReminder();
    currentReminder.push(reminderobject);
    await Preferences.set({
        key:'reminders',
        value: JSON.stringify(currentReminder),
    });
    return currentReminder;
}


const getCurrentReminder = async () => {
  const { value } = await Preferences.get({ key: 'reminders' });
  return value ? JSON.parse(value) : [];
};

export {getCurrentReminder};