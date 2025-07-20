<template>
    <ion-page>
        <ion-header :translucent="true">
        <ion-toolbar>
            <ion-title>Reminder hinzufügen</ion-title>
        </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-input v-model="title" label="Titel" label-placement="floating" placeholder="Titel eingeben">
            </ion-input>
            <ion-input v-model="details" label="Details" label-placement="floating" placeholder="Beschreibung eingeben">
            </ion-input>
            <ion-button expand="block" @click="addReminder" shape="round">Speichern</ion-button>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">

import { Preferences } from '@capacitor/preferences';
import { IonButton,IonPage,IonHeader,IonContent,IonInput, IonToolbar, IonTitle } from '@ionic/vue';
import { defineComponent } from 'vue';
import { createReminder, saveReminder } from '@/utils/reminderHelpers';

export default defineComponent({
    components:{IonTitle,IonButton,IonInput,IonContent,IonPage,IonHeader,IonToolbar},
    data() {
        return {
            title:"",
            details:"",
        };
    },
    methods:{
        async addReminder(){
            const title = this.title;
            const details = this.details;
            const reminderObj = createReminder(title, details, '2025-01-01');
            await saveReminder(reminderObj);
        },
    }
});



</script>