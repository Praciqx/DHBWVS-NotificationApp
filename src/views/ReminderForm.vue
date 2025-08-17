<template>
    <ion-page>
        <ion-header :translucent="true">
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-back-button default-href="/home" />
            </ion-buttons>
            <ion-title>{{isEditMode ? "Erinnerung bearbeiten" : "Erinnerung hinzufügen"}}</ion-title>
                <ion-buttons slot="primary">
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
                <ion-icon slot="start" :icon="pencil"></ion-icon>
            </ion-input>
            <ion-input class="ion-margin-top ion-margin-bottom" v-model="details"
                placeholder="Beschreibung hinzufügen">
                  <ion-icon slot="start" :icon="listOutline"></ion-icon>
            </ion-input>
            <ion-label>Uhrzeit</ion-label>
            <ion-datetime-button datetime="datetime"></ion-datetime-button>
            <ion-modal :keep-contents-mounted="true">
                <ion-datetime id="datetime"
                    v-model="toDate" locale="de-DE"
                      presentation="date-time"
                      :show-default-buttons="true"
                      done-text="OK"
                      cancel-text="Abbrechen"
                    >
                    <span slot="time-label">Uhrzeit</span>
                </ion-datetime>
            </ion-modal>
            <ion-button class="ion-margin-top" expand="block" @click="addReminder" shape="round">Speichern</ion-button>
            <ion-button class="ion-margin-top" v-if="isEditMode" @click="showDeleteAlert = true;" expand="block" color="danger" id="deleteAlert" shape="round">Löschen</ion-button>
        </ion-content>
         <ion-alert v-if="isEditMode"
            header="Löschen"
            message="Möchten Sie diese Erinnerung löschen?"
            :buttons="alertButtons"
            :is-open="showDeleteAlert"
            @didDismiss="showDeleteAlert = false"
            >
        </ion-alert>
    </ion-page>
</template>

<script lang="ts">

import {IonModal, IonDatetimeButton,IonAlert,IonPopover,IonItem,IonList,IonBackButton,IonButtons,IonIcon,IonLabel, IonDatetime, IonButton,IonPage,IonHeader,IonContent,IonInput, IonToolbar, IonTitle } from '@ionic/vue';
import { defineComponent } from 'vue';
import {listOutline,pencil,ellipsisVertical} from 'ionicons/icons'
import { createReminder, saveReminder,getReminderById, editReminder,deleteReminderById } from '@/utils/reminderHelpers';
import { useRoute } from 'vue-router';
import { formatInTimeZone } from 'date-fns-tz';

export default defineComponent({
    name:'ReminderFormComponent',
    setup(){
        const route = useRoute();
        return {listOutline,pencil, route,ellipsisVertical};
    },
    components:{IonAlert,IonModal,IonDatetimeButton,IonPopover, IonList, IonItem,IonBackButton,IonButtons,IonIcon,IonLabel,IonDatetime,IonTitle,IonButton,IonInput,IonContent,IonPage,IonHeader,IonToolbar},
    data() {
        //richtige Timezone rauslesen damit die Zeit korrekt eingestellt wird statt fix Berlin
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        return {
            id: null as string | null,
            isEditMode: false,
            title:"",
            details:"",
            toDate: formatInTimeZone(new Date(), timeZone, "yyyy-MM-dd'T'HH:mm"),
            showErrors:false,
            showDeleteAlert:false,
            alertButtons:[
                {text:'Abbrechen',role:'cancel'},
                {text:'Ja',role:'confirm',handler:()=>this.deleteReminder()}
            ]
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
    ionViewWillEnter(){

    },
    methods:{
        async addReminder(){
            if(!this.title.trim()){
                this.showErrors = true;
                return;
            }
            const reminderObj = createReminder(this.title, this.details, this.toDate, this.id);
            if(this.isEditMode){
                await editReminder(reminderObj);
            }else{
                await saveReminder(reminderObj);
            }
            (document.activeElement as any).blur();
            this.$router.replace({ name: 'Home' });
        },
        async deleteReminder(){
            await deleteReminderById(this.id);
            this.showDeleteAlert = false;
            (document.activeElement as any).blur();
            this.$router.replace({ name: 'Home' });
        },
        async getReminder(){
            const rem = await getReminderById(this.id);
            if(rem){
                this.title = rem.title;
                this.details = rem.details;
                this.toDate = rem.date;
            }
        },
    },
});



</script>