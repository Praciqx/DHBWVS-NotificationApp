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
            <ion-label>Uhrzeit</ion-label>
             <ion-datetime v-model="toDate"
                :value="toDate"
                minute-values="0,15,30,45"
                locale="de-DE">
                <span slot="time-label">Uhrzeit</span>
            </ion-datetime>
            <ion-button expand="block" @click="addReminder" shape="round">Speichern</ion-button>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">

import { IonLabel, IonDatetime, IonButton,IonPage,IonHeader,IonContent,IonInput, IonToolbar, IonTitle } from '@ionic/vue';
import { defineComponent } from 'vue';
import { createReminder, saveReminder } from '@/utils/reminderHelpers';

export default defineComponent({
    components:{IonLabel,IonDatetime,IonTitle,IonButton,IonInput,IonContent,IonPage,IonHeader,IonToolbar},
    data() {
        return {
            title:"",
            details:"",
            toDate: new Date().toISOString(),
        };
    },
    methods:{
        async addReminder(){
            const title = this.title;
            const details = this.details;
            const toDate = this.toDate;
            const reminderObj = createReminder(title, details, toDate);
            await saveReminder(reminderObj);
        },
    },
    created(){
        this.title = "";
        this.details = "";
    }
});



</script>