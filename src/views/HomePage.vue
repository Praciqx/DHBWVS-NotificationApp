<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Erinnerungen</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ReminderList title="Heute" :items="todayList" @edit="editReminder" @delete="deleteReminder" />
      <ReminderList title="Zukunft" :items="futureList" @edit="editReminder" @delete="deleteReminder" />
      <ReminderList title="Vergangenheit" :items="pastList" @edit="editReminder" @delete="deleteReminder" />
      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button title="addReminder" @click="navigateToAdd()">
          <ion-icon :icon="add" title="addReminderIcon"></ion-icon>
        </ion-fab-button>
      </ion-fab> 
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import { IonLabel,IonItemDivider,IonAlert,IonItem,IonList,IonFabButton,IonContent, IonTitle, IonToolbar, IonHeader,IonFab,IonPage,IonIcon,IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import {add,trash} from 'ionicons/icons'
  import { getCurrentReminder } from '@/utils/reminderHelpers';
  import { useRouter } from 'vue-router';
  import ReminderList from './ReminderList.vue';
  import { deleteReminderById } from '@/utils/reminderHelpers';

  export default defineComponent({
    components: {ReminderList,IonLabel,IonItemDivider,IonAlert, IonItem,IonList,IonIcon,IonFabButton,IonContent, IonTitle, IonToolbar, IonHeader,IonFab,IonPage,IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle },
    setup(){
      const router = useRouter();
      return {add, router,trash};
    },
    methods:{
      navigateToAdd(){
        (document.activeElement as any).blur();
        this.router.push('/add')
      },
      editReminder(r:any){
        (document.activeElement as any).blur();
        this.router.push(`/edit/${r.id}`)
      },
      async load(){
        const reminderList = await getCurrentReminder();
        this.reminders = reminderList;
      },
      isToday(dateString:string){
        const dt = new Date(dateString);
        const n = new Date();
        return dt.getFullYear()===n.getFullYear() && dt.getMonth()===n.getMonth() && dt.getDate()===n.getDate();
      },
      async deleteReminder(id:string){
        if(!id) return;
        await deleteReminderById(id);
        this.showDeleteAlert = false;
        (document.activeElement as any).blur();
        this.load();
      },
    },
    data(){
      return {
        reminders:[] as any[],
        showDeleteAlert:false
      }
    },  
    ionViewWillEnter() {
      this.load();
    },     
    computed:{
      todayList(){
        return this.reminders
        .filter(r => this.isToday(r.date))
        .sort((a,b)=> new Date(a.date).getTime() - new Date(b.date).getTime());
      },
      futureList(){
        const now = Date.now();
        return this.reminders
          .filter(r => !this.isToday(r.date) && new Date(r.date).getTime() > now)
          .sort((a,b)=> new Date(a.date).getTime() - new Date(b.date).getTime());
      },
      pastList(){
        const now = Date.now();
        return this.reminders
          .filter(r => !this.isToday(r.date) && new Date(r.date).getTime() < now)
          .sort((a,b)=> new Date(b.date).getTime() - new Date(a.date).getTime());
        }
      }
  });
</script>

<style scoped>
.month-banner {
  font-weight: 800;
  letter-spacing: 0.07em;
  font-size: 1.5rem;
  border:1px;
}
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
ion-fab {
    margin-top: var(--ion-safe-area-top, 0);
    margin-bottom: var(--ion-safe-area-bottom, 0);
}
</style>


