import { useEffect, useState } from 'react';

const dashboardDataLocalStorageKey = 'DASHBOARD_DATA';

const getSavedDashboardData = () =>
  JSON.parse(localStorage.getItem(dashboardDataLocalStorageKey));

const useDashboardChart = (name, defaultFilter) => {
  const [mounting, setMounting] = useState(true);
  const [filterFormValues, setFilterFormValues] = useState(null);

  useEffect(() => {
    setFilterFormValues(
      (getSavedDashboardData() && getSavedDashboardData()[name]) ||
        defaultFilter ||
        {},
    );
    setMounting(false);
  }, []);

  useEffect(() => {
    const prevData = getSavedDashboardData();
    localStorage.setItem(
      dashboardDataLocalStorageKey,
      JSON.stringify({
        ...prevData,
        [name]: filterFormValues,
      }),
    );
  }, [filterFormValues]);

  const onSubmitFilters = form => {
    setFilterFormValues(form);
  };

  return {
    filterFormValues,
    onSubmitFilters,
    mounting,
  };
};

export default useDashboardChart;
