<template>
  <v-card
    elevation="0"
    rounded="0"
    variant="text"
    max-width="600"
    class="mx-auto"
  >
    <v-card 
    rounded="s" 
    :variant="purposes.worship.isOpen? 'text' : 'elevated'" 
    class="mb-4 mt-2"
    >
      <v-card-item
        :title="purposes.worship.title"
        @click="purposes.worship.isOpen = !purposes.worship.isOpen"
        :append-icon="purposes.worship.isOpen ? 'mdi-chevron-up' : 'mdi-chevron-down'"
      >
        <template #prepend>
          <VIcon :color="purposes.worship.color" :icon="purposes.worship.icon"/>
        </template>
      </v-card-item>
      <v-expand-transition>
        <v-card v-if="purposes.worship.isOpen" elevation="0" rounded="0" variant="text">
          <v-slide-group>
            <v-slide-group-item v-for="(pAct, i) in purposes.worship.actions" :key="i">
              <PurposeSliderItem :title="pAct.title" :route="pAct.route" :img="pAct.img" :href="pAct.href"/>
            </v-slide-group-item>
          </v-slide-group>
        </v-card>
      </v-expand-transition>
    </v-card>
    <VDivider/>
    <!-- --------------------------------------------------------------------------------------------------------------- -->
    <v-card
      rounded="s"
      :variant="purposes.fellowship.isOpen? 'text' : 'elevated'"
      class="mb-4 mt-2">
      <v-card-item
        @click="purposes.fellowship.isOpen = !purposes.fellowship.isOpen"
        :append-icon="purposes.fellowship.isOpen ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        :title="purposes.fellowship.title"
      >
        <template #prepend>
          <VIcon :color="purposes.fellowship.color" :icon="purposes.fellowship.icon"/>
        </template>
      </v-card-item>
      <v-expand-transition>
        <v-card v-if="purposes.fellowship.isOpen" rounded="0" variant="text">
          <!-- <v-card class="ma-2" height="220" :image="firstMeeting">
            <div class="fill-height bottom-gradient-darker d-flex flex-column align-center justify-end">
              <h3 class="text-white">Встреча-знакомство</h3>
              <p class="text-mono text-white text-caption">Для тех, кто недавно в нашей церкви</p>
              <v-btn
                class="ma-2"
                color="surface"
                variant="outlined"
                to="/purposes/fellowship/firstMeeting"
              >
                Узнать больше
              </v-btn>
            </div>
          </v-card> -->
          <v-card class="ma-2" height="220" :image="step" to="/purposes/fellowship/step">
            <div class="fill-height bottom-gradient-darker d-flex flex-column align-center justify-end">
              <h3 class="text-white">Семинар - «ШАГ 1»</h3>
              <p class="text-mono text-white text-caption">Общение</p>
              <v-btn
                class="ma-2"
                color="surface"
                variant="outlined"
                to="/purposes/fellowship/step"
              >
                Узнать больше
              </v-btn>
            </div>
          </v-card>
          <v-slide-group>
            <v-slide-group-item v-for="(pAct, i) in purposes.fellowship.actions" :key="i">
              <PurposeSliderItem :title="pAct.title" :route="pAct.route" :img="pAct.img"/>
            </v-slide-group-item>
          </v-slide-group>
          
          <!-- <v-card class="ma-2" height="220" :image="SG">
            <div class="fill-height bottom-gradient-darker d-flex flex-column align-center justify-end">
              <h3 class="text-white">Малые Группы</h3>
              <p class="text-mono text-white text-caption">Станьте частью семьи</p>
              <v-btn
                class="ma-2"
                color="surface"
                variant="outlined"
                to="/purposes/fellowship/smallGroups"
              >
                Хочу узнать больше
              </v-btn>
            </div>
          </v-card> -->
        </v-card>
      </v-expand-transition>
    </v-card>
    <VDivider/>
    <!-- --------------------------------------------------------------------------------------------------------------- -->
    <v-card 
      rounded="s" 
      :variant="purposes.discipleship.isOpen? 'text' : 'elevated'"
      class="mb-4 mt-2"
    >
      <v-card-item
        @click="purposes.discipleship.isOpen = !purposes.discipleship.isOpen"
        :title="purposes.discipleship.title"
        :append-icon="purposes.discipleship.isOpen ? 'mdi-chevron-up' : 'mdi-chevron-down'"
      >
        <template #prepend>
          <VIcon :color="purposes.discipleship.color" :icon="purposes.discipleship.icon"/>
        </template>
      </v-card-item>
      <v-expand-transition>
        <v-card v-if="purposes.discipleship.isOpen" elevation="0" rounded="0" variant="text">
          <v-card class="ma-2" height="220" :image="step2" to="/purposes/discipleship/step">
            <div class="fill-height bottom-gradient-darker d-flex flex-column align-center justify-end">
              <h3 class="text-white">Семинар - «ШАГ 2»</h3>
              <p class="text-mono text-white text-caption">Ученичество</p>
              <v-btn
                class="ma-2"
                color="surface"
                variant="outlined"
                to="/purposes/discipleship/step"
              >
                Узнать больше
              </v-btn>
            </div>
          </v-card>
          <v-slide-group>
            <v-slide-group-item v-for="(pAct, i) in purposes.discipleship.actions" :key="i">
              <PurposeSliderItem :title="pAct.title" :route="pAct.route" :img="pAct.img"/>
            </v-slide-group-item>
          </v-slide-group>
          <!-- <v-card
            elevation="0"
            rounded="0"
            variant="text"
            class="ma-0"
            v-for="(pAct, i) in purposes.discipleship.actions"
            :key="i"
            :to="pAct.route"
          >
            <VDivider/>
            <v-card-actions>
              <VIcon :icon="pAct.icon" color="discipleship" class="ml-2"/>
              <VCardItem
                :title="pAct.title"
                :subtitle="pAct.subtitle"
              />
            </v-card-actions>
          </v-card> -->
        </v-card>
      </v-expand-transition>
    </v-card>
    <VDivider/>
    <!-- --------------------------------------------------------------------------------------------------------------- -->
    <v-card rounded="s" :variant="purposes.ministry.isOpen? 'text' : 'elevated'" class="mb-4 mt-2">
      <v-card-item
        @click="purposes.ministry.isOpen = !purposes.ministry.isOpen"
        :title="purposes.ministry.title"
        :append-icon="purposes.ministry.isOpen ? 'mdi-chevron-up' : 'mdi-chevron-down'"
      >
        <template #prepend>
          <VIcon :color="purposes.ministry.color" :icon="purposes.ministry.icon"/>
        </template>
      </v-card-item>
      <v-expand-transition>
        <v-card v-if="purposes.ministry.isOpen" rounded="0" variant="text">
          <v-card class="ma-2" height="220" :image="step3" to="/purposes/ministry/step">
            <div class="fill-height bottom-gradient-darker d-flex flex-column align-center justify-end">
              <h3 class="text-white">Семинар – «ШАГ 3»</h3>
              <p class="text-mono text-white text-caption">Служение</p>
              <v-btn
                class="ma-2"
                color="surface"
                variant="outlined"
                to="/purposes/ministry/step"
              >
                Узнать больше
              </v-btn>
            </div>
          </v-card>
          <v-expand-transition>
            <v-card v-if="purposes.evangelism.isOpen" rounded="0" variant="text">
              <v-slide-group>
                <v-slide-group-item v-for="(pAct, i) in purposes.evangelism.actions" :key="i">
                  <PurposeSliderItem :title="pAct.title" :route="pAct.route" :img="pAct.img" :href="pAct.href"/>
                </v-slide-group-item>
              </v-slide-group>
            </v-card>
          </v-expand-transition>
          

          <!-- <v-card
            rounded="0"
            variant="text"
            class="ma-0"
            to="/purposes/ministry/step"
          >
            <v-card-actions>
              <VIcon :icon="purposes.ministry.icon" color="ministry" class="ml-2"/>
              <VCardItem
                title="Семинар - «ШАГ 3»"
                subtitle="Узнавая больше о своей уникальности"
              />
            </v-card-actions>
          </v-card> -->
        </v-card>
      </v-expand-transition>
    </v-card>
    <VDivider/>
    <!-- --------------------------------------------------------------------------------------------------------------- -->
    <v-card
      rounded="s"
      :variant="purposes.evangelism.isOpen ? 'text' : 'elevated'"
      class="mb-4 mt-2"
    >
      <v-card-item
        @click="purposes.evangelism.isOpen = !purposes.evangelism.isOpen"
        :title="purposes.evangelism.title"
        :append-icon="purposes.evangelism.isOpen ? 'mdi-chevron-up' : 'mdi-chevron-down'"
      >
        <template #prepend>
          <VIcon :color="purposes.evangelism.color" :icon="purposes.evangelism.icon"/>
        </template>
      </v-card-item>
      <v-card class="ma-2" height="220" :image="step3" to="/purposes/ministry/step">
            <div class="fill-height bottom-gradient-darker d-flex flex-column align-center justify-end">
              <h3 class="text-white">Семинар – «ШАГ 3»</h3>
              <p class="text-mono text-white text-caption">Служение</p>
              <v-btn
                class="ma-2"
                color="surface"
                variant="outlined"
                to="/purposes/ministry/step"
              >
                Узнать больше
              </v-btn>
            </div>
          </v-card>
      <v-expand-transition>
        <v-card v-if="purposes.evangelism.isOpen" rounded="0" variant="text">
          <v-slide-group>
            <v-slide-group-item v-for="(pAct, i) in purposes.evangelism.actions" :key="i">
              <PurposeSliderItem :title="pAct.title" :route="pAct.route" :img="pAct.img" :href="pAct.href"/>
            </v-slide-group-item>
          </v-slide-group>
        </v-card>
      </v-expand-transition>
    </v-card>
    <VDivider/>
    <!-- --------------------------------------------------------------------------------------------------------------- -->
    <v-card rounded="xl" class="mb-4 mt-2 mx-2" to="/aboutChurch">
      <v-card-item title="О церкви" append-icon="mdi-chevron-right">
        <template #prepend>
          <VIcon icon="mdi-church-outline"/>
        </template>
      </v-card-item>
    </v-card>
    <!-- --------------------------------------------------------------------------------------------------------------- -->
    <v-card rounded="xl" class="mb-4 mt-2 mx-2">
      <v-card class="py-1" :color="purposes.help.color" rounded="0">
        <v-card-item
          @click="purposes.help.toggleOpen()"
          :title="purposes.help.title"
        >
          <template #prepend>
            <VIcon :icon="purposes.help.icon"/>
          </template>
          <template #append>
            <VIcon class="mr-2" :icon="purposes.help.isOpen ? 'mdi-chevron-up' : 'mdi-chevron-down'"/>
          </template>
        </v-card-item>
      </v-card>
      <v-expand-transition>
        <v-card v-if="purposes.help.isOpen" rounded="0" variant="text">
          <v-card
            v-for="(pAct, i) in purposes.help.actions"
            :key="i"
            :to="pAct.route"
          >
            <VDivider/>
            <v-card-item
              :title="pAct.title"
              :subtitle="pAct.subtitle"
            >
              <template #prepend>
                <v-avatar variant="outlined">
                  <VIcon :icon="pAct.icon" size="large" color="primary"/>
                </v-avatar>
              </template>
            </v-card-item>
          </v-card>
        </v-card>
      </v-expand-transition>
    </v-card>
  </v-card>
