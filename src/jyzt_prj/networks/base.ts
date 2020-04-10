import { Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';

interface RequestParams {
  url: string;
  method?: string;
  headers?: Object;
  body?: Object;
  responseType?: string;
}


const baseAjaxFunc = ({
  url,
  method = 'GET',
  headers,
  body,
  responseType = 'json',
}: RequestParams): Observable<AjaxResponse> => ajax({
  url,
  method,
  headers: {
    ...headers,
    Pragma: 'no-cache',
  },
  body,
  responseType,
});

export const postJSON = ({
  url,
  headers,
  body,
}: RequestParams): Observable<AjaxResponse> => baseAjaxFunc({
  url,
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json',
  },
  body,
});

export const postFormData = ({
  url,
  headers,
  body,
}: RequestParams): Observable<AjaxResponse> => baseAjaxFunc({
  url,
  method: 'POST',
  headers: { ...headers, 'Content-Type': 'multipart/form-data' },
  body,
});

export const getJSON = ({
  url,
  headers,
}: RequestParams): Observable<AjaxResponse> => baseAjaxFunc({ url, headers });

export default baseAjaxFunc;
