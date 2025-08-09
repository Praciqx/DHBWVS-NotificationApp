<template>
    <ion-popover trigger="reminder-menu" trigger-action="hover">
        <ion-content>
            <ion-list lines="none">
                <ion-item :button="true" :detail="false" @click="deleteReminder">Löschen</ion-item>
            </ion-list>
        </ion-content>
    </ion-popover>
    <ion-page>
        <ion-header :translucent="true">
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-back-button default-href="/home" />
            </ion-buttons>
            <ion-title>{{isEditMode ? "Erinnerung bearbeiten" : "Erinnerung hinzufügen"}}</ion-title>
            <ion-buttons slot="primary">
                <ion-button id="reminder-menu">
                    <ion-icon slot="icon-only" :icon="ellipsisVertical"></ion-icon>
                </ion-button>
            </ion-buttons>
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

import { IonPopover,IonItem,IonList,IonBackButton,IonButtons,IonIcon,IonLabel, IonDatetime, IonButton,IonPage,IonHeader,IonContent,IonInput, IonToolbar, IonTitle } from '@ionic/vue';
import { defineComponent } from 'vue';
import {listOutline,pencil,ellipsisVertical} from 'ionicons/icons'
import { createReminder, saveReminder,getReminderById, editReminder,deleteReminderById } from '@/utils/reminderHelpers';
import { useRoute } from 'vue-router';
import { Preferences } from '@capacitor/preferences';

export default defineComponent({
    name:'ReminderFormComponent',
    setup(){
        const route = useRoute();
        return {listOutline,pencil, route,ellipsisVertical};
    },
    components:{Preferences,IonPopover, IonList, IonItem,IonBackButton,IonButtons,IonIcon,IonLabel,IonDatetime,IonTitle,IonButton,IonInput,IonContent,IonPage,IonHeader,IonToolbar},
    data() {
        return {
            id: null as string | null,
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
            const reminderObj = createReminder(title, details, toDate, this.id);
            if(this.isEditMode){
                await editReminder(reminderObj);
            }else{
                await saveReminder(reminderObj);
            }
            this.$router.push({ name: 'Home' });
        },
        async deleteReminder(){
            deleteReminderById(this.id);
            this.$router.push({ name: 'Home' });
        },
        async getReminder(){
            const rem = await getReminderById(this.id);
            if(rem){
                this.title = rem.title;
                this.details = rem.details;
                this.toDate = rem.date;
            }
        }
    },
});



</script>