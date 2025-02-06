"use client";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import SecureLS from "secure-ls";

//import reducers
import AuthReducer from "./features/Auth/AuthSlice";
import ProjectReducer from "./features/Project/ProjectSlice";
import OnThisWeekReducer from "./features/OnThisWeek/OnThisWeekSlice";
import OverallStatsReducer from "./features/OverallStats/OverAllStatsSlice";
import JobsReducer from "./features/Jobs/JobSlice";
import TreeviewReducer from "./features/Jobs/TreeViewSlice";
import KanbanReducer from "./features/Jobs/KanbanSlice";
import ProductionStatsReducer from "./features/ProductionStats/ProductionStatsSlice";
import QuantityBreakdownReducer from "./features/QuantityBreakdown/QuantityBreakdownSlice";
import QBProblemsReducer from "./features/QuantityBreakdown/Modals/ProblemsSlice";
import QBDelayedReducer from "./features/QuantityBreakdown/Modals/DelayedSlice";
import AvailableMachinesReducer from "./features/AvailableMachines/AvailableMachineSlice";
import ProblemsReducer from "./features/Problems/ProblemsSlice";
import OperationsReducer from "./features/Operations/OperationsSlice";
import CommentsReducer from "./features/Comments/ProblemCommentsSlice";
import JobDetailDatesReducer from "./features/Jobs/JobDatesSlice";
import JobDetailsReducer from "./features/Jobs/JobDetailSlice";
import JobPictureReducer from "./features/Jobs/JobPictureSlice";
import OperatorJobReducer from "./features/Jobs/OperatorJobSlice";
import ProcessMachineReducer from "./features/ProcessMachine/ProcessMachineSlice";
import MachineOperatorReducer from "./features/MachineOperator/MachineOperatorSlice";
import UsersReducer from "./features/Users/UsersSlice";
import ProductionOverviewReducer from "./features/ProductionOverview/ProductionOverviewSlice";
import CoJobsReducer from "./features/Jobs/CoJobSlice";
import CoCommentsReducer from "./features/Comments/CoCommentSlice";
import NotificationsReducer from "./features/Notifications/NotificationSlice";
import CustomerOrderReducer from "./features/CustomerOrder/CustomerOrderSlice";
import MachinePerformanceReducer from "./features/MachinePerformance/MachinePerformanceSlice";
import SalesDashboardReducer from "./features/SalesDashboard/SalesDashboardSlice";
import OverdueReducer from "./features/SalesDashboard/OverdueSlice";
import OverdueDetailReducer from "./features/SalesDashboard/OverdueDetailSlice";
import BreakdownDetailReducer from "./features/SalesDashboard/BreakdownSlice";
import MonthlyForecastReducer from "./features/SalesDashboard/MonthlyForecastSlice";
import SpindleReducer from "./features/MachineOperator/spindleSlice";
import ProjectSummaryReducer from "./features/PerformanceReport/ProjectSummarySlice";
import LowPerformanceReducer from "./features/PerformanceReport/LowPerformanceSlice";
import ReasonsBreakdownReducer from "./features/PerformanceReport/ReasonsBreakdownSlice";
import ModalBreakdownReducer from "./features/PerformanceReport/ModalBreakdownSlice";

// internal states
import FiltersReducer from "./features/Filters/FilterSlice";
import HeaderReducer from "./features/Header/HeaderSlice";
import DateRangeFilterReducer from "./features/DateFilters/DateFilterSlice";

interface PersistConfig {
  key: string;
  storage: any;
}
let ls: any;
let persistConfig: PersistConfig = {
  key: "X7yfa68i",
  storage: {
    getItem: (key: string) => Promise.resolve(key),
    setItem: (key: string, value: any) => Promise.resolve(key),
    removeItem: (key: string) => Promise.resolve(key),
  },
};

const init = () => {
  ls = new SecureLS({
    isCompression: false,
    encryptionSecret: "1a8i6e58f0eGx0d3a",
  });

  persistConfig.storage = {
    getItem: (key: string) => Promise.resolve(ls.get(key)),
    setItem: (key: string, value: any) => Promise.resolve(ls.set(key, value)),
    removeItem: (key: string) => Promise.resolve(ls.remove(key)),
  };
};

if (global?.localStorage) init();

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: AuthReducer,
    project: ProjectReducer,
    onThisWeek: OnThisWeekReducer,
    overallStats: OverallStatsReducer,
    jobs: JobsReducer,
    treeview: TreeviewReducer,
    kanban: KanbanReducer,
    productionStats: ProductionStatsReducer,
    quantityBreakdown: QuantityBreakdownReducer,
    qbProblems: QBProblemsReducer,
    qbDelayed: QBDelayedReducer,
    filters: FiltersReducer,
    availableMachines: AvailableMachinesReducer,
    problems: ProblemsReducer,
    operations: OperationsReducer,
    comments: CommentsReducer,
    jobDetailDates: JobDetailDatesReducer,
    jobDetails: JobDetailsReducer,
    jobPicture: JobPictureReducer,
    header: HeaderReducer,
    operatorJobs: OperatorJobReducer,
    processMachines: ProcessMachineReducer,
    machineOperator: MachineOperatorReducer,
    users: UsersReducer,
    productionOverviews: ProductionOverviewReducer,
    dateRangeFilters: DateRangeFilterReducer,
    coJobs: CoJobsReducer,
    coComments: CoCommentsReducer,
    notifications: NotificationsReducer,
    customerOrder: CustomerOrderReducer,
    machinePerformance: MachinePerformanceReducer,
    salesDashboard: SalesDashboardReducer,
    overdue: OverdueReducer,
    overdueList: OverdueDetailReducer,
    breakdownList: BreakdownDetailReducer,
    monthlyForecastList: MonthlyForecastReducer,
    spindle: SpindleReducer,
    projectSummary: ProjectSummaryReducer,
    lowPerformance: LowPerformanceReducer,
    reasonsBreakdown: ReasonsBreakdownReducer,
    modalBreakdown: ModalBreakdownReducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
