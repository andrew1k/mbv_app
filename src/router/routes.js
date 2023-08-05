import MainLayout from '@/layouts/MainLayout.vue'
import HomePage from '@/views/home/HomePage.vue'
import DiscoverPage from '@/views/discover/DiscoverPage.vue'
import CalendarPage from '@/views/calendar/CalendarPage.vue'
import AdminPage from '@/views/admin/AdminPage.vue'
import ProfileLayout from '@/layouts/ProfileLayout.vue'
import ProfilePage from '@/views/profile/ProfilePage.vue'
import CardLayout from '@/layouts/CardLayout.vue'
import SundayPage from '@/views/sunday/SundayPage.vue'
import GivingPage from '@/views/giving/GivingPage.vue'
import NewsPage from '@/components/home/news/NewsPage.vue'

export default [
  {
    path: '/',
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
          title: 'Календарь',
        },
      }, {
        path: '/purposes/worship',
        name: 'worship',
        component: () => import('@/views/purposes/worship/PurposeWorship.vue'),
        meta: {
          title: 'Поклонение',
          color: 'worship', // error
        },
      }, {
        path: '/purposes/fellowship',
        name: 'fellowship',
        component: () => import('@/views/purposes/fellowship/PurposeFellowship.vue'),
        meta: {
          title: 'Общение',
          color: 'fellowship', // warning
        },
      }, {
        path: '/purposes/discipleship',
        name: 'discepleship',
        component: () => import('@/views/purposes/discipleship/PurposeDiscipleship.vue'),
        meta: {
          title: 'Ученичество',
          color: 'discepleship', // success
        },
      }, {
        path: '/purposes/ministry',
        name: 'ministry',
        component: () => import('@/views/purposes/ministry/PurposeMinistry.vue'),
        meta: {
          title: 'Служение',
          color: 'ministry', // secondary
        },
      }, {
        path: '/purposes/evangelism',
        name: 'evangelism',
        component: () => import('@/views/purposes/evangelism/PurposeEvangelism.vue'),
        meta: {
          title: 'Благовестие',
          color: 'evangelism', // info
        },
      }, {
        path: '/purposes/youth',
        name: 'youth',
        component: () => import('@/views/purposes/youth/purposeYouth.vue'),
        meta: {
          title: 'MBVYouth',
          color: 'secondary',
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
    path: '/profile',
    component: ProfileLayout,
    meta: {
      auth: true,
    },
    children: [
      {
        path: '',
        name: 'Profile',
        component: ProfilePage,
      },
    ],
  }, {
    path: '',
    component: CardLayout,
    meta: {
      auth: true,
    },
    children: [{
      path: '/sunday',
      name: 'Sunday',
      component: SundayPage,
      meta: {
        title: 'В это воскресение',
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
    }],
  },{
    path: '/news/:id',
    name: 'NewsPage',
    props: true,
    component: NewsPage,
    meta: {
      title: 'Назад',
      auth: true,
    }
  },
]
