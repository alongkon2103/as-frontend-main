import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  fetchJobs,
  fetchNotiJob,
  fetchJobsByJobStatus,
  jobsInitialStage,
  default as JobsReducer,
} from "@/store/features/Jobs/JobSlice";

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("JobSlice", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should handle fetchJobs success", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      jobs: jobsInitialStage,
    });

    const mockResponse = {
      data: {
        job: "job1",
        suffix: 1,
        item: "item1",
        qtyReleased: 100,
        qtyScrapped: 0,
        progress: 50,
        oper: 1,
        status: "In Progress",
        typeStatus: "Start Delay",
        problems: "None",
        startDate: "2023-01-01",
        endDate: "2023-01-10",
        latestComment: "Comment",
        priority: "High",
        machine: "Machine1",
        material: "Material1",
      },
      paginationMetadata: {
        currentPage: 1,
        totalCount: 1,
        totalPages: 1,
        hasPrevious: false,
        hasNext: false,
      },
    };

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_API_URL}/jobs`)
      .reply(200, mockResponse);

    await store.dispatch<any>(
      fetchJobs({
        projectId: 1,
        toDate: "2024-01-01",
        fromDate: "2023-01-01",
        page: 1,
        limit: 10,
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchJobs.pending.type);
    expect(actions[1].type).toEqual(fetchJobs.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);

    const newstate = JobsReducer(jobsInitialStage, actions[1]);

    expect(newstate.jobs).toEqual(mockResponse.data);
    expect(newstate.pagination).toEqual(mockResponse.paginationMetadata);
  });

  it("should handle fetchJobs failure", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      jobDetail: jobsInitialStage,
    });

    const mockError = {
      message: "Failed To Fetch Jobs",
    };

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_API_URL}/jobs`)
      .reply(400, mockError);

    await store.dispatch<any>(
      fetchJobs({
        projectId: 1,
        toDate: "2024-01-01",
        fromDate: "2023-01-01",
        page: 1,
        limit: 10,
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchJobs.pending.type);
    expect(actions[1].type).toEqual(fetchJobs.rejected.type);
    expect(actions[1].payload).toEqual(mockError);

    expect(JobsReducer(jobsInitialStage, actions[1])).toEqual(jobsInitialStage);
  });

  it("should handle fetchNotiJob success", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      jobs: jobsInitialStage,
    });

    const mockResponse = {
      data: {
        job: "job1",
        suffix: 1,
        item: "item1",
        oper: "1",
        qty: 100,
        startDate: "2023-01-01",
        endDate: "2023-01-10",
        projectName: "Project1",
      },
    };

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_API_URL}/notification/jobData`)
      .reply(200, mockResponse);

    await store.dispatch<any>(
      fetchNotiJob({
        projectId: "1",
        job: "job1",
        suffix: 1,
        oper: 1,
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchNotiJob.pending.type);
    expect(actions[1].type).toEqual(fetchNotiJob.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);

    const newstate = JobsReducer(jobsInitialStage, actions[1]);

    expect(newstate.notiJobs).toEqual(mockResponse.data);
    expect(newstate.error).toBe(null);
  });

  it("should handle fetchNotiJob failure", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      jobDetail: jobsInitialStage,
    });

    const mockError = {
      message: "Failed To Fetch Noti Job",
    };

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_API_URL}/notification/jobData`)
      .reply(400, mockError);

    await store.dispatch<any>(
      fetchNotiJob({
        projectId: "1",
        job: "job1",
        suffix: 1,
        oper: 1,
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchNotiJob.pending.type);
    expect(actions[1].type).toEqual(fetchNotiJob.rejected.type);
    expect(actions[1].payload).toEqual(mockError);

    expect(JobsReducer(jobsInitialStage, actions[1])).toEqual(jobsInitialStage);
  });

  it("should handle fetchJobsByJobStatus success", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      jobs: jobsInitialStage,
    });

    const mockResponse = {
      data: {
        job: "job1",
        suffix: 1,
        item: "item1",
        qtyReleased: 100,
        qtyScrapped: 0,
        progress: 50,
        oper: 1,
        status: "In Progress",
        typeStatus: "Start Delay",
        problems: "None",
        startDate: "2023-01-01",
        endDate: "2023-01-10",
        latestComment: "Comment",
        priority: "High",
        machine: "Machine1",
        material: "Material1",
      },
      paginationMetadata: {
        currentPage: 1,
        totalCount: 1,
        totalPages: 1,
        hasPrevious: false,
        hasNext: false,
      },
    };

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_API_URL}/jobs`)
      .reply(200, mockResponse);

    await store.dispatch<any>(
      fetchJobsByJobStatus({
        projectId: 1,
        toDate: "2024-01-01",
        fromDate: "2023-01-01",
        page: 1,
        limit: 10,
        jobStatus: "RUNNING",
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchJobsByJobStatus.pending.type);
    expect(actions[1].type).toEqual(fetchJobsByJobStatus.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);

    const newstate = JobsReducer(jobsInitialStage, actions[1]);

    expect(newstate.tabJobs).toEqual(mockResponse.data);
    expect(newstate.tabJobsPagniation).toEqual(mockResponse.paginationMetadata);
    expect(newstate.error).toBe(null);
  });

  it("should handle fetchJobsByJobStatus failure", async () => {
    const store = mockStore({
      auth: { token: "mockToken" },
      jobDetail: jobsInitialStage,
    });

    const mockError = {
      message: "Failed To Fetch Job By Job Status",
    };

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_API_URL}/jobs`)
      .reply(400, mockError);

    await store.dispatch<any>(
      fetchJobsByJobStatus({
        projectId: 1,
        toDate: "2024-01-01",
        fromDate: "2023-01-01",
        page: 1,
        limit: 10,
        jobStatus: "RUNNING",
      })
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(fetchJobsByJobStatus.pending.type);
    expect(actions[1].type).toEqual(fetchJobsByJobStatus.rejected.type);
    expect(actions[1].payload).toEqual(mockError);

    expect(JobsReducer(jobsInitialStage, actions[1])).toEqual(jobsInitialStage);
  });
});