</template>

<script setup>
import {ref} from 'vue'
import PurposeSliderItem from '@/components/purposes/PurposeSliderItem.vue'

// import pics
import steiger from '@/assets/evangelismPics/steiger.jpg'
import vechno from '@/assets/evangelismPics/vechnoSq.png'
import step4 from '@/assets/evangelismPics/step.jpg'
import oneSq from '@/assets/evangelismPics/OneSq.jpg'
import sunday from '@/assets/worshipPics/sunday.jpg'
import praying from '@/assets/worshipPics/praying.jpg'
import songs from '@/assets/worshipPics/songs.jpeg'
import daily from '@/assets/worshipPics/Daily.jpg'
import firstMeeting from '@/assets/fellowshipPics/firstMeeting.jpg'
import step from '@/assets/fellowshipPics/step.jpg'
import step2 from '@/assets/discepleshipPics/step.jpg'
import step3 from '@/assets/ministryPics/step.jpg'
import SG from '@/assets/fellowshipPics/smallGroups.jpg'
import openSG from '@/assets/fellowshipPics/openSG.jpg'
import baptism from '@/assets/fellowshipPics/baptismSq.jpg'
import popularTeology from '@/assets/discepleshipPics/theologypop.png'
import readBible from '@/assets/discepleshipPics/step.jpg'


