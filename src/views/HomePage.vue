<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Erinnerungen</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list v-for="r in reminders" :key="r.id" lines="none">
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
  import { IonAlert,IonItem,IonList,IonFabButton,IonContent, IonTitle, IonToolbar, IonHeader,IonFab,IonPage,IonIcon,IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import {add,trash} from 'ionicons/icons'
  import { getCurrentReminder } from '@/utils/reminderHelpers';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    components: {IonAlert, IonItem,IonList,IonIcon,IonFabButton,IonContent, IonTitle, IonToolbar, IonHeader,IonFab,IonPage,IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle },
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
        this.reminders = await getCurrentReminder();
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
    }
  });

</script>

 <!-- <style>
  :root {
    /**
   * Setting the variables for DEMO purposes only.
   * Values will be set automatically when building an iOS or Android app.
   */
    --ion-safe-area-top: 0px;
    --ion-safe-area-bottom: 40px;
  }
</style>   -->

<style scoped>
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

