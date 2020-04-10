import {
  getJSON,
  postJSON,
} from '@Networks/base';
import { Observable } from 'rxjs';
import { AjaxResponse } from 'rxjs/ajax';

const baseReportUrl = '/cvms/marketbuzz-survey-service/tag';

export const getTags = ():Observable<AjaxResponse> => getJSON({ url: `${baseReportUrl}/list`, body: {} });

export const saveTag = (json:{names: string[]}):Observable<AjaxResponse> => postJSON({ url: `${baseReportUrl}/save`, body: json });
