import StepApplications from './StepApplications';
import StepComplated from './StepComplated';
import StepDate from './StepDate';
import StepLocation from './StepLocation';
import StepName from './StepName';

export const stepsSchema = [
  {
    step: {
      title: 'نام گروه',
    },
    component: StepName,
  },
  {
    step: {
      title: 'اپلیکیشن‌های ایجاد‌کننده',
    },
    component: StepApplications,
  },
  {
    step: {
      title: 'فیلترهای مکانی',
    },
    component: StepLocation,
  },
  {
    step: {
      title: 'فیلتر زمانی',
    },
    component: StepDate,
  },
  {
    isComplate: true,
    component: StepComplated,
  },
];
