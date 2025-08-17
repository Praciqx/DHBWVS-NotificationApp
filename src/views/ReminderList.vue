<template>
  <ion-list v-if="items && items.length" lines="none">
    <ion-item-divider class="section-banner">
      <ion-label>{{ title }}</ion-label>
    </ion-item-divider>
    <ion-item v-for="r in items" :key="r.id">
      <div style="text-align:center; width:48px;">
        <div style="font-size:20px; font-weight:bold;">
          {{ new Date(r.date).getDate() }}
        </div>
        <div style="font-size:14px; color:gray;">
          {{ new Date(r.date).toLocaleDateString('de-DE', { weekday: 'short', month: 'short' }) }}
        </div>
         <div style="font-size:14px; color:gray;">
          {{ new Date(r.date).toLocaleDateString('de-DE', { year:"numeric"}) }}
        </div>
      </div>
      <ion-card style="width:100%;"
                :style="{ backgroundColor:'rgba(165,206,227,255)', color:'#1a1a1a' }"
                @click="$emit('edit', r)">
        <ion-card-header>
          <ion-card-title :style="{ color:'#1a1a1a' }">{{ r.title }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          {{ new Date(r.date).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) }}
          <span v-if="r.details"> – {{ r.details }}</span>
        </ion-card-content>
      </ion-card>
    </ion-item>
  </ion-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonList, IonItem, IonItemDivider, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';

export default defineComponent({
  name: 'ReminderList',
  components: { IonList, IonItem, IonItemDivider, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent },
  props: ['title','items'],
  emits: ['edit'],
});
</script>

<style scoped>
.section-banner {
  font-weight: 800;
  letter-spacing: 0.07em;
  font-size: 1.2rem;
  background: rgba(165,206,227,0.25);
}
</style>
