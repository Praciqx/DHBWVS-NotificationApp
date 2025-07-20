<template>
    <ion-page>
        <ion-header :translucent="true">
        <ion-toolbar>
            <ion-title>Reminder hinzufügen</ion-title>
        </ion-toolbar>
        </ion-header>
    </ion-page>
    <ion-content :fullscreen="true">
        <ion-input label="Titel" label-placement="floating" placeholder="Titel eingeben">
        </ion-input>
        <ion-input label="Details" label-placement="floating" placeholder="Beschreibung eingeben">
        </ion-input>
        <ion-button expand="block" shape="round">Speichern</ion-button>
    </ion-content>
</template>

<script lang="ts">

import { IonButton,IonPage,IonHeader,IonContent,IonInput, IonToolbar, IonTitle } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components:{IonTitle,IonButton,IonInput,IonContent,IonPage,IonHeader,IonToolbar},
    data() {
        return {
            text:"Das ist ein Component"
        };
    },
});



</script>