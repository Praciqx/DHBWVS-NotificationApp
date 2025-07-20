<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Reminder</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Mant tropfen geben</ion-card-title>
          <ion-card-subtitle>sehr wichtig, nicht vergessen</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          leerer Text
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
    }
  });

</script>

 <style>
  :root {
    /**
   * Setting the variables for DEMO purposes only.
   * Values will be set automatically when building an iOS or Android app.
   */
    --ion-safe-area-top: 0px;
    --ion-safe-area-bottom: 40px;
  }
</style>  

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

