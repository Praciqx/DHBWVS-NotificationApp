<template>
    <ion-page>
        <ion-header :translucent="true">
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-back-button default-href="/home" />
            </ion-buttons>
            <ion-title>{{isEditMode ? "Erinnerung bearbeiten" : "Erinnerung hinzufügen"}}</ion-title>
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

import { IonBackButton,IonButtons,IonIcon,IonLabel, IonDatetime, IonButton,IonPage,IonHeader,IonContent,IonInput, IonToolbar, IonTitle } from '@ionic/vue';
import { defineComponent } from 'vue';
import {listOutline,pencil} from 'ionicons/icons'
import { createReminder, saveReminder } from '@/utils/reminderHelpers';
import { useRoute } from 'vue-router';
import { Preferences } from '@capacitor/preferences';

export default defineComponent({
    name:'ReminderFormComponent',
    setup(){
        const route = useRoute();
        return {listOutline,pencil, route};
    },
    components:{Preferences,IonBackButton,IonButtons,IonIcon,IonLabel,IonDatetime,IonTitle,IonButton,IonInput,IonContent,IonPage,IonHeader,IonToolbar},
    data() {
        return {
            id: null as string |null,
            isEditMode: false,
            title:"",
            details:"",
            toDate: new Date().toISOString(),
            showErrors:false,
        };
    },
    created(){
        this.title = "";
        this.details = "";
        this.id = this.route.params.id as string || null;
        this.isEditMode = this.id != null;
        if(this.isEditMode){
            this.getReminder();
        }
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
        getReminder(){

        }
    },
});



</script>