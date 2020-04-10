import { getJSON, postForm } from '@Networks/base';

const baseSurveyUrl = '/cvms/marketbuzz-survey-service/survey';

export const setDefaultSurvey = (id: number) => postForm({ url: `${baseSurveyUrl}/setDefault`, body: { id } });

export const setPollHide = (id: number, operation: string) => postForm({ url: `${baseSurveyUrl}/setHide`, body: { id, operation } });

export const closeThePoll = (id: number) => postForm({ url: `${baseSurveyUrl}/deactiveSurvey`, body: { id } });

export const getEmailContent = (id: number) => postForm({ url: `${baseSurveyUrl}/getEmailContent`, body: { id }, responseType: 'text' });

export const postAPoll = (json: string) => postForm({
  url: `${baseSurveyUrl}/submit`,
  body: { surveyJson: json },
});

export const activeThePoll = (id: number) => postForm({
  url: `${baseSurveyUrl}/activeSurvey`,
  body: { id },
});


export const getAllCompanys = () => getJSON({ url: `${baseSurveyUrl}/getAllCompany?_=${Date.now()}` });

export const generateStatistics = (json: {
  reportType: number;
  startTime: number;
  endTime: number;
  surveyId?: number;
}) => postForm({ url: `${baseSurveyUrl}/generateReport`, body: json });

export const publishToPage = (id: number, portletId:string, checked:boolean) => postForm({ url: `${baseSurveyUrl}/portlet/update`, body: { id, portletId, checked } });
