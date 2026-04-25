import MainLayout from '@/layouts/MainLayout.vue'
import HomePage from '@/views/home/HomePage.vue'
import DiscoverPage from '@/views/discover/DiscoverPage.vue'
import CalendarPage from '@/views/calendar/CalendarPage.vue'
import AdminPage from '@/views/admin/AdminPage.vue'
import SundayPage from '@/views/sunday/SundayPage.vue'
import GivingPage from '@/views/giving/GivingPage.vue'
import NewsPage from '@/components/home/news/NewsPage.vue'

export default [
  {
    path: '',
    component: MainLayout,
    redirect: '/home',
    meta: {
      auth: true,
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: HomePage,
        meta: {
          title: 'Главная',
        },
      }, {
        path: '/discover',
        name: 'Discover',
        component: DiscoverPage,
        meta: {
          title: 'Открой для себя церковь',
        },
      }, {
        path: '/calendar',
        name: 'Calendar',
        component: CalendarPage,
        meta: {
          title: 'Календарь',
        },
      }, {
        path: '/admin',
        name: 'Admin',
        component: AdminPage,
        meta: {
          title: 'Admin',
        },
      }, {
        path: '/purposes/worship/prayer',
        name: 'PrayerWorship',
        component: () => import('@/views/purposes/worship/views/PrayerPage.vue'),
        meta: {
          title: 'Молитвы',
          color: 'worship',
        },
      }, {
        path: '/purposes/worship/nightPrayer',
        name: 'NightPrayerWorship',
        component: () => import('@/views/purposes/worship/views/NightPrayerPage.vue'),
        meta: {
          title: 'Городская ночная молитва',
          color: 'worship',
        },
      }, {
        path: '/purposes/fellowship/baptism',
        name: 'baptism',
        component: () => import('@/views/purposes/fellowship/views/BaptismPage.vue'),
        meta: {
          title: 'Крещение',
          color: 'fellowship',
        },
      }, {
        path: '/purposes/fellowship/step',
        name: 'stepOne',
        component: () => import('@/views/purposes/fellowship/views/StepOnePage.vue'),
        meta: {
          title: 'Шаг 1',
          color: 'fellowship',
        },
      }, {
        path: '/purposes/fellowship/firstMeeting',
        name: 'firstMeeting',
        component: () => import('@/views/purposes/fellowship/views/FirstMeetingPage.vue'),
        meta: {
          title: 'Встреча знакомство',
          color: 'fellowship',
        },
      }, {
        path: '/purposes/fellowship/smallGroups',
        name: 'smallGroups',
        component: () => import('@/views/purposes/fellowship/views/SmallGroupsPage.vue'),
        meta: {
          title: 'Малые группы',
          color: 'fellowship',
        },
      }, {
        path: '/purposes/fellowship/OpenSmallGroup',
        name: 'OpenSmallGroup',
        component: () => import('@/views/purposes/fellowship/views/OpenSmallGroupPage.vue'),
        meta: {
          title: 'Открыть Малую Группу',
          color: 'fellowship',
        },
      }, {
        path: '/purposes/ministry/step',
        name: 'stepThree',
        component: () => import('@/views/purposes/ministry/views/StepThreePage.vue'),
        meta: {
          title: 'Шаг 3',
          color: 'ministry',
        },
      }, {
        path: '/purposes/ministry/signToMinistry',
        name: 'signToMinistry',
        component: () => import('@/views/purposes/ministry/views/SignToMinistryPage.vue'),
        meta: {
          title: 'Служение',
          color: 'ministry',
        },
      }, {
        path: '/purposes/discipleship/step',
        name: 'stepTwo',
        component: () => import('@/views/purposes/discipleship/views/StepTwoPage.vue'),
        meta: {
          title: 'Шаг 2',
          color: 'discipleship',
        },
      }, {
        path: '/purposes/discipleship/mentoring',
        name: 'mentoring',
        component: () => import('@/views/purposes/discipleship/views/MentoringPage.vue'),
        meta: {
          title: 'Наставничество',
          color: 'discipleship',
        },
      }, {
        path: '/purposes/discipleship/growthMaterials',
        name: 'growthMaterials',
        component: () => import('@/views/purposes/discipleship/views/GrowthMaterialsPage.vue'),
        meta: {
          title: 'Материалы для духовного роста',
          color: 'discipleship',
        },
      }, {
        path: '/purposes/discipleship/popularTeology',
        name: 'popularTeology',
        component: () => import('@/views/purposes/discipleship/views/PopularTeologyPage.vue'),
        meta: {
          title: 'Популярное богословие',
          color: 'discipleship',
        },
      }, {
        path: '/purposes/discipleship/readBible',
        name: 'readBible',
        component: () => import('@/views/purposes/discipleship/views/ReadBiblePage.vue'),
        meta: {
          title: 'Читаем Библию вместе',
          color: 'discipleship',
        },
      }, {
        path: '/purposes/evangelism/vechno',
        name: 'vechno',
        component: () => import('@/views/purposes/evangelism/views/VechnoPage.vue'),
        meta: {
          title: 'Вечно',
          color: 'ministry',
        },
      }, {
        path: '/purposes/evangelism/step',
        name: 'stepFour',
        component: () => import('@/views/purposes/evangelism/views/StepFourPage.vue'),
        meta: {
          title: 'Шаг 4',
          color: 'ministry',
        },
      }, {
        path: '/purposes/evangelism/one',
        name: 'one',
        component: () => import('@/views/purposes/evangelism/views/OnePage.vue'),
        meta: {
          title: 'Кто твой один',
          color: 'ministry',
        },
      }, {
        path: '/purposes/evangelism/outreach',
        name: 'outreach',
        component: () => import('@/views/purposes/evangelism/views/OutreachPage.vue'),
        meta: {
          title: 'Уличная евангелизация',
          color: 'ministry',
        },
      }, {
        path: '/purposes/help/prayerSupport',
        name: 'prayerSupport',
        component: () => import('@/views/purposes/help/views/PrayerSupportPage.vue'),
        meta: {
          title: 'Молитвенная поддержка',
          color: 'worship',
        },
      }, {
        path: '/purposes/help/spiritualCounselling',
        name: 'spiritualCounselling',
        component: () => import('@/views/purposes/help/views/SpiritualCounsellingPage.vue'),
        meta: {
          title: 'Духовная консультация',
          color: 'worship',
        },
      }, {
        path: '/purposes/help/retreat',
        name: 'retreat',
        component: () => import('@/views/purposes/help/views/RetreatPage.vue'),
        meta: {
          title: 'Ретрит',
          color: 'worship',
        },
      }, {
        path: '/connect',
        name: 'connect',
        component: () => import('@/views/connect/ConnectionPage.vue'),
        meta: {
          title: 'Связь с церковью',
          color: 'primary',
        },
      }, {
        path: '/aboutChurch',
        name: 'aboutChurch',
        component: () => import('@/views/about/AboutChurchPage.vue'),
        meta: {
          title: 'О церкви',
          color: 'primary',
        },
      }, {
        path: '/sunday',
        name: 'Sunday',
        component: SundayPage,
        meta: {
          title: 'Свежая проповедь',
          color: 'worship',
        },
      }, {
        path: '/giving',
        name: 'Giving',
        component: GivingPage,
        meta: {
          title: 'Пожертвовать',
          color: 'worship',
        },
      }, {
        path: '/news/:id',
        name: 'NewsPage',
        props: true,
        component: NewsPage,
        meta: {
          title: 'Это интересно',
        },
      }, {
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/profile/ProfilePage.vue'),
        meta: {
          title: 'Мой профиль',
        },
      }, {
        path: '/profile/notes',
        name: 'ProfileNotes',
        component: () => import('@/views/notes/ProfileNotes.vue'),
        meta: {
          title: 'Мои сохранения',
        },
      }, {
        path: '/profile/SundayNote/:id',
        name: 'ProfileSundayNote',
        props: true,
        component: () => import('@/views/notes/ProfileSundayNote.vue'),
        meta: {
          title: 'Мои сохранения',
        },
      }, {
        path: '/user/:id',
        name: 'User',
        props: true,
        component: () => import('@/views/profile/UserPage.vue'),
        meta: {
          title: 'профиль',
        },
      }, {
        path: '/404',
        name: '404',
        component: () => import('@/views/404/404Page.vue'),
        meta: {
          title: '404',
        },
      },
    ],
  }, {
    path: '/auth',
    component: () => import('@/layouts/AuthLayout.vue'),
    meta: {
      auth: false,
    },
    children: [
      {
        path: '/auth/login',
        name: 'Login',
        component: () => import('@/components/auth/LoginForm.vue'),
      }, {
        path: '/auth/signup',
        name: 'Signup',
        component: () => import('@/components/auth/SignupForm.vue'),
      }, {
        path: '/auth/restorePassword',
        name: 'RestorePassword',
        component: () => import('@/components/auth/RestorePwdCmpnt.vue'),
      },
    ],
  }, {
    path: '/admin/formReview',
    name: 'formReview',
    component: () => import('@/views/admin/FormReviewer.vue'),
    meta: {
      title: 'Admin',
      auth: true,
    },
  },
]
