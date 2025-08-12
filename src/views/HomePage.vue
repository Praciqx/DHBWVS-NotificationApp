<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Erinnerungen</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list v-for="(r,i) in sortedReminders" :key="r.id" lines="none">
        <ion-item-divider
          v-if="i===0 || !isSameMonth(sortedReminders[i-1].date, r.date)"sticky class="month-banner">
          <ion-label>{{ monthLabel(r.date) }}</ion-label>
        </ion-item-divider>
          <ion-item>
            <div style="text-align:center; width:48px;">
              <div style="font-size:20px; font-weight:bold;">
                {{ new Date(r.date).getDate() }}
              </div>
              <div style="font-size:14px; color:gray;">
                {{ new Date(r.date).toLocaleDateString('de-DE', { weekday: 'short',month:'short' }) }}
              </div>
            </div>
            <ion-card style="width: 100%;" 
              :style="{backgroundColor:'rgba(165,206,227,255)',color:'#1a1a1a'}" 
              @click="editReminder(r)">
              <ion-card-header>
                <ion-card-title :style="{color:'#1a1a1a'}">{{ r.title }}</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                {{ new Date(r.date).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) }}
                <span v-if="r.details"> – {{ r.details }}</span>
                <div>
                  <ion-note class="due-note" color="medium">{{r.due}}</ion-note>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-item>
      </ion-list>
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

  export default defineComponent({
    components: {IonLabel,IonItemDivider,IonAlert, IonItem,IonList,IonIcon,IonFabButton,IonContent, IonTitle, IonToolbar, IonHeader,IonFab,IonPage,IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle },
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
        this.reminders = reminderList.map((r:any) => ({ ...r, due: this.calcDueDate(r.date) }));
      },
      isSameMonth(a: string, b: string){
        const da = new Date(a), db = new Date(b);
        return da.getFullYear() === db.getFullYear() && da.getMonth() === db.getMonth();
      },
      monthLabel(d: string){
        return new Date(d).toLocaleDateString('de-DE', { month: 'long' });
      },
      calcDueDate(dS:string){
        const t = new Date(dS).getTime();
        const now = Date.now();
        const currentDate = new Date();
        const givenDate = new Date(dS);
        let diff = t - now;
        const isToday = givenDate.getFullYear() === currentDate.getFullYear()
                        && givenDate.getMonth() === currentDate.getMonth()
                        && givenDate.getDate() === currentDate.getDate();
        if(isToday){
          return "Heute fällig";
        }
        if(diff < 0){
          return "Vergangen"
        }
        return "";
      }
    },
    data(){
      return {
        reminders:[] as any[],
      }
    },  
    ionViewWillEnter() {
      this.load();
    },
    async created(){
      this.reminders = await getCurrentReminder();
    },
    computed:{
      sortedReminders(): any[]{
        return this.reminders.slice().sort((a: any, b: any) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
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


