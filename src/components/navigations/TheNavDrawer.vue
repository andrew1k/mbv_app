<template>
  <v-navigation-drawer
    v-model="drawer"
    elevation="0"
    color="background"
    width="350"
  >
    <template v-slot:prepend>
      <v-list-item
        class=" py-2"
        :title="`${dbUser.firstName} ${dbUser.secondName}`"
        :subtitle="email"
        to="/profile"
        append-icon="mdi-chevron-right"
      >
        <template v-slot:prepend>
          <v-avatar variant="outlined">
            <VIcon icon="mdi-account" color="primary"/>
          </v-avatar>
        </template>
      </v-list-item>
    </template>
    <VDivider/>
    <v-card class="mx-2 mt-2 mb-4" rounded="lg">
      <VCardItem
        title="Первые шаги в Боге"
        subtitle="Кто недавно с Богом"
        :append-icon="start ? 'mdi-chevron-up': 'mdi-chevron-down'"
        @click="start = !start"
      />
      <VDivider v-if="start"/>
      <v-expand-transition>
        <v-card elevation="0" rounded="0" v-if="start">
          <v-card class="ma-2" height="120" :image="firstMeeting">
            <div class="fill-height bottom-gradient-darker d-flex flex-column align-center justify-end">
              <h3 class="text-white">Встреча-знакомство</h3>
              <p class="text-mono text-white text-caption">Мы будем рады познакомиться</p>
              <v-btn class="ma-2" color="surface" variant="outlined" to="/purposes/fellowship/firstMeeting">Узнать
                больше
              </v-btn>
            </div>
          </v-card>
          <VDivider/>
          <v-list-item
            class="py-2"
            title="Семинар - «ШАГ 1»"
            subtitle="Узнай больше о церкви"
            to="/purposes/fellowship/step"
          >
            <template #prepend>
              <v-avatar color="fellowship" size="small" variant="outlined">
                <VIcon color="fellowship" icon="mdi-account-multiple-outline"/>
              </v-avatar>
            </template>
          </v-list-item>
        </v-card>
      </v-expand-transition>
    </v-card>
    <!--  ----------------------------------------------------------------------------------------------------------------  -->
    <v-card class="mx-2 mt-2 mb-4" rounded="lg">
      <VCardItem
        title="Духовное Возрастание"
        subtitle="Узнать больше о Боге"
        :append-icon="grows ? 'mdi-chevron-up': 'mdi-chevron-down'"
        @click="grows = !grows"
      />
      <VDivider v-if="grows"/>
      <v-expand-transition>
        <v-card elevation="0" rounded="0" v-if="grows">
          <v-list-item
            class="py-2"
            title="Семинар - «ШАГ 2»"
            subtitle="в учении Апостолов"
            to="/purposes/discipleship/step"
          >
            <template #prepend>
              <v-avatar color="discipleship" size="small" variant="outlined">
                <VIcon color="discipleship" icon="mdi-school-outline"/>
              </v-avatar>
            </template>
          </v-list-item>
          <VDivider/>
          <v-list-item
            class="py-2"
            title="Наставничество"
            subtitle="Мы поможем разобраться"
            to="/purposes/discipleship/mentoring"
          >
            <template #prepend>
              <v-avatar color="discipleship" size="small" variant="outlined">
                <VIcon color="discipleship" icon="mdi-account-arrow-up-outline"/>
              </v-avatar>
            </template>
          </v-list-item>
          <VDivider/>
          <v-list-item
            class="py-2"
            title="Семейное служение"
            subtitle="Распространи свои пределы"
            to="/purposes/discipleship/family"
          >
            <template #prepend>
              <v-avatar color="discipleship" size="small" variant="outlined">
                <VIcon color="discipleship" icon="mdi-human-male-female-child"/>
              </v-avatar>
            </template>
          </v-list-item>
        </v-card>
      </v-expand-transition>
    </v-card>
    <!--   ----------------------------------------------------------------------------------------------------------------- -->
    <v-card class="mx-2 mt-2 mb-4" rounded="lg">
      <VCardItem
        title="Служение"
        subtitle="Служение и волонтерство"
        :append-icon="serv ? 'mdi-chevron-up': 'mdi-chevron-down'"
        @click="serv = !serv"
      />
      <VDivider v-if="serv"/>
      <v-expand-transition>
        <v-card elevation="0" rounded="0" v-if="serv">
          <v-card class="ma-2" height="120" :image="ministry">
            <div class="fill-height bottom-gradient-darker d-flex flex-column align-center justify-end">
              <h3 class="text-white">Начни служить</h3>
              <p class="text-mono text-white text-caption">Раскрой свои дары и таланты</p>
              <v-btn class="ma-2" color="surface" variant="outlined" to="/purposes/ministry/signToMinistry">
                Хочу служить
              </v-btn>
            </div>
          </v-card>
          <VDivider/>
          <v-list-item
            class="py-2"
            title="Семинар - «ШАГ 3»"
            subtitle="Узнай больше о своей уникальности"
            to="/purposes/ministry/step"
          >
            <template #prepend>
              <v-avatar color="ministry" size="small" variant="outlined">
                <VIcon color="ministry" icon="mdi-hand-heart-outline"/>
              </v-avatar>
            </template>
          </v-list-item>
        </v-card>
      </v-expand-transition>
    </v-card>
    <!--   ----------------------------------------------------------------------------------------------------------------- -->
    <v-card class="mx-2 mt-2 mb-4" rounded="lg">
      <VCardItem
        title="Благовестие"
        subtitle="Рассказывать о Боге"
        :append-icon="eva ? 'mdi-chevron-up': 'mdi-chevron-down'"
        @click="eva = !eva"
      />
      <VDivider v-if="eva"/>
      <v-expand-transition>
        <v-card elevation="0" rounded="0" v-if="eva">
          <v-card class="ma-2" height="120" :image="outreach">
            <div class="fill-height bottom-gradient-darker d-flex flex-column align-center justify-end">
              <h3 class="text-white">Как начать благовествовать</h3>
              <v-btn class="ma-2" color="surface" variant="outlined" href="https://t.me/silchuuk">
                Написать лидеру
              </v-btn>
            </div>
          </v-card>
          <VDivider/>
          <v-list-item
            class="py-2"
            title="Семинар - «ШАГ 4»"
            subtitle="Научитесь благовествовать"
            to="/purposes/evangelism/step"
          >
            <template #prepend>
              <v-avatar color="evangelism" size="small" variant="outlined">
                <VIcon color="evangelism" icon="mdi-torch"/>
              </v-avatar>
            </template>
          </v-list-item>
        </v-card>
      </v-expand-transition>
    </v-card>
    <!--  ----------------------------------------------------------------------------------------------------------------  -->
    <v-card class="mx-2 mt-2 mb-4" rounded="lg">
      <VCardItem
        title="Помощь"
        :append-icon="help ? 'mdi-chevron-up': 'mdi-chevron-down'"
        @click="help = !help"
      />
      <VDivider v-if="help"/>
      <v-expand-transition>
        <v-card elevation="0" rounded="0" v-if="help">
          <v-list-item
            class="py-2"
            title="Молитвенная Поддержка"
            to="/purposes/help/prayerSupport"
          >
            <template #prepend>
              <v-avatar size="small" variant="outlined">
                <VIcon icon="mdi-hands-pray"/>
              </v-avatar>
            </template>
          </v-list-item>
          <VDivider/>
          <v-list-item
            class="py-2"
            title="Духовная консультация"
            to="/purposes/help/spiritualCounselling"
          >
            <template #prepend>
              <v-avatar size="small" variant="outlined">
                <VIcon icon="mdi-account-question-outline"/>
              </v-avatar>
            </template>
          </v-list-item>
          <VDivider/>
        </v-card>
      </v-expand-transition>
    </v-card>
    <!-- ----------------------------------------------------------------- -->
    <v-card class="mx-2 mt-2 mb-4" rounded="lg" to="/connect">
      <VCardItem
        title="Есть вопрос?"
        append-icon="mdi-chevron-right"
      />
    </v-card>
    <!-- ----------------------------------------------------------------- -->
    <v-card class="mx-2 mt-2 mb-4" rounded="lg" to="/aboutChurch">
      <VCardItem
        title="О нас"
        append-icon="mdi-chevron-right"
      />
    </v-card>
    <!-- ----------------------------------------------------------------- -->
    <!-- <v-card class="mx-2 mt-2 mb-4" rounded="lg" to="/profile/notes">
      <VCardItem
        title="Сохранения"
        append-icon="mdi-arrow-down"
      />
    </v-card> -->
    <!-- --------------------------------------------------------------------------------------------------------------------- -->
    <template v-slot:append>
      <v-card-actions>
        <v-btn block size="large" rounded="lg" to="/giving">Пожертвовать</v-btn>
      </v-card-actions>
      <v-card-actions class="mb-2">
        <VSpacer/>
        <a href="https://www.youtube.com/@mbv1916">
          <VAvatar rounded="0" :image="yt" color="background"/>
        </a>
        <VSpacer/>
        <a href="https://t.me/mbvspb">
          <VAvatar rounded="0" :image="tg" color="background"/>
        </a>
        <VSpacer/>
        <a href="https://vk.com/mbvspb">
          <VAvatar rounded="0" :image="vk" color="background"/>
        </a>
        <VSpacer/>
      </v-card-actions>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import {useAppState} from '@/store/app.store'
import {storeToRefs} from 'pinia'
import {ref} from 'vue'
import {useAuthStore} from '@/store/auth.store'
import firstMeeting from '@/assets/fellowshipPics/firstMeeting.jpg'
import ministry from '@/assets/ministryPics/step.jpg'
import outreach from '@/assets/evangelismPics/steiger.jpg'
import yt from '@/assets/socialMediaIcons/youtube-outlinesvg.svg'
import tg from '@/assets/socialMediaIcons/tg-outline.svg'
import vk from '@/assets/socialMediaIcons/vk-outlinesvg.svg'

const appState = useAppState()
const {drawer} = storeToRefs(appState)

const authStore = useAuthStore()
const {email, dbUser} = storeToRefs(authStore)

const start = ref(false)
const grows = ref(false)
const serv = ref(false)
const eva = ref(false)
const help = ref(false)
</script>
