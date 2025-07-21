<template>
    <ion-page>
        <ion-header :translucent="true">
        <ion-toolbar>
            <ion-title>Erinnerung hinzufügen</ion-title>
        </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" class="ion-padding">
            <ion-input :required="true" v-model="title"
                label-placement="stacked"
                placeholder="Titel hinzufügen"
                 :class="{ 'ion-invalid': showErrors && title.trim() === '', 'ion-touched': showErrors }"
                :errorText="title.trim() == '' && showErrors ? 'Titel ist erforderlich' : ''"
                >
                <ion-icon slot="start" :icon="pencil" aria-hidden="true"></ion-icon>
            </ion-input>
            <ion-input class="ion-margin-top ion-margin-bottom" v-model="details"
                placeholder="Beschreibung hinzufügen">
                  <ion-icon slot="start" :icon="listOutline" aria-hidden="true"></ion-icon>
            </ion-input>
            <ion-label>Uhrzeit</ion-label>
             <ion-datetime v-model="toDate"
                :value="toDate"
                locale="de-DE">
                <span slot="time-label">Uhrzeit</span>
            </ion-datetime>
            <ion-button expand="block" @click="addReminder" shape="round">Speichern</ion-button>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">

import { IonIcon,IonLabel, IonDatetime, IonButton,IonPage,IonHeader,IonContent,IonInput, IonToolbar, IonTitle } from '@ionic/vue';
import { defineComponent } from 'vue';
import {listOutline,pencil} from 'ionicons/icons'
import { createReminder, saveReminder } from '@/utils/reminderHelpers';

export default defineComponent({
    name:'AddReminder',
    setup(){
        return {listOutline,pencil};
    },
    components:{IonIcon,IonLabel,IonDatetime,IonTitle,IonButton,IonInput,IonContent,IonPage,IonHeader,IonToolbar},
    data() {
        return {
            title:"",
            details:"",
            toDate: new Date().toISOString(),
            showErrors:false,
        };
    },
    methods:{
        async addReminder(){
            const title = this.title;
            const details = this.details;
            const toDate = this.toDate;
            if(!this.title.trim()){
                this.showErrors = true;
                return;
            }
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