const purposes = ref({
  worship: {
    title: 'Поклонение',
    route: '/purposes/worship',
    color: 'worship',
    icon: 'mdi-heart-outline',
    isOpen: true,
    actions: [
      {
        title: 'Воскресное богослужение',
        img: sunday,
        route: '/sunday',
      }, {
        title: 'Молитвенное богослужение',
        img: praying,
        route: '/purposes/worship/prayer',
      }, {
        title: 'Городская ночная молитва',
        img: praying,
        route: '/purposes/worship/nightPrayer',
      }, {
        title: 'Песни',
        img: songs,
        href: 'https://band.link/mbvsing',
      }, 
      // {
      //   title: 'Благословение на каждый день',
      //   img: daily,
      //   href: 'https://youtube.com/playlist?list=PLjjvxd6WcKV04vM9MkM6Gd69-qdkzpRbj&si=Rfh2J4VmqmlqTBrw',
      // }, 
    ],
  },
  fellowship: {
    title: 'С чего начать?',
    route: '/purposes/fellowship',
    color: 'fellowship',
    icon: 'mdi-account-multiple-outline',
    isOpen: true,
    actions: [
      {
        title: 'Встреча-знакомство',
        img: firstMeeting,
        route: `/purposes/fellowship/firstMeeting`,
      }, {
        title: 'Малые Группы',
        img: SG,
        route: `/purposes/fellowship/smallGroups`,
      }, {
        title: 'Крещение',
        img: baptism,
        route: `/purposes/fellowship/baptism`,
      }, {
        title: 'Хочу открыть Малую Группу',
        img: openSG,
        route: `/purposes/fellowship/OpenSmallGroup`,
      }, 
      // {
      //   title: 'Семинар - «ШАГ 1»',
      //   img: step,
      //   route: `/purposes/fellowship/step`,
      // }, 
    ],
  },
  discipleship: {
    title: 'Рост и обучение',
    route: '/purposes/discipleship',
    color: 'discipleship',
    icon: 'mdi-school-outline',
    isOpen: true,
    actions: [
      {
        title: 'Читаем Библию вместе',
        img: readBible,
        route: `/purposes/discipleship/readBible`,
      }, 
      {
        title: 'Популярное богословие',
        img: popularTeology,
        route: `/purposes/discipleship/popularTeology`,
      }, 
      {
        title: 'Материалы для духовного роста',
        img: readBible,
        route: `/purposes/discipleship/growthMaterials`,
      }, 
      // {
      //   title: 'Наставничество',
      //   subtitle: 'Мы поможем Вам узнать основы',
      //   icon: 'mdi-account-arrow-up-outline',
      //   route: '/purposes/discipleship/mentoring',
      // }, {
      //   title: `Семинар - «ШАГ 2»`,
      //   subtitle: 'Узнавая больше о духовном развитии',
      //   icon: 'mdi-school-outline',
      //   route: '/purposes/discipleship/step',
      // },
      // {
      //   title: 'Семейное служение',
      //   subtitle: 'Твои корни',
      //   icon: 'mdi-human-male-female-child',
      //   route: '/home',
      // },
    ],
  },
  ministry: {
    title: 'Начать служить',
    route: '/purposes/ministry',
    color: 'ministry',
    icon: 'mdi-hand-heart-outline',
    isOpen: true,
  },
  evangelism: {
    title: 'Поделиться верой',
    route: '/purposes/evangelism',
    color: 'evangelism',
    icon: 'mdi-torch',
    isOpen: true,
    actions: [
      {
        title: 'Семинар - «ШАГ 4»',
        img: step4,
        route: '/purposes/evangelism/step',
      }, {
        title: 'Кто твой один?',
        img: oneSq,
        route: '/purposes/evangelism/one',
      }, {
        title: 'Вечно',
        img: vechno,
        route: '/purposes/evangelism/vechno',
      }, {
        title: 'Деяния',
        img: steiger,
        route: '/purposes/evangelism/outreach',
      },
    ],
  },
  help: {
    title: 'Помощь',
    route: '/home',
    color: 'primary',
    icon: 'mdi-handshake-outline',
    isOpen: false,
    toggleOpen() {
      this.isOpen = !this.isOpen
      if (this.isOpen)
        setTimeout(() => {
          window.scrollBy({
            top: 500,
            left: 0,
            behavior: 'smooth',
          })
        }, 300)
    },
    actions: [
      {
        title: 'Молитвенная поддержка',
        icon: 'mdi-hands-pray',
        route: '/purposes/help/prayerSupport',
      }, {
        title: 'Духовная консультация',
        icon: 'mdi-account-question-outline',
        route: '/purposes/help/spiritualCounselling',
      }, {
        title: 'Ретрит',
        icon: 'mdi-account-supervisor-outline',
        route: '/purposes/help/retreat',
      }, {
        title: 'Есть вопрос?',
        icon: 'mdi-list-box-outline',
        route: '/connect',
      },
    ],
  },
})
</script>

<style>
.bottom-gradient-darker {
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.5) 0%,
    transparent 250px
  );
}
</style>
