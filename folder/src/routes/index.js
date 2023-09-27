/* eslint-disable global-require */
import config from '../webConfig';

// The top-level (parent) route
const routes = {
  path: '/',
  title: 'صفحه نخست',
  // Keep in mind, routes are evaluated in order
  children: [
    {
      path: '',
      load: () => import(/* webpackChunkName: 'home' */ './home'),
    },
    {
      path: '/login',
      load: () => import(/* webpackChunkName: 'login' */ './login'),
      title: 'ورود',
    },
    {
      path: '/unauth-phonenumber',
      load: () =>
        import(
          /* webpackChunkName: 'unauth-phonenumber' */ './unauth-phonenumber'
        ),
      title: 'خطا در احراز هویت',
    },
    {
      path: '/logout',
      load: () => import(/* webpackChunkName: 'logout' */ './logout'),
      title: 'خروج',
    },
    {
      path: '/leads/individual',
      load: () => import(/* webpackChunkName: 'leads' */ './leads'),
      title: 'سرنخ حقیقی',
    },
    {
      path: '/leads/legal',
      load: () => import(/* webpackChunkName: 'legal-leads' */ './legal-leads'),
      title: 'سرنخ حقوقی',
    },
    {
      path: '/lead/:levantId',
      load: () => import(/* webpackChunkName: 'lead' */ './lead'),
      title: 'نخ',
    },
    {
      path: '/portfolio/:levantId',
      load: () => import(/* webpackChunkName: 'portfolio' */ './portfolio'),
      title: 'پورتفوی مالی',
    },
    {
      path: '/samat-details',
      children: [
        {
          path: '/id/:id',
          load: () =>
            import(/* webpackChunkName: 'samatdetails' */ './samat-details'),
          title: 'پورتفوی مالی',
        },
        {
          path: '/nationalcode/:nationalCode',
          load: () =>
            import(/* webpackChunkName: 'samatdetails' */ './samat-details'),
          title: 'پورتفوی مالی',
        },
      ],
    },
    {
      path: '/samat-ilegal-details',
      children: [
        {
          path: '/id/:id',
          load: () =>
            import(
              /* webpackChunkName: 'samatIlegaldetails' */ './samat-ilegal-details'
            ),
          title: 'پورتفوی مالی',
        },
        {
          path: '/nationalcode/:nationalCode',
          load: () =>
            import(
              /* webpackChunkName: 'samatIlegaldetails' */ './samat-ilegal-details'
            ),
          title: 'پورتفوی مالی',
        },
      ],
    },
    {
      path: '/people/person',
      load: () => import(/* webpackChunkName: 'people' */ './people'),
      title: 'افراد',
    },
    {
      path: '/people/business',
      load: () =>
        import(/* webpackChunkName: 'people-business' */ './people-business'),
      title: 'افراد',
    },
    {
      path: '/kyc-time-management',
      load: () =>
        import(
          /* webpackChunkName: 'kyc-time-management' */ './kyc-time-management'
        ),
      title: 'زمان بندی KYC',
    },
    {
      path: '/reports',
      children: [
        {
          path: '',
          load: () =>
            import(/* webpackChunkName: 'sale-reports' */ './sale-reports'),
          title: 'گزارشات',
        },
        {
          path: '/:levantId',
          load: () => import(/* webpackChunkName: 'report' */ './report'),
          title: 'جزئیات گزارش',
        },
      ],
    },
    {
      path: '/activities',
      load: () => import(/* webpackChunkName: 'activities' */ './activities'),
      title: 'فعالیت ها',
    },
    {
      path: '/settings',
      load: () => import(/* webpackChunkName: 'settings' */ './settings'),
      title: 'تنظیمات',
    },
    {
      path: '/tools',
      load: () => import(/* webpackChunkName: 'tools' */ './tools'),
      title: 'ابزار ها',
    },
    {
      path: '/settings/forms',
      load: () => import(/* webpackChunkName: 'forms' */ './forms'),
      title: 'تنظیمات فرم ها',
    },
    {
      path: '/settings/manual-message-templates',
      load: () =>
        import(
          /* webpackChunkName: 'message-templates' */ './manual-message-templates'
        ),
      title: 'مدیریت قالب دستی',
    },
    {
      path: '/settings/systemic-message-templates',
      load: () =>
        import(
          /* webpackChunkName: 'systemic-message-templates' */ './systemic-message-templates'
        ),
      title: 'مدیریت قالب سیستمی',
    },
    {
      path: '/settings/product-setting',
      load: () =>
        import(/* webpackChunkName: 'product-setting' */ './product-setting'),
      title: 'محصولات',
    },
    {
      path: '/settings/tags',
      load: () => import(/* webpackChunkName: 'tags' */ './tags'),
      title: 'تنظیمات برچسب ها',
    },
    {
      path: '/settings/notification-center',
      load: () =>
        import(
          /* webpackChunkName: 'notification-center' */ './notification-center'
        ),
      title: 'مرکز اطلاع رسانی',
    },
    {
      path: '/settings/sale-products',
      load: () =>
        import(/* webpackChunkName: 'sale-products' */ './sale-products'),
      title: 'محصولات فروش',
    },
    {
      path: '/settings/kyc-level',
      load: () => import(/* webpackChunkName: 'kyc-level' */ './kyc-level'),
      title: 'سطح احراز هویت',
    },
    {
      path: '/employee-management',
      children: [
        {
          path: '',
          load: () =>
            import(
              /* webpackChunkName: 'employeeManagement' */ './employee-management'
            ),
          title: 'مدیریت کاربران',
        },
        {
          path: '/:unitId',
          load: () =>
            import(
              /* webpackChunkName: 'employeeManagement' */ './employee-management'
            ),
          title: 'مدیریت کاربران',
        },
      ],
    },
    {
      path: '/pipeline-management',
      children: [
        {
          path: '',
          load: () =>
            import(
              /* webpackChunkName: 'pipelineManagement' */ './pipeline-management'
            ),
          title: 'مدیریت فرآیند',
        },
        {
          path: '/:pipelineId',
          load: () =>
            import(
              /* webpackChunkName: 'pipeline' */ './pipeline-management/pipeline'
            ),
          title: 'فرآیند',
        },
        {
          path: '/:pipelineId/:cardId',
          load: () =>
            import(
              /* webpackChunkName: 'card_details' */ './pipeline-management/pipeline/cardDetails'
            ),
          title: 'جزییات کارت',
        },
      ],
    },
    {
      path: '/opportunities',
      children: [
        {
          path: '',
          load: () =>
            import(/* webpackChunkName: 'opportunities' */ './opportunities'),
          title: 'نمای کارتی فرصت‌ها',
        },
        {
          path: '/table',
          load: () =>
            import(
              /* webpackChunkName: 'opportunities-table' */ './opportunities/table'
            ),
          title: 'نمای جدولی فرصت‌ها',
        },
        {
          path: '/:ids/:title',
          load: () =>
            import(
              /* webpackChunkName: 'pipeline-opportunities' */ './pipeline-opportunities'
            ),
          title: 'فرصت ها',
        },
      ],
    },
    {
      path: '/phone-calls',
      load: () => import(/* webpackChunkName: 'phone-calls' */ './phone-calls'),
      title: 'تماس ها',
    },
    {
      path: '/facility',
      load: () => import(/* webpackChunkName: 'facility' */ './facility'),
      title: 'تاریخچه درخواست تسهیلات',
    },
    {
      path: '/case',
      load: () => import(/* webpackChunkName: 'case' */ './case'),
      title: 'لیست درخواست ها',
    },
    {
      path: '/task-management',
      load: () =>
        import(/* webpackChunkName: 'task-managment' */ './task-management'),
      title: 'مدیریت کارها',
    },
    {
      path: '/representatives',
      load: () =>
        import(/* webpackChunkName: 'representatives' */ './representatives'),
      title: 'لیست نمایندگی‌ها',
    },
    {
      path: '/agents',
      children: [
        {
          path: '',
          load: () => import(/* webpackChunkName: 'agents' */ './agents'),
          title: 'لیست کارگزار ها',
        },
        {
          path: '/:parentId',
          load: () => import(/* webpackChunkName: 'agents' */ './agents'),
          title: 'لیست کارگزار ها',
        },
      ],
    },
    {
      path: '/video-authentication',
      load: () =>
        import(
          /* webpackChunkName: 'video-authentication' */ './video-authentication'
        ),
      title: 'احراز هویت الکترونیکی جدید',
    },
    {
      path: '/videoKyc',
      children: [
        {
          path: '',
          load: () => import(/* webpackChunkName: 'videoKyc' */ './videoKyc'),
          title: 'لیست تمامی احراز هویت الکترونیکی',
        },
        {
          path: '/:kycType',
          load: () => import(/* webpackChunkName: 'videoKyc' */ './videoKyc'),
          title: 'لیست تمامی احراز هویت الکترونیکی',
        },
        {
          path: '/:kycType/:code',
          load: () => import(/* webpackChunkName: 'videoKyc' */ './videoKyc'),
          title: 'لیست تمامی احراز هویت الکترونیکی',
        },
      ],
    },
    {
      path: '/show-case/:caseId',
      load: () => import(/* webpackChunkName: 'show-case' */ './show-case'),
      title: 'درخواست',
    },
    {
      path: '/session',
      children: [
        {
          path: '',
          load: () => import(/* webpackChunkName: 'sessions' */ './sessions'),
          title: 'جلسات',
        },
        {
          path: '/:sessionId',
          load: () => import(/* webpackChunkName: 'session' */ './session'),
          title: 'جزئیات جلسه',
        },
      ],
    },
    {
      path: '/sales-opportunities',
      load: () =>
        import(
          /* webpackChunkName: 'sales-opportunities' */ './sales-opportunities'
        ),
      title: 'فرصت های فروش',
    },
    {
      path: '/sale-reports',
      load: () =>
        import(/* webpackChunkName: 'sale-reports' */ './sale-reports'),
      title: 'گزارشات فروش',
    },
    {
      path: '/access-control',
      load: () =>
        import(/* webpackChunkName: 'access-control' */ './access-control'),
      title: 'دسترسی',
    },
    {
      path: '/roles',
      load: () => import(/* webpackChunkName: 'roles' */ './roles'),
      title: 'گروه های کاربری',
    },
    {
      path: '/operation-mgmt',
      children: [
        {
          path: '',
          load: () =>
            import(/* webpackChunkName: 'operation-mgmt' */ './operation-mgmt'),
          title: 'مدیریت عملیات',
        },
        {
          path: '/branches',
          load: () =>
            import(
              /* webpackChunkName: 'operation-mgmt-branches' */ './operation-mgmt/OperationManagement'
            ),
          title: 'مدیریت عملیات',
        },
        {
          path: '/dispatches',
          load: () =>
            import(
              /* webpackChunkName: 'operation-mgmt-dispatches' */ './operation-mgmt/DispatchesManagement'
            ),
          title: 'مدیریت توزیع ',
        },
      ],
    },
    {
      path: '/branches',
      children: [
        {
          path: '',
          load: () => import(/* webpackChunkName: 'branches' */ './branches'),
          title: 'شعبات',
        },
        {
          path: '/:parentId',
          load: () => import(/* webpackChunkName: 'branches' */ './branches'),
          title: 'شعبات',
        },
      ],
    },
    {
      path: '/aseman-panel',
      children: [
        {
          path: '',
          load: () =>
            import(/* webpackChunkName: 'aseman-panel' */ './aseman-panel'),
          title: 'ورودی دمو',
        },
        {
          path: '/business',
          load: () =>
            import(/* webpackChunkName: 'aseman-panel' */ './aseman-panel'),
          title: 'پنل آسمان',
        },
        {
          path: '/provider',
          load: () =>
            import(/* webpackChunkName: 'aseman-panel' */ './aseman-panel'),
          title: 'پنل تامین کننده',
        },
        {
          path: '/channel',
          load: () =>
            import(/* webpackChunkName: 'aseman-panel' */ './aseman-panel'),
          title: 'پنل کانال فروش',
        },
      ],
    },
    {
      path: '/help',
      load: () => import(/* webpackChunkName: 'help' */ './help'),
      title: 'راهنما',
    },
    {
      path: '/500',
      load: () =>
        import(/* webpackChunkName: 'server-error' */ './server-error'),
      title: 'server error',
    },
    {
      path: '/503',
      load: () => import(/* webpackChunkName: 'maintenance' */ './maintenance'),
      title: 'maintenance',
    },
    // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
    {
      path: '(.*)',
      load: () => import(/* webpackChunkName: 'not-found' */ './not-found'),
      title: '',
    },
  ],

  async action({ next }) {
    // Execute each child route until one of them return the result
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `${route.title || 'Untitled Page'} - ${config.BaseUrl}`;
    route.description = route.description || '';

    return route;
  },
};

// The error page is available by permanent url for development mode
if (__DEV__) {
  routes.children.unshift({
    path: '/error',
    action: require('./error').default,
  });
}

export default routes;
