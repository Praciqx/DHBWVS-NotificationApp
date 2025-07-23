<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Erinnerung</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-card v-for="r in reminders" :key="r.id">
        <ion-card-header>
          <ion-card-title>{{ r.title }}</ion-card-title>
          <ion-card-subtitle>
            Datum:
            {{ new Date(r.date).toLocaleDateString('de-DE',{
              day:'2-digit',
              month:'2-digit',
              year:'numeric',
              hour:'2-digit',
              minute:'2-digit'
            })}}
          </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          {{r.details}}
        </ion-card-content>
      </ion-card>
      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button title="addReminder" router-link="/add" router-direction="back">
          <ion-icon :icon="add" title="addReminderIcon"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import { IonFabButton,IonContent, IonTitle, IonToolbar, IonHeader,IonFab,IonPage,IonIcon,IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import {add} from 'ionicons/icons'
  import { useIonRouter } from '@ionic/vue';
  import { getCurrentReminder } from '@/utils/reminderHelpers';

  export default defineComponent({
    components: { IonFabButton,IonContent, IonTitle, IonToolbar, IonHeader,IonFab,IonPage,IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle },
    setup(){
      return {add};
    },
    methods:{
      navigateToAdd(){
        const ionRouter = useIonRouter();
        ionRouter.navigate('/add','back')
      }
    },
    data(){
      return {
        reminders:[] as any[],
      }
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

